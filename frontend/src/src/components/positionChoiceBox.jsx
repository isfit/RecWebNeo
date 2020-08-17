import React, { useState } from 'react';
import { connect } from "react-redux";
import { addPositionToApplication, prioritizePosition, dePrioritizePosition, removePositionFromApplication } from "../redux/actions";
import { getAppliedPositions } from "../redux/selectors";

const PositionChoiceField = ({id, title, prioritize, dePrioritize, remove}) => {
    return(
        <div className="rounded" style={{margin: "auto", marginBottom: "1em", width: "90%", height: "3em", backgroundColor: "#f4f4f4"}}>
            { title }
            <button onClick={() => prioritize(id)}> Up </button>
            <button onClick={() => dePrioritize(id)}> Down </button>
            <button onClick={() => remove(id)}> Delete </button>
        </div>
    )
}

const PositionChoicBox = ({positions, positionsUpdated, prioritizePosition, dePrioritizePosition, removePositionFromApplication}) => {
    
    return(
        <div className="card w-100">
            <h5 className="page-title border-bottom ml-2 mt-2">Positions</h5>
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
    )
};

const mapStateToProps = state => {
    console.log("State:", state.application.positionsUpdated);
    return {
      positions: getAppliedPositions(state),
      positionsUpdated: state.application.positionsUpdated
    };
  };
  
export default connect(mapStateToProps, { addPositionToApplication, prioritizePosition, dePrioritizePosition, removePositionFromApplication })(PositionChoicBox);