// @flow

import React from "react";
import BMComponent from "./BMComponent";

export default class BMCategoryItem extends BMComponent{

    title: string;
    description: string;
    image: string;
    url: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.description = parts[1];
        this.image = parts[2] === "-" ? "" : parts[2];
        this.url = parts[3];
    }

    render() {
        return <div key={this.key}>
            {this.content}
        </div>
    }
}