import React, { Component } from 'react';


class SearchModule extends Component {
    state = {  }

    renderCheckbox(tag){
        return (
            <div className="row mb-3">
                <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
                <h6 className="page-title ml-2 mb-0">{tag}</h6>
            </div>
        );
    }

    render() {
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
                        {this.renderCheckbox("Administration")}
                        {this.renderCheckbox("Communication")}
                    </div>
                    <div className="col">
                        {this.renderCheckbox("Participants")}
                        {this.renderCheckbox("Organizational Resources")}
                    </div>
                    <div className="col">
                        {this.renderCheckbox("Student Peace Prize")}
                        {this.renderCheckbox("Culture")}
                    </div>
                </div>
            </div>
        </div>

        );
    }

}


export default SearchModule;