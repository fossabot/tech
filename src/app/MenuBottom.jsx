// @flow

import React from 'react';
import {observer} from "mobx-react";
import EmptyProps from "./helper/TypeHelper";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Left from '@material-ui/icons/ChevronLeft';
import Up from '@material-ui/icons/ArrowDropUp';
import {navigationHelper} from "./helper/NavigationHelper";

class MenuBottom extends React.Component<EmptyProps> {

    // noinspection JSMethodCanBeStatic
    onChange(e, value: any) {
        if("back" === value) {
            navigationHelper.goBack(this);
        }
        else if("up" === value) {
            try {
                window.scrollTo(0, 0);
            } catch (e) {
                //    ignore error
                console.error(e);
            }
        }
    }

    render() {
        return <BottomNavigation className="be-menu-bottom"
                                 onChange={this.onChange}>
            <BottomNavigationAction
                label="Back"
                showLabel={true}
                icon={<Left/>}
                value={"back"}
            />

            <BottomNavigationAction
                label="Top"
                showLabel={true}
                icon={<Up/>}
                value={"up"}
            />
        </BottomNavigation>
    }
}

export default observer(MenuBottom)