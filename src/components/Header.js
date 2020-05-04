import React from 'react';
import PropTypes from 'prop-types';


//this is a stateless functional component.
//Functional comp are helpful when there is not much data involvement.
const Header = (props) => {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                 Day</h1>
            {/* Here this is refering to the Header class/component and props is an object of that class
            ,from which we can access its property tagline (props.tagline) */}
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    )
}

Header.propTypes = {
    tagline: PropTypes.string.isRequired
}
export default Header;