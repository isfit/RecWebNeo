import React, { useState } from 'react';
import NavBar from '../components/navbar';
import Positions from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';

import LogInModal from '../components/modal/loginmodal';

import "../stylesheets/pages/table.css";

import { APPLY } from "../requests/userRequests";
import { useMutation } from "@apollo/client";


const AvaiableTimesPage = (props) => {
    const [updateRegistration, { data, error, loading }] = useMutation(APPLY, {
        onError: () => {},
    });

    const [textInput, setTextInput] = useState("");
    const [positionsInput, setPositionsInput] = useState("");
    const [priorityInput, setPriorityInput] = useState("");
    const [otherPositionsInput, setOtherPositions] = useState("");
    const [hoursInput, setHoursInput] = useState("");

    const apply = (event) => {
        event.preventDefault();
        const variableData = {
          variables: {
            input: {
            }
          }
        };
        updateRegistration(variableData);
    };

    return (
        <div className="page">
          <div className="page-main">
            <NavBar showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal } />
            <LogInModal showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal } />
            <div className="page-content bg-light">
              <div className="container">
                <div className="page-header pt-3 mb-4">
                  <h4 className="page-title">Enter the hours you are busy</h4>
                </div>
                <div className="row">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <span className="day">1</span>
                            <span className="long">Monday</span>
                            <span className="short">Mon</span>
                          </th>
                          <th>
                            <span className="day">2</span>
                            <span className="long">Tuesday</span>
                            <span className="short">Tue</span>
                          </th>
                          <th>
                            <span className="day">3</span>
                            <span className="long">Wendsday</span>
                            <span className="short">We</span>
                          </th>
                          <th>
                            <span className="day">4</span>
                            <span className="long">Thursday</span>
                            <span className="short">Thur</span>
                          </th>
                          <th>
                            <span className="day">5</span>
                            <span className="long">Friday</span>
                            <span className="short">Fri</span>
                          </th>
                          <th>
                            <span className="day">6</span>
                            <span className="long">Saturday</span>
                            <span className="short">Sat</span>
                          </th>
                          <th>
                            <span className="day">7</span>
                            <span className="long">Sunday</span>
                            <span className="short">Sun</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="hour" rowSpan="1"><span>08:00-10:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>10:00-12:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>12:00-14:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>16:00-18:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>18:00-20:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
                 <div className="row">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <span className="day">1</span>
                            <span className="long">Monday</span>
                            <span className="short">Mon</span>
                          </th>
                          <th>
                            <span className="day">2</span>
                            <span className="long">Tuesday</span>
                            <span className="short">Tue</span>
                          </th>
                          <th>
                            <span className="day">3</span>
                            <span className="long">Wendsday</span>
                            <span className="short">We</span>
                          </th>
                          <th>
                            <span className="day">4</span>
                            <span className="long">Thursday</span>
                            <span className="short">Thur</span>
                          </th>
                          <th>
                            <span className="day">5</span>
                            <span className="long">Friday</span>
                            <span className="short">Fri</span>
                          </th>
                          <th>
                            <span className="day">6</span>
                            <span className="long">Saturday</span>
                            <span className="short">Sat</span>
                          </th>
                          <th>
                            <span className="day">7</span>
                            <span className="long">Sunday</span>
                            <span className="short">Sun</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="hour" rowSpan="1"><span>08:00-10:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>10:00-12:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>12:00-14:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>16:00-18:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>18:00-20:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
                 <div className="row">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <span className="day">1</span>
                            <span className="long">Monday</span>
                            <span className="short">Mon</span>
                          </th>
                          <th>
                            <span className="day">2</span>
                            <span className="long">Tuesday</span>
                            <span className="short">Tue</span>
                          </th>
                          <th>
                            <span className="day">3</span>
                            <span className="long">Wendsday</span>
                            <span className="short">We</span>
                          </th>
                          <th>
                            <span className="day">4</span>
                            <span className="long">Thursday</span>
                            <span className="short">Thur</span>
                          </th>
                          <th>
                            <span className="day">5</span>
                            <span className="long">Friday</span>
                            <span className="short">Fri</span>
                          </th>
                          <th>
                            <span className="day">6</span>
                            <span className="long">Saturday</span>
                            <span className="short">Sat</span>
                          </th>
                          <th>
                            <span className="day">7</span>
                            <span className="long">Sunday</span>
                            <span className="short">Sun</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="hour" rowSpan="1"><span>08:00-10:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>10:00-12:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>12:00-14:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>16:00-18:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="hour" rowSpan="1"><span>18:00-20:00</span></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
                 <div className="row">
                  <div className="col mb-3">
                      <button type="button" className="btn btn-outline-secondary float-left">Back</button>
                      <a type="button" className="btn btn-outline-success float-right" href="/myapplication">Continue</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );

};

export default AvaiableTimesPage;