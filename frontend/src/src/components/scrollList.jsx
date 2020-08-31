
import React, { useState } from "react";
import "../stylesheets/components/scrollList.css";



const ScrollList = (props) => {

    return (
        <div className="h-100 w-100">
            <nav className="h-100 w-100">
                <ul className="pl-0 w-100" style={{minHeight: props.minHeight ?? "500px"}}>
                    {props.children}
                </ul>
            </nav>
        </div>
    )
};

export default ScrollList;

