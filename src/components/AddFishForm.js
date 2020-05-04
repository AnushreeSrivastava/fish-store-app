import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
    createFish = (e) => {
        e.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.addFish(fish);
        this.fishForm.reset();
    };

    render() {
        return (
            <form ref={(input => this.fishForm = input)} className="fish-edit" onSubmit={this.createFish}>
                <input type="text" ref={(input) => this.name = input} placeholder="Fish Name" />
                <input type="text" ref={(input) => this.price = input} placeholder="Fish Price" />
                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea ref={(input) => this.desc = input} placeholder="Fish Desc" />
                <input type="text" ref={(input) => this.image = input} placeholder="Fish Image" />
                <button type="submit">+ Add Items</button>
            </form>
        )
    }
}

AddFishForm.propTypes = {
    addFish: PropTypes.func.isRequired
}
export default AddFishForm;