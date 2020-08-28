import React from 'react';

const PositionChoiceField = ({id, title}) => {
    return(
        <div className="rounded" style={{margin: "auto", marginBottom: "1em",marginLeft: "0.5em", width: "96%", height: "3em", backgroundColor: "#f4f4f4"}}>
            <div className="flex-grid">
                    <span>{ title }</span>
            </div>
        </div>
    )
}

const PositionChoiceBoxReadOnly = ({positions, title}) => {
    return(
        <div className="card w-100 px-2">
            <h5 className="page-title border-bottom ml-2 mt-2">{title}</h5>
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
                            title={pos.name}
                            />
                        )
                    } ) }
                </div>
            </div>
        </div>
    )
};
  
export default PositionChoiceBoxReadOnly;