import React from "react";
import {navigationHelper} from "../helper/NavigationHelper";

export default class Logo extends React.Component {
    render() {
        return <div className={'be_Logo'}
                    onClick={() => navigationHelper.gotoRoot(this)}
                    title={"Logo of Becoming.lu, App Version: " + process.env.REACT_APP_VERSION}>
        </div>
    }
};