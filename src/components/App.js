import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import history from '../history'
import CarList from './CarList'

function App() {


        return(
                <div>
            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={CarList}/>
                    {/*<Route path='/news/create' exact component={NewsCreate}/>*/}
                    {/*<Route path='/news/:id' exact component={NewsShow}/>*/}
                    {/*<Route path='/news/:id/edit' exact component={NewsEdit}/>*/}
                    <Redirect to="/"/>
                </Switch>
            </Router>
                </div>

    );
}

export default App;
