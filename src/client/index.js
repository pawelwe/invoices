import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { syncHistoryWithStore } from 'react-router-redux';

import reducers from './reducers/';

import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

// Toaster
import ReduxToastr from 'react-redux-toastr';

// Styles
import './scss/index.scss';

// Components
import Nav from './components/Navigation';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import NewInvoice from './components/NewInvoice';
import InvoicesList from './components/InvoicesList';


// HOC'S
import reqireAuth from './components/RequireAuth';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history), reduxThunk];

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware)
    )
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const token = localStorage.getItem('token');

// if we have token consider user to be signed in
if (token) {
    store.dispatch({
        type: AUTH_USER
    })
}

ReactDOM.render(
    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
            <div className='container'>
                <Nav />
                <Switch>
                    <Route exact path='/' component={SignIn}/>
                    <Route exact path='/dashboard' component={reqireAuth(Dashboard)}/>
                    <Route exact path='/signin' component={SignIn}/>
                    <Route exact path='/signup' component={SignUp}/>
                    <Route exact path='/new-invoice' component={reqireAuth(NewInvoice)}/>
                    <Route exact path='/invoice-:id' component={reqireAuth(NewInvoice)}/>
                    <Route exact path='/invoices-list' component={reqireAuth(InvoicesList)}/>
                </Switch>
                <ReduxToastr timeOut={4000} newestOnTop={true} preventDuplicates position="top-left" transitionIn="fadeIn" transitionOut="fadeOut" progressBar />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);