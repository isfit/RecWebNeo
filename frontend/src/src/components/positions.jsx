import React, { Component } from 'react';

class Positions extends Component {
    state = {  }
    

    renderPosition(){
        var bg=require('./favicon.ico')
        return (
            <tr className="">
                <td className="w-1"><span className="avatar" style={{backgroundImage: "url("+bg+")"}}></span></td>
                <td className="">God in the IT team</td>
                <td className="text-nowrap">May 6, 2018</td>
                <td className="w-0">
                    <button type="button" className="btn btn-outline-success">+</button>
                </td>
            </tr>
        );
    }

    render(){
        return (
        <div className="row mt-4">
            <div className="card w-100">
                <div className="table-responsive">
                    <table className="table card-table table-striped table-vcenter">
                        <thead className="">
                            <th className="" colSpan="2">Position</th>
                            <th className="">Expiracy date</th>
                            <th className=""></th>
                        </thead>
                        <tbody className="">
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                            {this.renderPosition()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }

    
}

 
export default Positions;