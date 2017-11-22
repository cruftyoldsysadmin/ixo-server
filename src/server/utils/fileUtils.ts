var fileSystem = require('fs');

export function readFromFile(filename: string) {
    return JSON.parse(fileSystem.readFileSync(process.env.PWD + process.env.INPUT_DIR + filename, 'utf8'));
}

export function writeToFile(fileName, content) {
    fileSystem.writeFile(process.env.PWD + process.env.OUTPUT_DIR + fileName, JSON.stringify(content, null, '\t'), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('File ' + fileName + ' created!');
    });
}


export function readDIDFromFile(filename: string) {
    return JSON.parse(fileSystem.readFileSync(process.env.PWD + process.env.DID_DIR + filename, 'utf8'));
}

export function writeDIDToFile(fileName, content) {
    fileSystem.writeFile(process.env.PWD + process.env.DID_DIR + fileName, JSON.stringify(content, null, '\t'), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('File ' + fileName + ' created!');
    });
}
