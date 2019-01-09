import BMComponent from "./BMComponent";
import React from "react";
import './BMShortNumber.css';

export default class BMShortNumber extends BMComponent {
    number: string;
    label: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.number = parts[0];
        this.label= parts[1];
    }

    render(): * {
        return <div key={this.key}
                    className={"bm_short-number"}
                    title={this.content}>

            <span className={"number"}>{this.number}</span>
            <span className={"label"}>{this.label}</span>
        </div>
    }
}