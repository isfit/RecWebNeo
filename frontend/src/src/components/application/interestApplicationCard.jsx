import React from 'react';

const InterestApplicationCard = ({interest, setInterest}) => {
    return (
        <div className="card px-3 py-3 mb-2 w-100">
            <p>During the application process, we might discover that you are a good fit for a different position than those you have applied for. Would you be open to get an offer for a position different from the ones you have entered? </p>
            <div className="flex-grid">
                <input type="radio" checked={interest === "OnlyPositions"} onChange={() => setInterest("OnlyPositions")} />
                <h6 className="page-title ml-2 mb-0">I am only interested in the positions I have entered</h6>
            </div>
            <div className="flex-grid mt-3">
                <input type="radio" checked={interest === "Same"} onChange={() => setInterest("Same")} />
                <h6 className="page-title ml-2 mb-0">I am open to other postions within the same genre of the positions I have entered</h6>
            </div>
            <div className="flex-grid mt-3">
                <input type="radio" checked={interest === "Open"} onChange={() => setInterest("Open")} />
                <h6 className="page-title ml-2 mb-0">I am open to any other position in ISFiT, regardless of the positions I have entered</h6>
            </div> 
        </div>
    )
}

InterestApplicationCard.defaultProps = {
    interest: "OnlyPositions",
    setInterest: () => true    
}

export default InterestApplicationCard;