import React from "react";
import ApplicationsModule from "../components/applicationsModule";
import PageLayout from './pageLayout';
import PositionChoiceBoxReadOnly from "../components/positionChoiceBoxReadOnly"

const ApplicationPage = () => {

  const PositionsList = () => {
    let list = new Array({ __typename:"Position", id:"1123123", name:"hei"},{ __typename:"Position", id:"2123123123123", name:"hei2"}, { __typename:"Position", id:"123123123123", name:"hei3"}) ;
    return list;
  };

  const ApplicationRow = (props) => {
    return (
    <div className="position-entry py-2 px-2 mb-3">
        <div className="flex-grid">
          <div>
            <h4>Torstein Otterlei</h4>
            <small>Heisann, dette skal være en ganske lang tekst. Dette er en tekst og den skal være lang. Heisann, dette skal være en ganske lang tekst. Dette er en tekst og den skal være lang. Heisann, dette skal være en ganske lang tekst. Dette er en tekst og den skal være lang. Heisann, dette skal være en ganske lang tekst. Dette er en tekst og den skal være lang. Heisann, dette skal være en ganske lang tekst. Dette er en tekst og den skal være lang. </small>
            <div className="flex-grid col-list border-top mt-3">
              <div>
                <input type="checkbox" checked={true} readOnly={true}/>
                <small className="ml-2">The positions in my application are prioritized</small>
              </div>
              <div>
                <input type="radio" checked={true} readOnly={true} />
                <small className="ml-2">I am only interested in the positions I have entered</small>
              </div>
              <div>
                <input type="radio" checked={false} readOnly={true} />
                <small className="ml-2">I am open to other postions within the same genre of the positions I have entered</small>
              </div> 
              <div> 
                <input type="radio" checked={false} readOnly={true} />
                <small className="ml-2">I am open to any other position in ISFiT, regardless of the positions I have entered</small>
              </div>
            </div>
          </div>
          <PositionChoiceBoxReadOnly positions={PositionsList()} />
          
        </div>
    </div>
    );
  };
  
  return (
    <PageLayout>
      <div className="container pt-4">
        <h4 className="mb-4">View Applications</h4>
        <ApplicationRow />
        <ApplicationRow />
      </div>
    </PageLayout>
  );
};

export default ApplicationPage;
