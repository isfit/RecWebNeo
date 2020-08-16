import React from "react";
import "../../stylesheets/navigation/navigationLink.css";
import { Link } from "react-router-dom";

const NavigationLink = (props) => {
  const { fontSize, color, link, active } = props;

  if (active) {
    return (
      <div className={"linkWrapper"}>
        <Link
          to={link}
          className={"pageLink"}
          style={{ color: color, fontSize: fontSize }}
        >
          {props.children}
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

NavigationLink.defaultProps = {
  fontSize: "1em",
  color: "white",
  link: "#",
  active: true,
};

export default NavigationLink;
