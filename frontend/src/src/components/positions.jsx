import React from "react";
import { useQuery, gql } from "@apollo/client";
import { POSITIONS } from "../requests/positionRequests";

import "../stylesheets/components/positions/positioncard.css";

const PositionsTable = (props) => {
  const { loading, error, data } = useQuery(POSITIONS);
  if (data == null) {
    return <div></div>;
  }

  return (
    <div className="row mt-4">
      <div className="card w-100 px-3 py-3">
              {data.positions.nodes.map((position) => {
                return <PositionRow position={position} />;
              })}
        </div>
      </div>
  );
};

const PositionRow = ({ position }) => {
  let bg = require("./favicon.ico");
  return (
    <div className="position-entry py-2 px-2 mb-2">
      <div className="flex-grid">
        <div className="col">
          <h4>{position.name}</h4>
          <span>{ position.team.name }</span>
        </div>
        <div className="right">
          <button type="button" className="btn btn-outline-success">+</button>
        </div>
      </div>    
    </div>

  );
};

export default PositionsTable;
