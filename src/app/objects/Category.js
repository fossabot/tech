import React from "react";
import {iconsHelper} from "../helper/IconsHelper";
import CategoryItem from "./CategoryItem";

export const DIVIDER = 'divider';

export default class Category {

    name;
    icon;
    id;
    markdownUrl;
    items: CategoryItem[];

    constructor(name, id, markdownUrl) {
        this.name = name;
        this.markdownUrl = markdownUrl;
        this.icon = React.createElement(iconsHelper.get(id));
        this.id = id;
        this.items = [];
    }

    getUri(): string {
        return "/" + this.id;
    }

}