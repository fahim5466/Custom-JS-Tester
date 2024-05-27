const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async relativePath => {
    const absolutePath = path.join(process.cwd(), relativePath);

    const dom = await JSDOM.fromFile(absolutePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    })

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        });
    });
};

module.exports = render;