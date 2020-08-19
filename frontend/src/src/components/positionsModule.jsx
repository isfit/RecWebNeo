import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { POSITIONS } from "../requests/positionRequests";
import {FILTER_POSITIONS} from '../requests/positionRequests';


import "../stylesheets/components/positions/positioncard.css";

import PositionDescriptionModal from "./modal/positionDescriptionModal";
import { connect } from "react-redux";
import { openPositionModal, addPositionToApplication } from "../redux/actions";
import { getPositionModalState } from "../redux/selectors";
import { useEffect } from "react";


const PositionsTable = ({ showPositionModal, openPositionModal, addPositionToApplication, sectionList }) => {
  
  const positionQuery = () => {
    if (sectionList.length == 0) {
      console.log("Sending null")
      return null
    }
    const queryArguments = {
      variables: {
        input: {
          section_in: sectionList
        }
      }
    }
    console.log("Sending arguments" ,queryArguments);
    return queryArguments;
  }

  const {data, error, loading} = useQuery(FILTER_POSITIONS, positionQuery());

  const [positionData, setPositionData] = useState(null);
  console.log(loading, error, data);

  if (data == null) {
    return <div></div>;
  }
  
  console.log("Positions", data);

  return (
    <div className="row mt-4">
      { console.log("Position modal data", positionData) }
      <PositionDescriptionModal position={positionData} />
      <div className="card w-100 px-3 py-3">
        {data.positions.nodes.map((position) => {
          return (
            <PositionRow
              position={position}
              openPositionModal={(position) => {
                console.log("Setting position data", position);
                setPositionData(position);
                openPositionModal();
              }}
              addPositionToApplication={(id, name) => addPositionToApplication(id, name)}
            />
          );
        })}
      </div>
    </div>
  );
};

const PositionRow = ({ position, openPositionModal, addPositionToApplication }) => {
  return (
    <div className="position-entry py-2 px-2 mb-2">
        <div className="flex-grid">
         <a className="col" style={{flexGrow: 9}} onClick={() => openPositionModal(position)}>
                <h4>{position?.name}</h4>
                <span>{position?.team?.name}</span>
          </a>
          <div className="col" style={{flexGrow: 1}}>
          <button type="button" className="btn btn-outline-success w-100 h-100" onClick={() => addPositionToApplication(position.id, position.name)}>
              +
            </button>
          </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showPositionModal: getPositionModalState(state),
  };
};

export default connect(mapStateToProps, { addPositionToApplication, openPositionModal })(PositionsTable);
