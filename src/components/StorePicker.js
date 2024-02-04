import React, { useRef } from "react";
import { getFunName } from "../helpers";
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';


const StorePicker = () => {

    const myInput = useRef();
    const navigate = useNavigate();


    const goToStore = (event) => {
        event.preventDefault();
        const storeName = myInput.current.value;
        navigate(`/store/${storeName}`);

    };

    return (
        <form className="store-selector" onSubmit={goToStore} >
            <h2>Please enter a store</h2>
            <input type="text" required placeholder="Store Name" ref={myInput} defaultValue={getFunName()} />
            <button type="submit">Visit Store {`->`}</button>
        </form>

    );

}

StorePicker.propTypes = {
    history: PropTypes.object
}

export default StorePicker;

