import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import history from '../history'
import Header from "./Header"
import List from './List'
import Show from './Show'

function App() {


    return (
        <div>
            <Header/>
            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={List}/>
                    {/*<Route path='/news/create' exact component={NewsCreate}/>*/}
                    <Route path='/show/:id' exact component={Show}/>
                    {/*<Route path='/news/:id/edit' exact component={NewsEdit}/>*/}
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
