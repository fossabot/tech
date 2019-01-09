import BMComponent from "./BMComponent";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import React from "react";

export default class BMCard extends BMComponent {
    icon: string;
    title: string;
    subTitle: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.icon = parts[0];
        this.title = parts[1];
        this.subTitle = parts[2];
    }

    render(): * {
        if (this.icon) {
            return <Card key={this.key}>
                <CardHeader
                    avatar={
                        <Avatar aria-label={this.icon}>
                            {this.icon.substr(0, 1).toUpperCase()}
                        </Avatar>
                    }
                    title={this.title}
                    subheader={this.subTitle}
                />
            </Card>;
        }

        return <Card key={this.key}>
            <CardHeader
                title={this.title}
                subheader={this.subTitle}
            />
        </Card>;
    }
}