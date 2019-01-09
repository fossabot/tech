import BMComponent from "./BMComponent";
import React from "react";
import './BMWorkingHours.css';

class WorkingHour {
    url: string;
    day: string;
    time: string;

    constructor(pairValue: string) {
        if (pairValue.startsWith("http")) {
            this.url = pairValue;
        } else {
            let parts: string[] = pairValue.trim().split(" : ");
            this.day = parts[0];
            this.time = parts[1];
        }
    }
}

export default class BMWorkingHours extends BMComponent {
    title: string;
    logoUrl: string;
    link: string;
    address: string;

    phone: string;
    transport: string;

    workingHours: WorkingHour[];


    static colors: string[] = ["green", "blue", "yellow", "red",];
    static idx: number = 0;
    static getNextColor = () => {
        if (BMWorkingHours.idx >= BMWorkingHours.colors.length) {
            BMWorkingHours.idx = 0;
        }

        return BMWorkingHours.colors[BMWorkingHours.idx++];
    };

    constructor(line: string) {
        super(line);

        let parts = this.content.split("\n");

        this.title = parts[0];
        this.logoUrl = this.nullable(parts[1]);
        this.link = this.nullable(parts[2]);
        this.address = this.nullable(parts[3]);

        this.phone = this.nullable(parts[4]);
        this.transport = this.nullable(parts[5]);

        this.workingHours = [];
        for (let i = 6; i < parts.length; i++) {
            this.workingHours.push(new WorkingHour(parts[i]));
        }
    }

    createLogo() {
        let logo = !this.logoUrl ? "" : <img className={"bm-img"} src={this.logoUrl} alt={this.title + ", Logo"}/>;

        return <div>{logo}</div>;
    }

    createLink() {
        return !this.link ? "" :
            <div className={"bm-a"}>
                <a href={this.link} target={"_blank"}
                   rel="noopener noreferrer nofollow"
                   title={"Click to open site " + this.title + " in new tab"}>
                    {this.link}
                </a>
            </div>;
    }

    createAddress() {
        let address = "";
        if (this.address) {
            if (this.address.trim().startsWith("http")) {
                address = <a href={this.address} target={"_blank"}
                             rel="noopener noreferrer nofollow"
                             title={"Click to open site " + this.title + " in new tab"}>Addresses and Contacts</a>;
            } else {
                address = <div>{this.address}</div>;
            }

            address = <div className={"bm-line address"}><span className={"icon location"}/>{address}</div>
        }

        return address;
    }

    createPhone() {
        return !this.phone ? "" :
            <div className={"bm-line"}>
                <span className={"icon phone"}/>
                <div>{this.phone}</div>
            </div>;
    }

    createTransport() {
        let html = "";

        if(this.transport) {
            if (this.transport.trim().startsWith("http")) {
                html = <div className={"bm-line"}>
                    <span className={"icon bus"}/>
                    <a href={this.transport} target={"_blank"}
                       rel="noopener noreferrer nofollow"
                       title={"Click to find transport options"}>Transport options</a>
                </div>;
            } else {
                html = <div className={"bm-line"}>
                    <span className={"icon bus"}/>
                    <b>
                        <div>{this.transport}</div>
                    </b>
                </div>;
            }
        }

        return html
    }

    createWorkingHours() {
        let workingHours = [];
        for (let i = 0; i < this.workingHours.length; i++) {
            let w = this.workingHours[i];

            if (w.url) {
                workingHours.push(
                    <div>
                        <a href={w.url} target={"_blank"}
                           rel="noopener noreferrer nofollow"
                           title={"Link to working hours"}>Working hours</a>
                    </div>)
            } else {
                workingHours.push(
                    <div key={Date.now() + Math.random() * 100000}>
                        &nbsp;&nbsp;<b>{w.day}</b> : {w.time}<br/>
                    </div>);
            }
        }

        if (workingHours.length < 1) {
            return "";
        }

        return <div className={"flex-box"}>
            <div className={"left icon clock"}/>
            <div className={"right"}>{workingHours}</div>
        </div>
    }

    render(): * {
        let logo = this.createLogo();
        let link = this.createLink();

        let address = this.createAddress();
        let phone = this.createPhone();
        let transport = this.createTransport();
        let workingHours = this.createWorkingHours();

        return <div key={this.key}
                    className={"flex-box bm-container " + BMWorkingHours.getNextColor()}>

            <div className={"left width-50prcnt"}>
                <div className={"bm-title"}>{this.title}</div>
                {link}
                {logo}
                {address}
            </div>

            <div className={"right width-50prcnt"}>
                {phone}
                {transport}
                {workingHours}
            </div>
        </div>;
    }
}
