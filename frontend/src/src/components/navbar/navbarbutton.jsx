import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarButton = (props) => {
    return (
      <li className="nav-item" >
        <a href={props.address} className="nav-link px-2" style={{color: "#1BAE91"}}>
          <FontAwesomeIcon className="mr-1" icon={props.iconstring} />
          {props.title}
        </a>
      </li>
    );
};

export default NavBarButton;
