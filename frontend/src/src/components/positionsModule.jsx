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


  function pairwise(arr, func){
    for(var i=0; i < arr.length - 1; i=i+2){
        func(arr[i], arr[i + 1])
    }
  }

  let arr = [1, 2, 3, 4];

  pairwise(arr, function(current, next){
      console.log(current, next)
  })
  
  const sectionCards = (sectionId, eventKey) => {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="btn btn-success dropdown-toggle w-100" eventKey={""+ eventKey}>
            <p >{data.positions.nodes.find(e => e.section.id == sectionId).section.name}</p>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={""+ eventKey}>
          <Card.Body>
            <div className="card-group">
            <ScrollList>
              <div className="flex-grid w-100" style={{flexDirection:"column", maxHeight:"600px"}}>
                {data.positions.nodes.filter(position => position?.section?.id === sectionId).map(position => {
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
            </ScrollList>
            </div>
          </Card.Body>
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
      <small className="text-dark pl-2 pb-2">Click on the positions for more information.</small>
      <PositionDescriptionModal position={positionData} />
      <div>
        <Accordion className="customAccordian w-100">
            {sectionCards(sectionList[0], 0)}
            {sectionCards(sectionList[1], 1)}
            {sectionCards(sectionList[2], 2)}
            {sectionCards(sectionList[3], 3)}
            {sectionCards(sectionList[4], 4)}
            {sectionCards(sectionList[5], 5)}

        </Accordion>
        <br></br>

      </div>

    </div>
  );
};

const PositionRow = ({ position, openPositionModal, addPositionToApplication }) => {
  return (
    <div className="position-entry py-3 px-3 mb-2 ml-1">
      <div className="flex-grid">
          <a className="flex-grid" style={{flexBasis: "90%", flexDirection:"column"}} onClick={() => openPositionModal(position)}>
              <div>
                <h4>{position?.name}</h4>
              </div>
              <div className="flex-grid w-75" style={{alignContent: "space-between"}}>
                <div className="col pl-0">
                  <p className="text-muted mb-0">Section: {position?.section?.name}</p>
                </div>
                <div className="col">
                  <p className="text-muted mb-0">Team: {position?.team?.name}</p>
                </div>
              </div>
          </a>
          <div className="col py-4 px-auto" style={{flexBasis: "10%"}}>
            <button type="button" style={{float:"right"}} className="btn btn-outline-success" onClick={() => addPositionToApplication(position.id, position.name)}>
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
