import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component {
    render() {
        //Destructuring the details into the variables for eaze of use
        const { image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';
        const buttonText = isAvailable ? 'Add to Order' : 'Sold Out';
        return (
            <div>
                <li className="menu-fish">
                    <img src={image} alt={name} />
                    <h3 className="fish-name">
                        {name}
                        {/*Use format price helper function to format price */}
                        <span className="price">{formatPrice(price)}</span>
                    </h3>
                    <p>{desc}</p>
                    <button onClick={() => { this.props.addToOrder(this.props.index) }} disabled={!isAvailable}>{buttonText}</button>

                </li>
            </div>
        )
    }
}

Fish.propTypes = {
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
}
export default Fish
