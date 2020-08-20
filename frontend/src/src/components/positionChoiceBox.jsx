import React from 'react';
import { connect } from "react-redux";
import { addPositionToApplication, prioritizePosition, dePrioritizePosition, removePositionFromApplication } from "../redux/actions";
import { getAppliedPositions } from "../redux/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PositionChoiceField = ({id, title, prioritize, dePrioritize, remove}) => {
    return(
        <div className="rounded" style={{margin: "auto", marginBottom: "1em",marginLeft: "0.5em", width: "96%", height: "3em", backgroundColor: "#f4f4f4"}}>
            <div className="flex-grid">
                <div className="col" style={{flexGrow:3}}>
                    <span>{ title }</span>
                </div>
                <div className="col p-0 py-2" style={{flexGrow:1}}>
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
            <div className="flex-grid">
                <div className="col" style={{flexGrow:1, padding:0}}>
                    <h5 className="mt-2">1.</h5>
                    <h5 className="pt-4 mt-3">2.</h5>
                    <h5 className="pt-4 mt-3">3.</h5>
                </div>
                <div className="col px-0" style={{flexGrow:19}}>
                    { positions.map( pos => {
                        return(
                        <PositionChoiceField 
                            id={pos.id}
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