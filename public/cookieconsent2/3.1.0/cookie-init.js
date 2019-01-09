window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#eaf7f7",
                "text": "#5c7291"
            },
            "button": {
                "background": "#56cbdb",
                "text": "#ffffff"
            }
        },
        "theme": "classic",
        "position": "bottom-right",
        "content": {
            "message": "We do use some cookies",
            "dismiss": "I'm fine with it",
            "link": "See details",
            "target": "_self",
            "href": "/about/cookies"
        }
    })
});