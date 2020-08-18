import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { POSITIONS } from "../requests/positionRequests";
import {FILTER_POSITIONS} from '../requests/positionRequests';


import "../stylesheets/components/positions/positioncard.css";

import PositionModal from "./modal/positionmodal";
import { connect } from "react-redux";
import { openPositionModal, addPositionToApplication } from "../redux/actions";
import { getPositionModalState } from "../redux/selectors";


/* const [updateSectionFilter, { data, error, loading}] = useMutation(FILTER_POSITIONS, { onError: () => {} });
  
  const filter = (event) => {
    event.preventDefault();
    updatePositions({variables: { where: { section_in: {} } }});
  }; */

const PositionsTable = ({ showPositionModal, openPositionModal, addPositionToApplication, sectionList }) => {
  
  /* const [updateSectionFilter, {data, error, loading}] = useQuery(FILTER_POSITIONS, { onError: () => {} }); */
  /* const [updateSectionFilter,{ loading, error, data }] = useQuery(FILTER_POSITIONS);
 */
  const { loading, error, data } = useQuery(POSITIONS);
  const [positionData, setPositionData] = useState(null);
  console.log(loading, error, data);


  const filter = (event) => {
    event.preventDefault();
    const positionQuery = {
      variables: {
        where: {
          section_in: ["5f3a7eb00276b000016a0ed7"],
        }
      }
    }

    /* updateSectionFilter(positionQuery); */
  };

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
              addPositionToApplication={(id, name) => addPositionToApplication(id, name)}
            />
          );
        })}
      </div>
    </div>
  );
};

const PositionRow = ({ position, openPositionModal, addPositionToApplication }) => {
  let bg = require("./favicon.ico");
  return (
    <div className="position-entry py-2 px-2 mb-2">
        <div className="flex-grid">
         <a className="col" style={{flexGrow: 9}} onClick={() => openPositionModal(position)}>
                <h4>{position.name}</h4>
                <span>{position.team.name}</span>
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
