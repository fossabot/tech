// @flow

import React from "react";
import BMComponent from "./BMComponent";

export default class BMCategory extends BMComponent{

    title: string;
    id: string;
    url: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.id = parts[1];
        this.url = parts[2];
    }

    render() {
        return <div key={this.key}>
            {this.content}
        </div>
    }
}