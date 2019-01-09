// @flow

import * as React from "react";
import {navigationHelper} from "./helper/NavigationHelper";
import EmptyProps from "./helper/TypeHelper";
import {categoryStore} from "./store/CategoryStore";

//FIXME find a good way to handle navigation in REACT
export default class RouterHandler extends React.Component<EmptyProps> {

    unListen: () => {};

    componentDidMount() {

        this.unListen = this.props.history.listen(this.checkUri);
        this.checkUri()
    }

    checkUri(location: any) {
        let categoryId: string;
        let categoryItemId: string;

        console.log("check uri, location: " + location);

        if(!location) {
            categoryStore.loadCategories().subscribe();
            return;
        }

        if(location.pathname === '' || location.pathname === '/') {
            navigationHelper.gotoRoot(this);
            return;
        }

        // "/quick-summary/article-id" = ["", "quick-summary", "article-id"]
        const pathParts: string[] = location.pathname.split("/");

        if(pathParts.length < 2) {
            return;
        }

        categoryId = pathParts[1];
        categoryItemId = pathParts.length > 2 ? pathParts[2] : "";

        navigationHelper.restoreFromUri(this, categoryId, categoryItemId);
    }

    componentWillUnmount() {
        console.info("Stopping router handler");
        if(this.unListen) {
            this.unListen()
        }
    }

    render() {
        return ""
    }
}