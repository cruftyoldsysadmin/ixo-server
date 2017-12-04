#!/usr/bin/env ts-node
require('dotenv').config();
import * as program from "commander";

var packageJson = require('../package.json');
var commands = require('../commands')(program);

program.LOG_PATH = process.env.HOME + '/.cli-log';
program
    .version(packageJson.version)
    .usage('<command> [options]')
    .option('-v, --verbose', 'verbose')
    .option('-m, --mnemonic <item>', 'mnemonic')
    .option('-d, --did <item>', 'digital identifier')
    .option('-n, --name <item>', 'name of the DID owner')
    .option('-p, --publicKey <item>', 'public key for did')
    .option('-c, --country <item>', 'two letter country code')
    .option('-a, --agent <item>', 'location of the agentDoc')
    .option('-i, --input <item>', 'location of the input file')
    .option('-o, --output <item>', 'location of the output file')
    .option('-t, --templateId <item>', 'template id')
    .option('-l, --link <item>', 'project link')
    .option('-s, --start <item>', 'project start date')
    .option('-e, --end <item>', 'project end date')
    .option('--number <item>', 'project number of impacts')
    .option('--value <item>', 'value of project in USD')
    .option('--dixProjectID <item>', 'dix project ID')
    .option('-r, --role <item>', 'agent role')
    .option('--tolerance <item>', 'tolerance for failed claims ')
    .option('-f, --files <item>', 'tolerance for failed claims ')
    .option('--roleID <item>', 'id of capability being revoked from the DIX project')
    .option('--claimsetId <item>', 'id of the claimSet')
    .option('--result <item>', 'result of the evaluation')
    .option('--comment <item>', 'comment relating to the result of evaluation')
    .option('--description <item>', 'project description');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
