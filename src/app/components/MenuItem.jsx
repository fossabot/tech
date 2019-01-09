// @flow

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Category from "../objects/Category";

type Props = {
    category: Category,
    isSelected: boolean
}

export default class MenuItem extends React.Component<Props> {

    render() {
        let category: Category = this.props.category;

        let selectedClass = this.props.isSelected ?
            'be_Category-selected' : '';

        return <ListItem button className={selectedClass}>
            <ListItemIcon>
                {category.icon}
            </ListItemIcon>
            <span title={category.name}>{category.name}</span>
        </ListItem>
    }
}