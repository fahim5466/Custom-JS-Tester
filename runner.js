const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const ignoreDirs = ['node_modules'];

class Runner {
    constructor(){
        this.testFiles = [];
    }

    async runTests(){
        for(let testFile of this.testFiles){
            console.log(chalk.gray(`----- ${testFile.shortName}`));

            global.render = render;

            let beforeEaches = [];

            global.beforeEach = fn => {
                beforeEaches.push(fn);
            };

            global.it = async (desc, fn) => {
                beforeEaches.forEach(f => f());
                try{
                    await fn();
                    console.log(chalk.green(`Test passed: ${desc}\n`));
                }catch(err){
                    console.log(chalk.red(`Test failed: ${desc}\n`));
                    console.log(chalk.red(err.message.replace(/\n/g, '\n\t\t')));
                }
            };

            try{
                await require(testFile.name);
            }catch(err){
                console.log(`Could not load file: ${testFile.name}`);
                console.log(err.message);
            }
        }
    }

    async collectFiles(targetPath){
        const files = await fs.promises.readdir(targetPath);
        
        for(let file of files){
            const filePath = path.join(targetPath, file);
            const fileStats = await fs.promises.lstat(filePath);

            if(fileStats.isFile() && file.endsWith('.test.js')){
                this.testFiles.push({name: filePath, shortName: file});
            }else if(fileStats.isDirectory() && !ignoreDirs.includes(file)){
                let childFiles = await fs.promises.readdir(filePath);
                childFiles = childFiles.map(childFile => path.join(file, childFile));
                files.push(...childFiles);
            }
        }

    }
}

module.exports = Runner;