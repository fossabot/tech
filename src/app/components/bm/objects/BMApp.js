import BMComponent from "./BMComponent";
import React from "react";
import './BMApp.css';

export default class BMApp extends BMComponent {
    title: string;
    subTitle: string;
    android: string;
    ios: string;
    imageUrl: string;

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.subTitle = parts[1];
        this.android = parts[2];
        this.ios = parts[3];
        this.imageUrl = parts.length >= 5 ? parts[4] : "";
    }

    render(): * {
        let img = "";

        if(this.imageUrl && this.imageUrl !== "-"){
            img = <img alt={this.title} title={this.title} src={this.imageUrl}/>
        }

        return <div key={this.key}>
            <div className={"bm_app"}
                 title={this.title}>
                {img}
                <span>{this.title}</span>
            </div>
            <div className={"bm_app-subtitle"}>
                {this.subTitle}
            </div>
            <div className={"bm_app-buttons"}>
                <a href={this.android}
                   rel="noopener noreferrer nofollow"
                   title="Get from PlayStore"
                   target={"_blank"}>
                    <img alt="PlayStore button" title="PlayStore button" src="/images/logo/google-play.png"/>
                </a>
                <a className={"be_margin-left-10px"}
                   href={this.ios}
                   rel="noopener noreferrer nofollow"
                   title="Get from AppStore"
                   target={"_blank"}>
                    <img alt="AppStore button"  title="AppStore button" src="/images/logo/appstore-fr.png"/>
                </a>

            </div>
        </div>
    }
}