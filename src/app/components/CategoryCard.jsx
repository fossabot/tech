// @flow

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CategoryItem from "../objects/CategoryItem";
import {Link} from "react-router-dom";

type Props = {
    categoryItem: CategoryItem,
    selected: boolean
}

export default class CategoryCard extends React.Component<Props> {

    render() {
        let selectedClass = this.props.selected ? "be-CardHeader-selected" : "be-CardHeader-not-selected";
        let image = "";
        let description = "";
        let subHeader = "";
        let categoryItem: CategoryItem = this.props.categoryItem;

        if (categoryItem.imageUrl && categoryItem.imageUrl.replace(" ", "") !== "") {
            image =
                <CardMedia
                    className={"be_CategoryMenu-image"}
                    image={categoryItem.imageUrl}
                    title={categoryItem.imageTitle}
                />;

            description =
                <CardContent>
                    <Typography component="p">
                        {categoryItem.description}
                    </Typography>
                </CardContent>;
        } else {
            subHeader = categoryItem.description;
        }

        return (
            <Link to={categoryItem.getUri()} title={categoryItem.title}>
                <Card className={'be-CardHeader-rounded-corners be_margin-bottom-30px'}>

                    <CardHeader className={selectedClass}
                        title={categoryItem.title}
                        subheader={subHeader}
                    />

                    {image}
                    {description}
                </Card>
            </Link>


        );
    }
}