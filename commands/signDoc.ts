import {CommandHelper} from "../bin/commandHelper";
import {signDocument} from "../src/server/utils/cryptoUtil";


module.exports = function signDocCommand(program) {
    'use strict';

    program
        .command('signDoc')
        .description('signs document with did signKey')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.agent == 'undefined') {
                    ch.logCliResult('agent is a mandatory parameter');
                } else if (typeof program.input == 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                } else if (typeof program.output == 'undefined') {
                    ch.logCliResult('output is a mandatory parameter');
                } else {
                    ch.logCliResult('Document signed using signature: ' + signDocument(ch.readFromFile(program.agent), program.input, program.output));
                }
            }
        );
};
