// @flow

import React from 'react';
import List from '@material-ui/core/List';
import {categoryStore} from "./store/CategoryStore";
import {observer} from "mobx-react";
import Category, {DIVIDER} from "./objects/Category";
import Divider from '@material-ui/core/Divider';
import CategoryLink from "./objects/CategoryLink";
import EmptyProps from "./helper/TypeHelper";
import {Link} from "react-router-dom";
import MenuItem from "./components/MenuItem";

class Menu extends React.Component<EmptyProps> {

    onCategory(e, category: Category) {
        if (category instanceof CategoryLink) {
            e.preventDefault();
            window.open(category.link, "_blank");
        }
    }

    render() {
        let listItems = [];

        if (!categoryStore.categories || categoryStore.categories.length === 0) {
            return <span/>
        }

        categoryStore.categories.forEach((category: Category) => {
            let id = categoryStore.category ? categoryStore.category.id : "";

            if (category.id === DIVIDER) {
                listItems.push(<Divider key="divider"/>);
                return;
            }

            let item;

            if (category instanceof CategoryLink) {
                item =
                    <a key={category.id}
                       href={category.getUri()}
                       rel="noopener noreferrer nofollow"
                       target="_blank"
                       title={category.name}>
                        <MenuItem category={category} isSelected={id === category.id}/>
                    </a>
            } else {
                item =
                    <Link key={category.id} to={category.getUri()} title={category.name}>
                        <MenuItem category={category} isSelected={id === category.id}/>
                    </Link>
            }

            listItems.push(item);
        });

        let maybeHidden = 'be_Menu';
        if (categoryStore.category || categoryStore.categoryItem) {
            maybeHidden += " hidden";
        }

        return <div className={maybeHidden}>
            <List component="nav">
                {listItems}
            </List>

        </div>
    }
}

export default observer(Menu)