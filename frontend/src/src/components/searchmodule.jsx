import React, { Component } from 'react';


class SearchModule extends Component {
    state = {  }

    renderCheckbox(tag){
        return (
            <div className="row mb-3">
                <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
                <h6 className="page-title ml-2">{tag}</h6>
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
                <h5 className="page-title ml-2 mt-3 mb-3">Filter by tags</h5>
                <div className="row">
                    <div className="col ml-5">
                        {this.renderCheckbox("Physical")}
                        {this.renderCheckbox("Creative")}
                    </div>
                    <div className="col">
                        {this.renderCheckbox("Marketing")}
                        {this.renderCheckbox("IT")}
                    </div>
                    <div className="col">
                        {this.renderCheckbox("Leadership")}
                        {this.renderCheckbox("Administrative")}
                    </div>
                </div>
            </div>
        </div>

        );
    }

}


export default SearchModule;