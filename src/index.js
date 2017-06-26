import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers/' // Or wherever you keep your reducers

// Styles
import './scss/index.scss';

// Components
import Nav from './components/Navigation';
import Home from './components/Home';
import NewInvoice from './components/NewInvoice';

// HOC'S
import reqireAuth from './components/RequireAuth';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
import Async from './middlewares/async'
const middleware = [routerMiddleware(history), Async]


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

// console.log(store);

ReactDOM.render(
    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
            <div className='container'>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/new-invoice" component={reqireAuth(NewInvoice)}/>
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)