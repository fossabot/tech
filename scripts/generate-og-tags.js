const fs = require('fs');
const path = require('path');

async function readFile(pathname) {
    return (await fs.promises.readFile(pathname)).toString();
}

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

async function parseFile(pathname, category) {
    return (await readFile(pathname, category))
        .split('\n\n')
        .map(_ => {
            const content = _.split('\n');
            if (content[0] == 'category') {
                const [type, title, url, pathname] = content;
                if (!pathname) {
                    return;
                }
                return {
                    type,
                    title,
                    url: '/' + url,
                    pathname
                };
            } else if (content[0] == 'category-item') {
                const [type, title, description, image, bmPath] = content;
                return {
                    type,
                    title,
                    description,
                    image,
                    url: category.url + "/" + title.toLowerCase().split(' ').join('-'),
                    pathname: bmPath
                };
            }
        })
}

const htmlHead = `<!DOCTYPE html><html lang="en"><head>`;
const htmlBody = `</head><body>`;
const htmlTail = `</body></html>`;

async function renderHTML({title, url, image, description, type, pathname}, category) {
    let str = "";
    str = (await readFile('./public' + pathname, category));

    return type === 'category-item' ?
        htmlHead + `
          <title>${title}, Becoming.lu</title>
          <meta name = "description" content="${description}" />
          
          <meta property="og:title" content="${title}"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://becoming.lu${url}"/>
          <meta property="og:image" content="https://becoming.lu/${image}"/>
          <meta property="og:description" content="${description}"/>
        `
        + htmlBody
        + str
        + htmlTail
        :
        htmlHead + `
          <title>${title}, Becoming.lu</title>          
          <meta property="og:title" content="${title}"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://becoming.lu${url}"/>
        `
        + htmlBody
        + str
        + htmlTail
}

async function saveData(data, category) {
    const pathname = './build/og/' + data.url + '.html';
    ensureDirectoryExistence(pathname);

    let str = (await renderHTML(data, category));
    fs.promises.writeFile(pathname, str);
}

async function main() {
    const data = (await parseFile('./public/wiki/menu.bm'))
        .filter(Boolean);

    data.forEach(async _ => {
        saveData(_);
        (await parseFile('./public' + _.pathname, _))
            .filter(_ => _ && _.type === 'category-item')
            .map(saveData, _);
    });
}

main();
