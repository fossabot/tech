import Category from "./Category";

export default class CategoryItem {

    title: string;
    imageUrl: string;
    description: string;
    imageTitle: string;
    id: string;
    markdownUrl: string;
    category: Category;

    constructor(category: Category, title: string, description: string, imageUrl: string, markdownUrl: string) {
        this.category = category;
        this.title = title;
        this.imageTitle = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.id = title.toLowerCase().split(' ').join('-');
        this.markdownUrl = markdownUrl;
    }

    getUri(): string {
        return "/" + this.category.id + "/" + this.id;
    }
}