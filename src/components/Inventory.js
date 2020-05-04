import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';
import firebase from 'firebase';

class Inventory extends React.Component {

    constructor() {
        super();
        //initial state or getinitialstate in ES5
        this.state = {
            uid: null,
            owner: null
        }
    }

    //to retain user data when user refreshes
    //ON pageload firebase will try to authenticate immidiately afer the component is mounted on DOM
    //and user data is populated
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async authData => {

        // 1. Look up the currentstore in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });

        // 2. Claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });

    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();

        firebase
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
            .catch(error => {
                console.log(`Sorry there was some error: ${error}`);
            });
    }

    logOut = () => {
        console.log("logging out");
        firebase.auth().signOut();
        this.setState({ uid: null });
    };

    handleChange = (e, key) => {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish);
    }

    renderInventory = (key) => {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name"
                    onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="price" value={fish.price} placeholder="Fish Price"
                    onChange={(e) => this.handleChange(e, key)} />
                <select name="status" value={fish.status} placeholder="Fish Status"
                    onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    renderLogin = () => {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('Github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('Facebook')}>Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('Twitter')}>Log In with Twitter</button>
            </nav>
        )
    }

    render() {
        const logOut = <button onClick={this.logOut}>Log out!</button>
        //check if they are logged in at all
        if (!this.state.uid) {
            return (<div>{this.renderLogin()}</div>)
        }

        //check if they are the owner of the current store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you aren't owner of the store</p>
                    {logOut}
                </div>
            )
        }
        return (
            <div>
                <h2>Inventory</h2>
                {logOut}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>

        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
}

export default Inventory;