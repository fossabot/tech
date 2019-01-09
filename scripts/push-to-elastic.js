const fs = require('fs');
const path = require('path');
const http = require('http');

async function readFile(pathname) {
    return (await fs.promises.readFile(pathname)).toString();
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

let randomId = 0;

async function sendToElastic({title, url, image, description, type, pathname}, category) {

    if(type === 'category-item') {
        let content = "";
        content = (await readFile('./public' + pathname, category));

        const options = {
            host: '51.158.66.240',
            port: 80,
            path: '/becoming/_doc/' + randomId++,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            }
        };

        const req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        req.write(JSON.stringify({
            title: title,
            url: url,
            image: image,
            description: description,
            type: type,
            pathname: pathname,
            content: content
        }));
        req.end();
    }
}

async function saveData(data, category) {
    (await sendToElastic(data, category))
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
