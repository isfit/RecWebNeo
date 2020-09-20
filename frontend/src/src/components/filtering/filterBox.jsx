import React, { useState, useEffect, useRef  } from "react";
import {getSectionFromID, FilterPositionsResults } from "./SectionTeamFilteringFunction";


const FilterBox = ({sections, positions, chosenSection, setChosenSection, chosenTeam, setChosenTeam, chosenPosition, setChosenPosition, setSearchTerm,children}) => {

    const [temporarySearchTerm, setTemporarySearchTerm] = useState("");
    const [searchMode, setSearchMode] = useState(true);

    const positionRef= useRef(null);
    const teamRef = useRef(null);

    useEffect(() => {                                                                     //If you choose a new section, reset both chosen team and position
        Boolean(positionRef?.current?.value) ? positionRef.current.click() : console.log();
        Boolean(teamRef?.current?.value) ? teamRef.current.click() : console.log();
      }, [chosenSection]);
  
    useEffect(() => {                                                                    //If you choose a new team, reset chosen position
    Boolean(positionRef?.current?.value) ? positionRef.current.click() : console.log();
    }, [chosenTeam]);


    const enableSearchMode = () => {
        setSearchMode(true);
        setTemporarySearchTerm("");
        setSearchTerm("");
    };
    
    const disableSearchMode = () => {
        setSearchMode(false);
        setSearchTerm(temporarySearchTerm);
    };


    return(
        <div className="card py-2 px-2 mb-3">
            <h6>Filters</h6>
            <small>Section</small>
            <form action="">
                <select className="w-100" id="sections" name="sections" onChange={(e) => {setChosenSection(e.target.value)}} >
                    <option value={""}>{"All"}</option>
                    {sections?.sections.map( section => {
                        return (
                            <option value={section.id}>{section.name}</option>
                        )
                      })}
                </select>
            </form>
            <small>Team</small>
                <form action="">
                <select className="w-100" id="teams" name="teams" onChange={(e) => {setChosenTeam(e.target.value)}} >
                    <option value={""}>{"All"}</option>
                    {getSectionFromID(sections, chosenSection).teams?.map( team => {
                        return (
                            <option value={team.id}>{team.name}</option>
                        )
                        })}
                </select>
                    <input type="reset" value="NewSectionResetTeam" ref={teamRef} onClick={() => setChosenTeam("")} style={{display:"none"}}/>
                </form>
            <small>Position</small>
            <form action="">
                <select className="w-100" id="positions" name="positions" onChange={(e) => {setChosenPosition(e.target.value)}}>
                    <option value={""}>{"All"}</option>
                    {FilterPositionsResults({positions,chosenSection,chosenTeam}).map( position => {
                          return (
                              <option value={position.id}>{position.name}</option>
                          )
                      })}
                </select>
                <input type="reset" value="NewSectionResetPositions" ref={positionRef} onClick={() => setChosenPosition("")} style={{display:"none"}}/>
            </form>

            {children}

            Search
            <div>
                <input placeholder="Applicant name" value={temporarySearchTerm} className="w-100" onChange={(e) => setTemporarySearchTerm(e.target.value)}/>
                { searchMode ? <button type="button" className="btn btn-success mt-1" style={{float:"right"}} onClick={() => disableSearchMode() }>Search</button> : <button type="button" className="btn btn-secondary mt-1" style={{float:"right"}} onClick={() => enableSearchMode()}>Reset</button> }
            </div>
        </div>  
    );
};


export default FilterBox;