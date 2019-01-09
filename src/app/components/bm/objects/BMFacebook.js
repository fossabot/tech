import BMComponent from "./BMComponent";
import React from "react";

export default class BMFacebook extends BMComponent {
    title: string;
    dataHref: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.dataHref = parts[1];
    }

    render() {
        let src = "https://www.facebook.com/plugins/page.php?" +
            "href=" + encodeURI(this.dataHref) +
            "&tabs=timeline" +
            "&width=400" +
            "&height=500" +
            "&small_header=false" +
            "&adapt_container_width=true" +
            "&hide_cover=false" +
            "&show_facepile=true" +
            "&appId";

        return <iframe key={this.key}
            src={src}
            title={this.title}
            width="400" height="500" style={{border:"none", overflow:"hidden", "margin-top": "15px"}}
            scrolling="no" frameBorder="0"
            allowTransparency="true" allow="encrypted-media"/>;
    }
}