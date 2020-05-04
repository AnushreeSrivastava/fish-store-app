import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

//best practice is to Write each compoent in different file
class StorePicker extends React.Component {

    //Method to bind function to a class or use arrow func
    // constructor(){
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    goToStore = (e) => {
        e.preventDefault();
        const storeId = this.storeInput.value;
        //Grab the text from thhe box and redirect it to /store/:storeId
        this.props.history.push(`/store/${storeId}`);
    }

    render() {
        //All class components need to return JSX(javascript xml)
        return (
            //to write class, react doesnt allow =s us to write "class", we need to use "className"
            //JSX return only one element, must have one root element
            <form className="store-selector" onSubmit={this.goToStore}>
                {/* This is how to write a comment inside jsx */}
                <h2>Please enter a store</h2>
                <input ref={(input) => { this.storeInput = input }} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
                <button type="submit">Visit Store</button>
            </form>

        )
    }
}


StorePicker.contextTypes = {
    router: PropTypes.object
}
export default StorePicker;