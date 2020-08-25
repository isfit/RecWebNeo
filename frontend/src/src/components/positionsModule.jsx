import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {FILTER_POSITIONS} from '../requests/positionRequests';

import "../stylesheets/components/positions/positioncard.css";

import PositionDescriptionModal from "./modal/positionDescriptionModal";
import { connect } from "react-redux";
import { openPositionModal, addPositionToApplication } from "../redux/actions";
import { getPositionModalState } from "../redux/selectors";

const PositionsTable = ({ showPositionModal, openPositionModal, addPositionToApplication, sectionList }) => {

  const positionQuery = () => {
    if (sectionList.length === 0) {
      return null
    }
    const queryArguments = {
      variables: {
        input: {
          section_in: sectionList
        }
      }
    }
    return queryArguments;
  }

  const {data} = useQuery(FILTER_POSITIONS, positionQuery());

  const [positionData, setPositionData] = useState(null);

  if (data == null) {
    return <div></div>;
  }

  return (
    <div>
      <PositionDescriptionModal position={positionData} />
      <small className="text-dark pl-2 pb-2">Click on the positions for more information.</small>

      <div className="card px-3 py-3 card-group">
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
  return (
    <div className="position-entry py-2 px-2 mb-2">
      <div className="flex-grid" style={{height: '200px'}}>
         <a className="col" style={{flexGrow: 9}} onClick={() => openPositionModal(position)}>
                <h4>{position?.name}</h4>
                <p className="text-muted mb-0">Section:</p>
                <p className="text-muted mb-2">{position?.section?.name}</p>
                <p className="text-muted mb-0">Team:</p>
                <p className="text-muted mb-0">{position?.team?.name}</p>
          </a>
          <div className="col py-5" style={{flexGrow: 2}}>
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
