import BMComponent from "./BMComponent";
import React from "react";

export default class BMImage extends BMComponent {
    url: string;
    title: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.url = parts[1];
    }

    render() {
        return <img key={this.key} style={{width: '100%'}} src={this.url} alt={this.title} title={this.title}/>
    }
}