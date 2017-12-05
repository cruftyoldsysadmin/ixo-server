import {createDatabaseTransaction, doesDidExist, postTransaction} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromInput} from "../src/server/utils/fileUtils";


module.exports = function createAgentCommand(program) {
    'use strict';

    program
        .command('createAgent')
        .description('creates new agent')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.name === 'undefined') {
                    ch.logCliResult('name is a mandatory parameter');
                } else if (typeof program.country === 'undefined') {
                    ch.logCliResult('country is a mandatory parameter');
                } else if (typeof program.publicKey === 'undefined') {
                    ch.logCliResult('publicKey is a mandatory parameter');
                } else {

                    doesDidExist(program.did).then(result => {
                        if (result.length >= 1) {
                            ch.logCliResult('did already exists');
                        } else {
                            postTransaction(createDatabaseTransaction(readDIDFromFile(program.did + '.json'), {
                                did      : program.did,
                                name     : program.name,
                                country  : program.country,
                                publicKey: program.publicKey
                            }, {description: 'New agent ' + program.name + ' added.'})).then(result => {
                                ch.logCliResult('Agent Added: ', result.assert.data);
                            });
                        }
                    });

                }
            }
        );
};
