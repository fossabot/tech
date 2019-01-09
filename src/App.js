import React from 'react';
import Menu from "./app/Menu";
import CategoryMenu from "./app/CategoryMenu";
import Post from "./app/Post";
import Logo from "./app/components/Logo";
import {Route} from "react-router-dom";
import RouterHandler from "./app/RouterHandler";
import Theme from "./app/components/theme/day/Theme";
import MenuBottom from "./app/MenuBottom";

class App extends React.Component {

    render() {
        return (
            <div>
                <Route path='/:categoryId?/:categoryItemId?' component={RouterHandler}/>

                <Route component={Theme} />
                <Route component={Logo} />
                <Route component={Menu}/>

                <Route exact path='/:categoryId/:categoryItemId?' component={CategoryMenu} />
                <Route exact path='/:categoryId/:categoryItemId' component={Post} />

                <Route component={MenuBottom}/>
            </div>
        );
    }
}

export default App;
