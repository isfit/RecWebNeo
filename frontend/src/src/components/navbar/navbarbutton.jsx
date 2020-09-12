import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarButton = (props) => {
    return (
      <li className="navbar-item">
        <a href={props.address} className="navbar-link">
          <i className="fa">
            <FontAwesomeIcon className={"fas fa-sm"} icon={props.iconstring} />
          </i>
          {props.title}
        </a>
      </li>
    );
};

export default NavBarButton;
