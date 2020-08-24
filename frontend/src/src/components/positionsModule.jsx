import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {FILTER_POSITIONS} from '../requests/positionRequests';

import "../stylesheets/components/positions/positioncard.css";

import PositionDescriptionModal from "./modal/positionDescriptionModal";
import { connect } from "react-redux";
import { openPositionModal, addPositionToApplication } from "../redux/actions";
import { getPositionModalState } from "../redux/selectors";
import ScrollList from "./scrollList";
import SearchModule from "./searchmodule";
import {GET_SECTIONS} from "../requests/userRequests";
import {Promise as resolve} from "q";
import Button from 'react-bootstrap/Button';
import Fade from "react-bootstrap/Fade";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";


const PositionsTable = ({ showPositionModal, openPositionModal, addPositionToApplication}) => {

  const [positionData, setPositionData] = useState(null);

  const sectionQuery = useQuery(GET_SECTIONS);

  const sectionList = sectionQuery?.data?.sections?.map(e => e.id);

  

  const [nee, setSectionList] = useState([]);

  function getSectionList() {
    return sectionList;
  }

  const addSectionList = () => setSectionList([...sectionList, {}]);


  const positionQuery = () => {
    if (sectionList?.length === 0) {
      return null
    }
    const queryArguments = {
      variables: {
        input: {
          section_in: sectionList
        }
      }
    };
    return queryArguments;
  };

  const {data} = useQuery(FILTER_POSITIONS, positionQuery());

  const [open, setOpen] = useState(false);


  console.log(sectionList);

  
  const sectionCards = (sectionId, eventKey) => {
    return (
      <Card className="card-group">
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={""+ eventKey}>
            <p>{data.positions.nodes.find(e => e.section.id == sectionId).section.name}  </p>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={""+ eventKey}>
          <Card.Body><div className="px-1 py-3 w-50">
            {data.positions.nodes.filter(position => position?.section?.id === sectionId).map((position) => {
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
          </div></Card.Body>
        </Accordion.Collapse>
      </Card>

    )
  }


  const allSectionCards = () => {
      let cards = [];
      for (var i = 0; i < sectionList; i++) {
          cards.push(sectionCards(sectionList[i], i));
      }
      return (
        <div>
          {cards}
        </div>
      )
  }

  if (data == null) {
    return <div></div>;
  }


  return (
    <div>
      <PositionDescriptionModal position={positionData} />
      <small className="text-dark pl-2 pb-2">Click for more information about the positions.</small>
      <div>

        <Accordion defaultActiveKey="none" style={{width: "70vw"}}>
          <div>
            {sectionCards(sectionList[0], 0)}
            {sectionCards(sectionList[1], 1)}
            {sectionCards(sectionList[2], 2)}
            {sectionCards(sectionList[3], 3)}
            {sectionCards(sectionList[4], 4)}
            {sectionCards(sectionList[5], 5)}
          </div>

        </Accordion>
        <br></br>

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
    openPositionModal: openPositionModal(state),

  };
};

export default connect(mapStateToProps, { addPositionToApplication, openPositionModal })(PositionsTable);
