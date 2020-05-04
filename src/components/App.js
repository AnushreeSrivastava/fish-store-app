import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import { render } from 'react-dom';
import PropTypes from 'prop-types';


//Prop is used to pass information from one tag to another
class App extends React.Component {
    constructor() {
        super();
        //initial state or getinitialstate in ES5
        this.state = {
            fishes: {},
            orders: {}
        }
    }

    //Store data into the firebase database before the component is rendered,so that each time user
    //visits page with same data, it is synced before the component is rendered
    componentWillMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })

        //checks localstorage if orders data is there
        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
        if (localStorageRef) {
            this.setState({
                orders: JSON.parse(localStorageRef)
            });
        }
    }

    //This hook executes immidiately when there is an update in props or state
    //Here we are storing the order data into the localstorage of browser when data is changed
    componentDidUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.orders));
    }
    //remove the data binding from the database as soon as the component is 
    //unmounted(user moved to anoyther tabor close the window)
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    // Function to load sample fishes data from sample-fishes.js
    loadSamples = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    // Function to add a new fish data into the inventory
    addFish = (fish) => {
        //update our state  
        //can be done as -> this.state.fishes.fish1 = fish, but it affects performance by 
        //directly changing the state
        const fishes = { ...this.state.fishes };
        const timestamp = Date.now();
        //add in new fish
        fishes[`fish-${timestamp}`] = fish;
        //update the state to new state
        this.setState({ fishes: fishes })

    }

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish = (key) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes });
    }
    addToOrder = (key) => {
        //Take a copy of state orders
        const orders = { ...this.state.orders };
        //increment or add order to the particular fish key
        orders[key] = orders[key] + 1 || 1;
        //update the state
        this.setState({ orders });
    }

    removeFromOrder = (key) => {
        const orders = { ...this.state.orders };
        delete orders[key];
        this.setState({ orders });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seafood market" />
                    <ul className="list-of-fishes">
                        {/*to loop over the fishes state which is an object, 
                        we need to convert objects into the array by Object.keys() method. 
                        Then map each item to a component Fish */}
                        {Object
                            .keys(this.state.fishes)
                            .map((key) => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    orders={this.state.orders}
                    removeFromOrder={this.removeFromOrder}
                    params={this.props.match.params}
                />
                {/*Send addFish and loadSamples as props to the inventory becoz state originally
                 is in app.js only  */}
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: PropTypes.object.isRequired
}
export default App;