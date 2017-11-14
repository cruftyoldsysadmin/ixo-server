import chalk from "chalk";
var figlet = require('figlet');
var fs = require('fs');
var path = require('path');

module.exports = function commandLoader(program) {
	'use strict';

    console.log(
        chalk.blue(
            figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
        )
    );

	var commands = {};
	var loadPath = path.dirname(__filename);

	// Loop though command files
	fs.readdirSync(loadPath).filter(function (filename) {
		return (/\.ts$/.test(filename) && filename !== 'index.ts');
	}).forEach(function (filename) {
		var name = filename.substr(0, filename.lastIndexOf('.'));

		// Require command
		var command = require(path.join(loadPath, filename));

		// Initialize command
		commands[name] = command(program);
	});

	return commands;
};
