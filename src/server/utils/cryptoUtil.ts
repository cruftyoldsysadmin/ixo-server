import * as crypto from 'crypto';
import * as sovrin from 'sovrin-did';
import {ISovrinDidModel} from "../db/models";
import {readFileFromInput, writeToFile} from "./fileUtils";
import {createSignatureJson, signatureSchema} from "../templates/signature";
import {isValidJson} from "./jsonUtils";

var dateFormat = require('dateformat');
var merge = require('merge');
var base58 = require('bs58');
var cc = require('five-bells-condition');

export function generateBip39Mnemonic(): Promise<any> {
    var bip39 = require('bip39');
    return bip39.generateMnemonic();
}

export function generateSdidFromMnemonic(mnemonic): Promise<ISovrinDidModel> {
    // Create sha256 hash from Menmonic
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex");

    // Convert SHA256 hash to Uint8Array
    var didSeed = new Uint8Array(32);
    for (var i = 0; i < 32; ++i) {
        didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
    }

    // Create the Sovrin DID
    return sovrin.fromSeed(didSeed);
}

export function verifyDocumentSignature(signature, publicKey): boolean {
    return !(sovrin.verifySignedMessage(base58.decode(signature), publicKey) === false);
}

//Signs a document using signKey from generated SDID and returns the signature
export function signDocument(sdid: ISovrinDidModel, inputFile, outputFile?) {
    var signature = base58.encode(sovrin.signMessage(new Buffer(JSON.stringify(inputFile)), sdid.secret.signKey, sdid.verifyKey));

    if (verifyDocumentSignature(signature, sdid.verifyKey)) {
        if (typeof outputFile !== 'undefined') {
            writeToFile(outputFile, merge(inputFile, generateDocumentSignature(sdid.did, signature)));
        }
        return generateDocumentSignature(sdid.did, signature);
    } else {
        throw new Error('fulfillment validation failed');
    }
}

//Generates signature json from generated doc signature
export function generateDocumentSignature(did, signature) {
    var signatureJson = createSignatureJson(cc.Ed25519Sha256.TYPE_NAME, dateFormat(new Date(), "isoDateTime"), did, signature);
    if (isValidJson(signatureSchema, signatureJson)) {
        return signatureJson
    } else {
        throw new Error('signature json validation failed');
    }
}





