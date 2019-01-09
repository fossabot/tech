import React from "react";
import {observer} from "mobx-react";
import {categoryStore} from "./store/CategoryStore";
import CategoryCard from "./components/CategoryCard";
import CategoryItem from "./objects/CategoryItem";
import {navigationHelper} from "./helper/NavigationHelper";
import Category from "./objects/Category";

class CategoryMenu extends React.Component {

    category: Category = null;

    onArticleSelect(categoryItem: CategoryItem) {
        // navigationHelper.categoryItem(this, categoryItem);
    }

    componentDidMount() {
        navigationHelper.restoreFromUri(this,
            this.props.match.params.categoryId,
            this.props.match.params.categoryItemId);
    }

    scrollTop() {
        try {
            // window.scrollTo(0, 0);
        } catch (e) {
            //    ignore error
            console.error(e);
        }
    }

    render() {

        setTimeout(() => this.scrollTop(), 10);

        if (!categoryStore.category) {
            return <span />;
        }

        let currentCategoryItemId = categoryStore.categoryItem ? categoryStore.categoryItem.id : "";

        let items = [];
        categoryStore.categoryItems.forEach(categoryItem => {
            items.push(<CategoryCard key={categoryItem.id}
                                     selected={currentCategoryItemId === categoryItem.id}
                                     categoryItem={categoryItem}
            />)
        });

        let maybeHidden = 'be_CategoryMenu';
        if(categoryStore.categoryItem) {
            maybeHidden += " hidden";
        }

        return <div className={maybeHidden}>
            {items}
        </div>;
    }

}

export default observer(CategoryMenu)