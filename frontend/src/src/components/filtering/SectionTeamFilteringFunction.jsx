import React, { useState } from "react";
import { applyMiddleware } from "redux";

const InterviewFilteringFunction = ({allInterviews, chosenSection, chosenTeam, chosenPosition, chosenInterviewStatusFilter, searchTerm}) => {
    let resultList = [...allInterviews];
    console.log("RESULTLIST: ", resultList)

    let hasChosenSection = Boolean(chosenSection);
    let hasChosenTeam = Boolean(chosenTeam);
    let hasChosenPosition = Boolean(chosenPosition);
    let hasChosenStatus = Boolean(chosenInterviewStatusFilter);
    let hasSearchTerm = Boolean(searchTerm);

    if (hasChosenSection) {
      resultList = resultList.filter(function(interview) {
        for (var i = 0; i < interview.application.positions.length; i++) {
          if (interview.application.positions[i].value.section.id === chosenSection){
            return true;
          }
        }
        return false;
      });
    }

    if (hasChosenTeam) {
      resultList = resultList.filter(function(interview) {
        for (var i = 0; i < interview.application.positions.length; i++) {
          if (interview.application.positions[i].value.team.id === chosenTeam){
            return true;
          }
        }
        return false;
      });
    }

    if (hasChosenPosition){
      resultList = resultList.filter(function(interview) {
        for (var i = 0; i < interview.application.positions.length; i++) {
          if (interview.application.positions[i].value.id === chosenPosition){
            return true;
          }
        }
        return false;
      }
    )}

    if (hasChosenStatus){
      resultList = resultList.filter(function(interview) {
        if (interview.status === chosenInterviewStatusFilter){
          return true;
        }
        return false;
      }
    )}

    if (hasSearchTerm){
      resultList = resultList.filter(function(interview) {
        let fullName = interview.applicant.user.firstName.toLowerCase() + interview.applicant.user.lastName.toLowerCase();
        if (fullName.includes(searchTerm.toLowerCase())){
          return true;
        }
        return false;
      }
    )}

    return(
        [resultList, resultList.length]
    );
  };

const getSectionFromID = (sectionsData, sectionId) => {
  let sectionsArray = sectionsData?.sections ?? [];
  let sectionObject = null;

  sectionsArray.map( section => {
      if (section.id === sectionId) {
          sectionObject = section
      }
  })

  return sectionObject ?? {teams:[]}
};

const FilterPositionsResults = ({positions,chosenSection,chosenTeam }) => {
  let resultList = [...positions];

  if (Boolean(chosenSection)) {
    resultList = resultList.filter(function(position) {
        return position.section.id === chosenSection
    });
  }

  if (Boolean(chosenTeam)) {
    resultList = resultList.filter(function(position) {
        return position.team.id === chosenTeam
    });
  }

  return (
    resultList
  )
}


export {
   InterviewFilteringFunction,
   getSectionFromID,
   FilterPositionsResults
}