// @flow

import React from "react";
import CategoryItem from "../objects/CategoryItem";
import {categoryStore} from "../store/CategoryStore";
import Category from "../objects/Category";
import EmptyProps from "./TypeHelper";
import {htmlHelper} from "./HtmlHelper";

class NavigationHelper {
    // FIXME find a good way to handle navigation in REACT

    // noinspection JSMethodCanBeStatic
    goBack(component: React.Component<EmptyProps>) {
        console.log(window.history.length);

        if(window.history.length < 3) {
            window.open('/', "_self");
            return;
        }

        window.history.back();
    }

    // noinspection JSMethodCanBeStatic
    gotoRoot(component: React.Component<EmptyProps>) {
        if (component) {
            component.props.history.push('/');
        }

        categoryStore.setCurrentCategory(null);
    }

    // noinspection JSMethodCanBeStatic
    goto404(component: React.Component<EmptyProps>) {
        if (component) {
            component.props.history.replace('/');
        }
        window.open('/404.html', "_self");
    }

    restoreFromUri(component: React.Component<EmptyProps>, categoryId: string, categoryItemId: string) {

        console.info('Restoring url, categoryId: ', categoryId, ', categoryItemId: ', categoryItemId);

        if (!categoryId || categoryId === "") {
            this.gotoRoot(component);
            return;
        }

        categoryStore
            .findCategory(categoryId)
            .subscribe((category: Category) => {
                if (!category) {
                    this.goto404(component);
                    return;
                }

                categoryStore.setCurrentCategory(category);
                htmlHelper.updateHeadMeta(category.name);

                if (categoryItemId) {
                    categoryStore.findCategoryItem(categoryItemId).subscribe((categoryItem: CategoryItem) => {
                        if (categoryItem) {
                            categoryStore.setCurrentCategoryItem(categoryItem);
                            htmlHelper.updateHeadMeta(categoryItem.title);
                        } else {
                            this.goto404(component);
                        }
                    });
                }
            });
    }

}

export const navigationHelper = new NavigationHelper();