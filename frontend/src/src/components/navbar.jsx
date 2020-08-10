import React, { Component } from 'react';

class NavBar extends Component {
    state = {  }
    
    renderProfile() {
        let bg=require('./favicon.ico')
        return(
        <div className="dropdown">
            <a className="nav-link pr-0 leading-none">
                <span className="avatar" style={{backgroundImage: "url("+bg+")"  }}></span>
                <span class="ml-2 d-none d-lg-block">
                    <span className="text-default">Torstein Otterlei</span>
                    <small className="text-muted d-block mt-1">Administrator</small>
                </span>
            </a>
        </div>
        );
    }

    render() { 
        return (
        <div className="header py-1 border-bottom">
            <div className="container">
                <div className="d-flex">
                    <a className="header-brand mt-auto mb-auto" href="/">
                        <img src="./isfitlogo.png" class="header-brand-img" alt="Tabler React" style={{maxWidth: "70px"}}></img>
                        <span className="d-none d-md-inline ml-2">RECRUITMENT</span>
                    </a>
                    <div className="d-flex order-lg-2 ml-auto">
                        <div className="nav-item">
                            <a className="nav-link d-none d-md-flex"></a>
                            <a className="btn btn-sm btn-outline-primary" href="" target="_blank">Sign in</a>
                        </div>
                        <div className="dropdown d-flex">
                            <a className="nav-link">
                                <i className="fe fe-bell"></i>
                                <span className="nav-unread"></span>
                            </a>
                        </div>
                        {this.renderProfile()}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}




 
export default NavBar;