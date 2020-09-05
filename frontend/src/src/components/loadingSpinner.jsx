import React from "react";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: relative;
`;

const Loading = (props) => {

    return (
        <div className="flex-grid" style={{height:"15px", justifyContent:"center"}}>
        <PropagateLoader
          size={15}
          color={"#1bae91"}
          loading={props.loading}
        />
        </div>
    );
};

export default Loading;