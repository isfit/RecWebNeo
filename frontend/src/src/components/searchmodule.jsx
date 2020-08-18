import React, { useState } from 'react';


const FilterCheckbox = (props) => {
    return (
        <div className="row mb-3">
            <input type="checkbox" onChange={() => props.func()}/>
            <h6 className="page-title ml-2 mb-0">{props.children}</h6>
        </div>
    );
}

const SearchModule = ({sectionList, setSectionList}) => {

    const addToSectionList = (section) => {
        let copyList = [...sectionList]
        if (copyList.includes(section)) {
            const index = copyList.indexOf(section);
            if (index > -1) {
                copyList.splice(index, 1);
            }
        }else {
            copyList.push(section);
        }
        setSectionList(copyList);
    };


    return (
    <div className="row">
        <div className="card w-100">
            <h5 className="page-title ml-2 mt-2">Seach</h5>
            <form className="main-navbar__search w-50 d-none d-md-flex d-lg-flex mt-1">
                <div className="ml-3 input-group input-group-seamless">
                    <input className="navbar-search form-control" placeholder="Search for position..."></input>
                </div>
            </form>
            <h5 className="page-title ml-2 mt-3 mb-3">Filter by section</h5>
            <div className="row">
                <div className="col ml-5">
                    <FilterCheckbox func={() => addToSectionList("5f3a7eb10276b000016a0edc")}>Administration</FilterCheckbox>
                    <FilterCheckbox func={() => addToSectionList("5f3a7eaf0276b000016a0ed0")}>Communication</FilterCheckbox>
                </div>
                <div className="col">
                    <FilterCheckbox func={() => addToSectionList("5f3a7eb30276b000016a0eee")}>Participants</FilterCheckbox>
                    <FilterCheckbox func={() => addToSectionList("5f3a7eb30276b000016a0ee9")}>Organizational Resources</FilterCheckbox>
                </div>
                <div className="col">
                    <FilterCheckbox func={() => addToSectionList("5f3a7eb10276b000016a0ee0")}>Culture</FilterCheckbox>
                    <FilterCheckbox func={() => addToSectionList("5f3a7eb00276b000016a0ed7")}>Student Peace Prize</FilterCheckbox>
                </div>
            </div>
        </div> 
    </div>
    );

};


export default SearchModule;