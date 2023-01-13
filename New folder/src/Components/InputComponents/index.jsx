import React from 'react';

function InputComponent(props) {
    return (
        <input type={props.type} class="form-control custom " id="" placeholder={props.placeholder} />

    );
}

export default InputComponent;