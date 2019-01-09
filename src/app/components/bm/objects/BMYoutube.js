import BMComponent from "./BMComponent";
import React from "react";

export default class BMYoutube extends BMComponent {
    title: string;
    link: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.link = parts[1];
    }

    render() {
        return <iframe key={this.key}
                       title={this.title}
                       src={this.link}
                       width="100%" height="350" frameBorder="0"
                       allow="autoplay; encrypted-media" allowFullScreen/>
    }
}