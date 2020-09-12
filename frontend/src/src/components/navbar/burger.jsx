import React, {useState} from "react";

import "../../stylesheets/components/navbar/burger.css";




const Burger = ({activateSideBar}) => {


    return (
        <div className="burger" onClick={activateSideBar}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
        </div>
    )
}



export default Burger;