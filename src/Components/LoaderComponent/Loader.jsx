import React from "react";
import './loader.css'
const Loader = ({isLoading}) => {

    return (
        isLoading ==true ?

        <div class="spinner-wrapper">
            <div class="spinner"></div>
        </div>
        :null
    );
};

export default Loader;