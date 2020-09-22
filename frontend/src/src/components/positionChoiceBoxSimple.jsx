import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PositionChoiceField = ({position, currentIndex, readOnly, MovePositionUp, MovePositionDown }) => {

    return(
        <div className="rounded" style={{margin: "auto", marginBottom: "1em",marginLeft: "0.5em", width: "96%", height: "3em", backgroundColor: "#f4f4f4"}}>
            <div className="flex-grid">
                <div className="left" style={{flexBasis:"10%"}}>
                    <h4>{currentIndex+1}</h4>
                </div>
                <div className="middle">
                    <span>{ position.name }</span>
                </div>
                {readOnly ? null : <div className="right" style={{flexBasis:"20%"}}>
                    <button className="p-0 px-1" onClick={() => MovePositionUp(position.id)}> <FontAwesomeIcon icon="arrow-up" /> </button>
                    <button className="p-0 px-1" onClick={() => MovePositionDown(position.id)}> <FontAwesomeIcon icon="arrow-down" /> </button>
                </div> }
            </div>
        </div>
    )
}

const PositionChoiceBoxSimple = ({positions, title, MovePositionUp, MovePositionDown, readOnly=false}) => {
    return(
        <div className="card w-100 px-2">
            <h5 className="page-title border-bottom ml-2 mt-2">{title}</h5>
            <div className="flex-grid">
                <div className="col-list w-100">
                    { positions?.map( (pos, index) => {
                        return(
                        <PositionChoiceField 
                            position={pos}
                            currentIndex={index}
                            readOnly={readOnly}
                            MovePositionUp={(id) => MovePositionUp(id)}
                            MovePositionDown={(id) => MovePositionDown(id)}
                        />
                        )
                    } ) }
                </div>
            </div>
        </div>
    )
};
  
export default PositionChoiceBoxSimple;