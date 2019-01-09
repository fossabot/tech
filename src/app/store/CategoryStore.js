// @flow

import Category from "../objects/Category";
import {extendObservable} from "mobx";
import CategoryItem from "../objects/CategoryItem";
import {httpHelper} from "../helper/HttpHelper";
import CategoryLink from "../objects/CategoryLink";
import {bmObjectFactory} from "../components/bm/BMObjectFactory";
import BMCategory from "../components/bm/objects/BMCategory";
import BMCategoryItem from "../components/bm/objects/BMCategoryItem";
import {Observable, Subscriber} from "rxjs";

class CategoryStore {

    categories: Category[];
    category: Category;
    categoryItem: CategoryItem;
    categoryItems: CategoryItem[];
    currentArticle: string;

    constructor() {
        extendObservable(this, {
            category: null,
            categoryItem: null,
            currentArticle: '',
            categories: [],
            categoryItems: []
        });
    }

    loadCategories(): Observable {
        return Observable.create((observer: Subscriber) => {
            let tmp: Category[] = [];

            httpHelper.getText("/wiki/menu.bm").subscribe(data => {
                bmObjectFactory.textToBMComponents(data).forEach((value: BMCategory) => {
                    if(value.type === "category-link") {
                        tmp.push(new CategoryLink(value.title, value.id, value.url))
                    } else {
                        tmp.push(new Category(value.title, value.id, value.url))
                    }
                });

                this.categories = tmp;

                observer.next(tmp);
                observer.complete();
            });
        });
    }

    loadCategoryItems(category: Category) {
        return Observable.create((observer: Subscriber) => {
            httpHelper.getText(category.markdownUrl).subscribe(data => {
                let tmp = [];

                bmObjectFactory.textToBMComponents(data).forEach((value: BMCategoryItem) => {
                    tmp.push(new CategoryItem(category, value.title, value.description, value.image, value.url))
                });

                category.items = tmp;
                this.categoryItems = tmp;
                observer.next(tmp);
                observer.complete();
            });
        });
    }

    setCurrentCategory(category: Category) {
        this.category = category;
        this.categoryItem = null;

        if(category) {
            if(category.items.length < 1) {
                this.loadCategoryItems(category).subscribe();
            } else {
                if(this.category === category) {
                    this.categoryItems = category.items;
                }
            }
        }
    }

    setCurrentCategoryItem(categoryItem: CategoryItem) {
        this.categoryItem = categoryItem;

        httpHelper.getText(categoryItem.markdownUrl).subscribe(data => this.currentArticle = data);
    }

    findCategory(categoryId: string): Observable<Category> {
        return Observable.create((observer: Subscriber) => {
            if(this.categories.length < 1) {
                this.loadCategories().subscribe(() => {
                    observer.next(this._doLookUpCategory(categoryId));
                    observer.complete();
                })
            } else {
                observer.next(this._doLookUpCategory(categoryId));
                observer.complete();
            }
        });
    }

    findCategoryItem(categoryItemId: string): Observable<CategoryItem> {
        return Observable.create((observer: Subscriber) => {
            if(this.category.items.length < 1) {
                this.loadCategoryItems(this.category).subscribe(() => {
                    observer.next(this._doLookUpCategoryItem(categoryItemId));
                    observer.complete();
                })
            } else {
                observer.next(this._doLookUpCategoryItem(categoryItemId));
                observer.complete();
            }
        })
    }

    _doLookUpCategoryItem(categoryItemId: string): Category {
        for (let item of this.categoryItems) {
            if (item.id === categoryItemId) {
                return item;
            }
        }

        return null;
    }

    _doLookUpCategory(categoryId: string): Category {
        for (let category of this.categories) {
            if (category.id === categoryId) {
                return category;
            }
        }

        return null;
    }
}

export const categoryStore = new CategoryStore();