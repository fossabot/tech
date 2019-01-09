import React from "react";
import Paper from "@material-ui/core/Paper";
import {observer} from "mobx-react/index";
import {categoryStore} from "./store/CategoryStore";
import BasicMarkup from "./components/bm/BasicMarkup";

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    scrollTop() {
        try {
            window.scrollTo(0, 0);
        } catch (e) {
            //    ignore error
            console.error(e);
        }
    }

    render() {
        setTimeout(() => this.scrollTop(), 10);

        if(!categoryStore.categoryItem) {
            return <div/>
        }

        return <div className={'be_CategoryItemView'}>
            <Paper elevation={1} className={'be_CategoryItemView-paper'}>
                <BasicMarkup source={categoryStore.currentArticle} />
            </Paper>
        </div>;
    }
}

export default observer(Post)