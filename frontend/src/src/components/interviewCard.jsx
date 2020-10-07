import React, {useState, useEffect} from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";



const InterviewCard = ({interview, children}) => {
    const datTime = new Date(interview.start);

    return (
        <div className="card mb-2 px-3 py-2 w-100" style={{borderColor:"#40B4A3"}}>
            <div className="flex-grid" style={{justifyContent:"space-between", alignItems: "center"}}>
                <h1 className="my-1">{interview.applicant.user.firstName} {interview.applicant.user.lastName}</h1>
                <div className="flex-grid">
                    {children}
                </div>
            </div>
            <div className="flex-grid w-100 mb-1">
                <div className="col pl-0" style={{display:"flex", flexBasis:"50%", flexDirection:"column" }}>
                    <h3 className="mb-0">{datTime.toDateString()} {datTime.toTimeString().slice(0,2)}:15</h3>
                    <p className="text-muted mb-0">{interview.location}</p>
                    <p className="text-muted mb-0">{interview.applicant.user.email}</p>
                    { Boolean(interview?.applicant.user.phoneNumber) ? <p className="text-muted mb-0">{interview.applicant.user.phoneNumber}</p> : <p className="text-muted mb-0">No phonenumber registered</p>}
                    {interview?.application?.positions?.map( position => {
                        return(
                            <div className="flex-grid">
                                <div className="col pl-0" style={{display:"flex", flexBasis:"5%"}}>
                                    <h1 className="mb-0">{Number(position.key)+1}</h1>
                                </div>
                                <div className="col" style={{display:"flex", flexBasis:"95%", flexDirection:"column"}}>
                                    <p className="mb-0 mt-1">{position.value.name}</p>
                                    <small>{position.value.section.name}: {position.value.team.name}</small>
                                </div>
                            </div>
                        )
                        }
                    )}
                </div>
                <div className="col" style={{display:"flex", flexBasis:"50%", flexDirection:"column", textAlign:"right"}}>
                    <h5 className="mt-2">Interviewers</h5>
                        { interview.interviewers.map( interviewer => {
                            return(
                                <div>
                                    <p className="mb-0 mt-1">{interviewer.user.firstName} {interviewer.user.lastName}</p>
                                    <p className="text-muted" style={{fontSize:"15px"}}>{interviewer.user.email}</p>
                                </div>
                            )

                            })
                        }
                </div>
            </div>
            <Accordion defaultActiveKey="0">
              <Card style={{textAlign:"center"}}>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <a>Show application text</a>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body><p>{interview?.application?.applicationText}</p></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
        </div>
    );
};

export default InterviewCard;