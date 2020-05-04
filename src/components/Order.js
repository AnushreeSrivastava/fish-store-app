import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';
// import { CSSTransitionGroup } from 'react-transition-group';

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.orders[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if (!fish || fish.status == 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton} </li>
        }

        return (
            <li key={key}>
                <span>{count} lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(fish.price * count)} </span>
            </li>
        )
    }

    render() {
        //since this.props,orders get passed down as object.We need it in array form
        const orderIds = Object.keys(this.props.orders);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.orders[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }
        }, 0)

        return (
            <div className="order-wrap">
                <h2>Your Orders</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>

        )
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
}

export default Order;