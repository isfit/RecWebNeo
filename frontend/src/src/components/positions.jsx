import React from "react";
import { useQuery, gql } from "@apollo/client";
import { POSITIONS } from "../requests/positionRequests";

import { connect } from "react-redux";
import { addPositionToApplication } from "../redux/actions";

import "../stylesheets/components/positions/positioncard.css";

const PositionsTable = ( { addPositionToApplication } ) => {
  const { loading, error, data } = useQuery(POSITIONS);
  console.log(loading, error, data);
  if (data == null) {
    return <div></div>;
  }

  return (
    <div className="row mt-4">
      <div className="card w-100 px-3 py-3">
              {data.positions.nodes.map((position) => {
                return <PositionRow position={position} addPosition={(id, name) => addPositionToApplication(id, name) } />;
              })}
        </div>
      </div>
  );
};

const PositionRow = ({ position, addPosition }) => {
  let bg = require("./favicon.ico");
  return (
    <div className="position-entry py-2 px-2 mb-2">
      <div className="flex-grid">
        <div className="col">
          <h4>{position.name}</h4>
          <span>{ position.team.name }</span>
        </div>
        <div className="right">
          <button type="button" className="btn btn-outline-success" onClick={() => addPosition(position.id, position.name)}>+</button>
        </div>
      </div>    
    </div>

  );
};

export default connect(null, { addPositionToApplication })(PositionsTable);
