import React from "react";
import * as ReactDOM from "react-dom";
import BMComponent from "./objects/BMComponent";
import {bmObjectFactory} from "./BMObjectFactory";

export default class BasicMarkup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    scrollTop() {
        try {
            if (ReactDOM.findDOMNode(this)) {
                ReactDOM.findDOMNode(this).scrollTop = 0;
            }
        } catch (e) {
            //    ignore this error
        }
    }

    render() {
        if (!this.props.source) {
            return <div/>
        }

        setTimeout(() => this.scrollTop(), 10);

        let bmComponents = bmObjectFactory.textToBMComponents(this.props.source);
        let children = [];

        bmComponents.forEach((bmComponent: BMComponent) => children.push(bmComponent.render()));

        return <div style={{width: "100%"}}>
            {children}
        </div>;
    }
}