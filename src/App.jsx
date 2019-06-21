import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

import Login from './pages/login'
import Main from './pages/main'

export default class App extends Component {
    render() {
        return <div>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/' component={Main} />
                <Redirect to='/login' />
            </Switch>
        </div>;
    }
}