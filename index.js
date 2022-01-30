'use strict';

const fs = require('fs');
const handlebars = require('handlebars');

const layouts = require('./data/layouts.json');
const topics = require('./data/topics.json');
const style = require('./data/style.json');

for (const layout of layouts) {
    const layoutName = layout.name;

    for (const topic of topics) {
        const image = topic.image;
        const translations = topic.translations;

        for (const translation of translations) {
            const copy = translation.copy;
            const html = renderLayout(layoutName, image, copy, style);
            fs.writeFileSync(`./dist/${layoutName}.${topic.name}.${translation.name}.html`, html);
            fs.mkdirSync(`./dist/images`, { recursive: true });
            fs.copyFileSync(`./images/${image.name}`, `./dist/images/${image.name}`);
        }
    }
}

function renderLayout(name, image, copy, style) {
    const source = fs.readFileSync(`./layouts/${name}.handlebars`, 'utf8');
    const template = handlebars.compile(source);
    const data = { style, copy, image };
    const html = template(data);

    return html;
}
