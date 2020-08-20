
import React, { useState } from "react";
import { prioritizePosition } from "../redux/actions";


const TextBox = (props) => {
    return (
        <div className="card w-100 px-5 py-3">
            {props.children}
        </div>
    );
};


export default TextBox;