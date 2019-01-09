// @flow

import * as React from "react";
import './Theme.css';
import './Theme-animations.css';
import './Theme-mobile.css';
import EmptyProps from "../../../helper/TypeHelper";

export default class Theme extends React.Component<EmptyProps> {

    render() {
        return (
            <div className="theme">

                <div className="be_theme-image-left-right"/>
                <div className="be_theme-image-center"/>

                <a className="be_theme-balloon"  target='_blank' rel="noopener noreferrer nofollow"
                   href='http://www.balloon.lu/' title='Click to open Aerostatique Association website'> </a>

                <a className="be_theme-sun" target='_blank' rel="noopener noreferrer nofollow"
                   href='https://www.meteolux.lu/' title='Click to open MeteoLux website'> </a>

                <a className="be_theme-cloud-big" target='_blank' rel="noopener noreferrer nofollow"
                   href='https://www.meteolux.lu/' title='Click to open MeteoLux website'> </a>

                <a className="be_theme-cloud-big-2" target='_blank' rel="noopener noreferrer nofollow"
                   href='https://www.meteolux.lu/' title='Click to open MeteoLux website'> </a>

                <a className="be_theme-cloud-medium" target='_blank' rel="noopener noreferrer nofollow"
                   href='https://www.meteolux.lu/' title='Click to open MeteoLux website'> </a>

                <a className="be_theme-cloud-small" target='_blank' rel="noopener noreferrer nofollow"
                   href='https://www.meteolux.lu/' title='Click to open MeteoLux website'> </a>

                <a className="be_plane" target='_blank' rel="noopener noreferrer nofollow"
                   href='https://www.luxair.lu/fr' title='Click to open LuxAir website'> </a>

                <span className="be_univers"> </span>

                <div className="be_star-small"/>
                <div className="be_star-small-top-corner"/>
                <div className="be_star-small-bottom-corner"/>
                <div className="be_star-big"/>
            </div>
        );
    }

}