import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
// import * as actions from './actions';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter} from 'react-router-dom';
import * as helper from './util/collectionHelper';

// const reduxMW = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const reduxMW = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    reduxMW(applyMiddleware(thunk))
)

//console.log(store);
// store.dispatch(helper.collectCategories()); // --- creating an async error (custom middleware)  redux-thunk is given as the example.
store.dispatch(helper.collectCategories())
store.dispatch(helper.collectPosts())
// store.dispatch(helper.collectComments())


ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
