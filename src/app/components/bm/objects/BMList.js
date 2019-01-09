// @flow

import BMComponent from "./BMComponent";
import React from "react";
import './BMList.css';
import KeyHelper from "../../../helper/KeyHelper";

export class BMListItem {

    text: string;
    items: string[] = [];

    constructor(text: string) {
        this.text = text;
    }

    addSubItem(value: string) {
        if(!this.items) {
            this.items = []
        }

        this.items.push(value.replace(" - ", ""))
    }
}

export default class BMList extends BMComponent {
    items: BMListItem[] = [];

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");
        let listItem: BMListItem;

        parts.forEach(value => {
            if(value.startsWith(" - ")) {
                if(!listItem) {
                    listItem = new BMListItem("✔");
                    this.items.push(listItem);
                }

                listItem.addSubItem(value)
            } else {
                listItem = new BMListItem(value);
                this.items.push(listItem);
            }
        })
    }

    render(): * {
        let colorIndex: number = 0;
        let colors: string[] = ["red", "blue", "green", "yellow"];

        let lis = [];
        let key = new KeyHelper();

        this.items.forEach(value => {
            let subItems = [];
            value.items.forEach(subItem => {
                subItems.push(<div key={key.next()} className={"list-subItem"}>{subItem}</div>)
            });

            lis.push(<li key={key.next()}><span className={"dot " + colors[colorIndex++]}/>{value.text}{subItems}</li>)

            if (colorIndex >= colors.length) {
                colorIndex = 0
            }
        });

        return <ul key={this.key} className={"bm_list"}>
            {lis}
        </ul>;
    }
}
