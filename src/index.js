import React from 'react';
import { render } from 'react-dom'; //import only render method rather than whole reactDOM
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';


//basename={process.env.PUBLIC_URL} is added to the browser router only to deploy at github pages
const Root = () => {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <Switch>
                    <Route exact path="/" component={StorePicker} />
                    <Route path="/store/:storeId" component={App} />
                    <Route component={NotFound} />
                </Switch>

            </div>
        </BrowserRouter>
    )
}

//to render give 1st arg as name of the component and 2nd arg will dom element to be 
//rendered on(usually called mounting point (root/main))
render(<Root />, document.querySelector('#main'));
