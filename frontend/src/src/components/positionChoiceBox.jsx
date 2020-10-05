import React from 'react';
import { connect } from "react-redux";
import { addPositionToApplication, prioritizePosition, dePrioritizePosition, removePositionFromApplication } from "../redux/actions";
import { getAppliedPositions } from "../redux/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PositionChoiceField = ({id, currentIndex, title, prioritize, dePrioritize, remove}) => {
    return(
        <div className="rounded" style={{margin: "auto", marginBottom: "1em",marginLeft: "0.5em", padding: "auto", paddingLeft: "8px", width: "96%", height: "3em", backgroundColor: "#f4f4f4"}}>
            <div className="flex-grid">
                <div className="left" style={{flexBasis:"10%"}}>
                    <h4>{currentIndex+1}</h4>
                </div>
                <div className="middle">
                    <span>{ title }</span>
                </div>
                <div className="right" style={{flexBasis:"20%"}}>
                    <button className="p-0 px-1" onClick={() => prioritize(id)}> <FontAwesomeIcon icon="arrow-up" /> </button>
                    <button className="p-0 px-1" onClick={() => dePrioritize(id)}> <FontAwesomeIcon icon="arrow-down" /> </button>
                    <button className="p-0 px-1" onClick={() => remove(id)}> <FontAwesomeIcon icon="trash-alt" /> </button>
                </div>
            </div>
        </div>
    )
}

const PositionChoiceBoxSimple = ({positions, positionsUpdated, prioritizePosition, dePrioritizePosition, removePositionFromApplication}) => {
    return(
        <div className="card w-100 px-2">
            <h5 className="page-title border-bottom ml-2 mt-2">My Positions</h5>
            <div className="flex-grid" style={{minHeight:"200px"}}>
                <div className="col-list w-100">
                    { positions.map( (pos, index) => {
                        return(
                        <PositionChoiceField 
                            id={pos.id}
                            currentIndex={index}
                            title={pos.content}
                            prioritize={id => prioritizePosition(id)} 
                            dePrioritize={id => dePrioritizePosition(id)}
                            remove={() => removePositionFromApplication(pos.id)}
                            />
                        )
                    } ) }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
      positions: getAppliedPositions(state),
      positionsUpdated: state.application.positionsUpdated
    };
  };
  
export default connect(mapStateToProps, { addPositionToApplication, prioritizePosition, dePrioritizePosition, removePositionFromApplication })(PositionChoiceBoxSimple);