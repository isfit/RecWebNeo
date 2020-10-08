import React, {useState, useEffect} from "react";
import PageLayout from './pageLayout';
import { connect } from "react-redux";

import Loading from '../components/loadingSpinner';

import { useQuery, useMutation } from "@apollo/client";

import { ALL_INTERVIEWS, DELETE_INTERVIEW, SET_INTERVIEW_STATUS, ALL_INTERVIEWS_BY_DATE  } from "../requests/interviewRequests";
import { GET_SECTIONS } from "../requests/userRequests";
import { POSITIONS } from "../requests/positionRequests";

import { getUserAuthKey } from "../redux/selectors";

import { getRolesFromToken, getAccessLevel } from "../components/navbar/navbarHelperFunctions";
import { InterviewFilteringFunction } from "../components/filtering/SectionTeamFilteringFunction";

import Dropdown from "react-bootstrap/Dropdown";
import ScrollList from '../components/scrollList';
import FilterBox from "../components/filtering/filterBox";
import InterviewCard from "../components/interviewCard"
import Modal from '../components/modal/modal';


const AllInterviewsPage = ({userAuthKey}) => {
    const RolesArray = getRolesFromToken(userAuthKey);
    const AccessLevel = getAccessLevel(RolesArray);

    let interviewStatuses = ["Invitation sent","Confirmed","Interviewed"];
    
    
    //QUERIES
    const allIntervewsQuery = useQuery(ALL_INTERVIEWS_BY_DATE);
    const sectionsData = useQuery(GET_SECTIONS);
    const positionsData = useQuery(POSITIONS);
    const allInterviews = allIntervewsQuery?.data?.interviews?.nodes ?? [];
    let positions = positionsData?.data?.positions?.nodes ?? [];

    //MUTATIONS
    const [deleteInterviewMutation, deleteInterviewMutationData] = useMutation(DELETE_INTERVIEW,{ onCompleted: data => {
        allIntervewsQuery.refetch() //When interview is deleted, refetch all interviews
      },
    });
    const [setInterviewStatusMutation] = useMutation(SET_INTERVIEW_STATUS);

    //HOOKS
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [chosenSection, setChosenSection] = useState("");
    const [chosenTeam, setChosenTeam] = useState("");
    const [chosenPosition, setChosenPosition] = useState("");
    const [chosenInterviewStatusFilter, setChosenInterviewStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedInterviewForDeletion, setSelectedInterviewForDeletion] = useState(null);

    
    //FUNCTIONS
    const deleteInterview = (interviewId) => { 
        deleteInterviewMutation({variables: {input: {id: interviewId}}});
        setShowModal(false)
    };

    const setInterviewStatus = (intId, status) => {
        setInterviewStatusMutation({variables: {interviewId: intId, interviewStatus: status }});
    };


    function showDeleteConfirmModal(interview){
        setSelectedInterviewForDeletion(interview)
        setShowModal(true)
    }


    return(
        <PageLayout>
            <Modal showModal={showModal} setShowModal={ () => setShowModal() }>
                <div className="flex-grid" style={{flexDirection:"column"}}>
                    <h3>Are you sure you want to delete this interview?</h3>
                    <h4>{selectedInterviewForDeletion?.applicant?.user?.firstName}  {selectedInterviewForDeletion?.applicant?.user?.lastName}</h4>
                    <div className="flex-grid mt-5" style={{justifyContent:"center"}}>
                        <button className="btn btn-secondary mx-1" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => deleteInterview(selectedInterviewForDeletion?.id)}>Delete</button>
                    </div>
                </div>
            </Modal>
            <div className="container pt-4">
                <div className="flex-grid-adaptive">
                    <div className="col pl-0" style={{flexBasis:"20%"}}>
                        <FilterBox sections={sectionsData?.data} positions={positions} chosenSection={chosenSection} setChosenSection={setChosenSection} chosenTeam={chosenTeam} setChosenTeam={setChosenTeam} chosenPosition={chosenPosition} setChosenPosition={setChosenPosition} setSearchTerm={setSearchTerm}>
                            <div>
                                <small className="mt-2">Status</small>
                                <form action="">
                                    <select className="w-100" id="filterStatus" name="filterStatus" onChange={(e) => {setChosenInterviewStatusFilter(e.target.value)}}>
                                        <option value={""}>All</option>
                                        <option value={"Not assigned"}>{"Not assigned"}</option>
                                        {interviewStatuses.map( status => {
                                              return (
                                                  <option value={status}>{status}</option>
                                              )
                                          })}
                                    </select>
                                </form>
                                
                            </div>
                        </FilterBox>
                    </div>
                    <div className="col pl-0" style={{flexBasis:"80%"}}>
                        <div className="card py-3 px-3 mb-2 w-100">
                            { allIntervewsQuery.loading ? <Loading loading={true}/> : null}
                            <ScrollList minHeight="700px">
                            <h4 className="mb-4">Interviews</h4>
                            {InterviewFilteringFunction({allInterviews, chosenSection, chosenTeam, chosenPosition, chosenInterviewStatusFilter, searchTerm})[0].map( interview => {
                                return (
                                    <InterviewCard interview={interview} interviewStatuses={interviewStatuses}>
                                        <Dropdown>
                                           <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                             {Boolean(interview.status) ? interview.status : "Not assigned"}
                                           </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                               <Dropdown.Item onClick={(e) => {setInterviewStatus(interview.id, "")}}>{"Not assigned"}</Dropdown.Item>
                                             {interviewStatuses.map( status => {
                                                 return (
                                                     <Dropdown.Item onClick={(e) => {setInterviewStatus(interview.id, status)}}>{status}</Dropdown.Item>
                                                 )
                                             })}
                                           </Dropdown.Menu>
                                         </Dropdown>
                                         { (AccessLevel>3) ? <button className="btn btn-danger ml-1" onClick={() => showDeleteConfirmModal(interview)}>Delete</button> : null}
                                        {/* {(AccessLevel>2) ? deleteConfirm ? <div><button className="btn btn-secondary mx-1" onClick={() => setDeleteConfirm(false)}>Cancel</button><button className="btn btn-danger" onClick={() => deleteInterview(interview.id)}>DELETE</button></div> : <button className="btn btn-danger ml-1" onClick={() => setDeleteConfirm(true)}>Delete</button> : null} */}
                                    </InterviewCard>
                                )
                            }
                            )}
                            </ScrollList>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};


const mapStateToProps = state => {
    return {
      userAuthKey: getUserAuthKey(state)
    };
};

/* export default AllInterviewsPage; */
export default connect(mapStateToProps)(AllInterviewsPage);
