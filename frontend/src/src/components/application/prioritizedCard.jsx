import React from 'react';

const PrioritizedCard = ({readOnly, prioritizedValue, setPrioritized}) => {

    return(
        <div className="card mb-2 px-3 py-2 w-100">
            <div className="">
            <p>We understand that it might be hard to prioritize the positons you want to apply for. By unchecking the box below, we know that you don't have any specific preference between the positions you have entered. We can talk about which of the positions suits you best during the interview. </p>
            <div className="flex-grid mb-3">
                <input type="checkbox" checked={prioritizedValue} onChange={() => setPrioritized(!prioritizedValue)} readOnly={readOnly} />
                <h6 className="page-title pl-2 mb-0">The positions in my application are prioritized</h6>
            </div>
            </div>
        </div>
    )
}

export default PrioritizedCard;