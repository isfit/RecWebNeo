import React, { useEffect } from "react";
import "../../stylesheets/navigation/navbarOverlay.css";
import NavigationLink from "./navigationLink";

const NavBarOverlay = (props) => {
  useEffect(() => {
    const overlay = document.getElementById("overlay");
    if (props.overlay) {
      overlay.className += " overlayActive";
      //overlay.style.display = "block";
    } else {
      overlay.className = "overlayWrappper";
      //overlay.style.display = "none";
    }
  });

  return (
    <div className={"overlayWrappper"} id={"overlay"}>
      <div className={"navigationLinks"}>
        <NavigationLink active={props.overlay} link={"/"}>
          Home
        </NavigationLink>

        <NavigationLink active={props.overlay}>About</NavigationLink>

        <NavigationLink active={props.overlay} link={"/social"}>
          Social
        </NavigationLink>

        <NavigationLink active={props.overlay}>Projects</NavigationLink>
      </div>
    </div>
  );
};

export default NavBarOverlay;
