import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { POSITIONS } from "../requests/positionRequests";

import "../stylesheets/components/positions/positioncard.css";

import PositionModal from "./modal/positionmodal";
import { connect } from "react-redux";
import { openPositionModal } from "../redux/actions";
import { getPositionModalState } from "../redux/selectors";

const PositionsTable = ({ showPositionModal, openPositionModal }) => {
  const { loading, error, data } = useQuery(POSITIONS);
  const [positionData, setPositionData] = useState(null);
  console.log(loading, error, data);
  if (data == null) {
    return <div></div>;
  }

  return (
    <div className="row mt-4">
      <PositionModal position={positionData} />
      <div className="card w-100 px-3 py-3">
        {data.positions.nodes.map((position) => {
          return (
            <PositionRow
              position={position}
              openPositionModal={(position) => {
                setPositionData(position);
                openPositionModal();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const PositionRow = ({ position, showPositionModal, openPositionModal }) => {
  let bg = require("./favicon.ico");
  return (
    <div className="position-entry py-2 px-2 mb-2">
      <a onClick={() => openPositionModal(position)}>
        <div className="flex-grid">
          <div className="col">
            <h4>{position.name}</h4>
            <span>{position.team.name}</span>
          </div>
          <div className="right">
            <button type="button" className="btn btn-outline-success">
              +
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showPositionModal: getPositionModalState(state),
  };
};

export default connect(mapStateToProps, { openPositionModal })(PositionsTable);
