import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import history from '../history'
import Header from "./Header"
import List from './List'
import Show from './Show'
import Create from './Create'
import Edit from './Edit'


function App() {


    return (
        <div>
            <Header/>
            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={List}/>
                    <Route path='/create' exact component={(props) => <Create {...props} />}/>
                    <Route path='/show/:id' exact component={Show}/>
                    <Route path='/edit/:id' exact component={Edit}/>

                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
