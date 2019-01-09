import Category from "./Category";

export default class CategoryLink extends Category {

    link;

    constructor(name, id, link) {
        super(name, id);
        this.link = link;
    }

    getUri(): string {
        return this.link;
    }

}