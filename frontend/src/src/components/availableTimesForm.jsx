import React, { useState } from "react";
import "../stylesheets/components/availableTimesTable.css";

import {ME_BUSY_TIMES} from "../requests/userRequests";
import { useQuery } from "@apollo/client";

const AvailableTimeSlot = ({ date, time, timeSelected, selectTime, readOnly }) => {
    const [selected, setSelected] = useState(timeSelected);

    const selectTimePeriode = () => {
        setSelected(!selected);
        selectTime(date, time, selected)
    };
  if (readOnly) {
     return(<td style={{ backgroundColor: selected ? "#ff5d4f": "" }} ></td>);
  }
  else {
      return (<td onClick={() => selectTimePeriode()} style={{ backgroundColor: selected ? "#ff5d4f": "" }} ></td>);
  };
};

const AvailableTimeWeekCard = ({time, timePeriode, days, timeSelected, selectTime, readOnly}) => {

    const existsInSelected = (date) => {
        let dato = new Date(date);
        dato.setHours(time.substring(0,2));
        return timeSelected.some(x => (new Date(x)).toString() === dato.toString());
    }

  return(
    <tr>
      <td className="hour" rowSpan="1">
        <span> { timePeriode } </span>
      </td>
      {
        days?.map(date => {
          return(
            <AvailableTimeSlot date={date} time={time} timeSelected={ existsInSelected(date) } selectTime={(d, t, selected) => selectTime(d, t, selected)} readOnly={readOnly} />
          )
        })
      }
    </tr>
  );
};




const AvailableTimesForm = ({busyTimes, setBusyTimes, startDate, endDate, hourDiff, firstTimeSlot, lastTimeSlot, readOnly}) => {
  
    const ReadOnly = readOnly ? true : false;
    const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [busyTimesUpdated, setBusyTimesUpdated] = useState(busyTimes);

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const getDates = (startDate, stopDate) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    const getWeeks = () => {
        const dates = getDates(startDate, endDate);
        const weeks = new Array();
        let currentWeek = new Array();
        dates.map(day => {
            const date = new Date(day);
            const day_index = date.getDay();
            if (day_index == 1) { // Monday
                weeks.push(currentWeek);
                currentWeek = new Array();
            }
            currentWeek.push(date);
        })
        if (currentWeek != []) {
            weeks.push(currentWeek);
        }
        return weeks;
    }

    const selectTime = (date, time, selected, weekIndex) => {

        let dato = new Date(date);
        const hour = parseInt(time.substring(0,2));
        dato.setHours(hour);
        const busy = busyTimesUpdated;
        if (selected) {
            console.log("Dato:", dato.toString());
            if (!busy.some(x => (new Date(x)).toString() == dato.toString())){
                //addDate(busy, dato);
                busy.push(dato);
                }
        } else {
            if (busy.some(x => (new Date(x)).toString() == dato.toString())) {
                const index = busy.indexOf(dato);
                if (index > -1) {
                    busy.splice(index, 1);
                }
                //removeDate(busy, dato)
            }
        }
        setBusyTimesUpdated(busy);
        setBusyTimes(busy);
    }


    const addDate = (busy, dato) => {
        let copyBusy = [...busy];
        copyBusy.push(dato);
        localStorage.setItem("busyTimes", JSON.stringify(copyBusy));
        setBusyTimes(copyBusy);
    }

    const removeDate = (busy, dato) => {
        let copyBusy = [...busy];
        const date = dato.toISOString();
        const index = copyBusy.indexOf(date);
        if (index > -1) {
            copyBusy.splice(index, 1)
        }
        localStorage.setItem("busyTimes", JSON.stringify(copyBusy));
        setBusyTimes(copyBusy);
        setBusyTimes(copyBusy);
    }

    const generateTimePeriodes = (hourDiff, firstTimeSlot, lastTimeSlot) => {
        let times = [];
        let timeCounter = firstTimeSlot;
        while (timeCounter <= lastTimeSlot)
        {
            times.push( (timeCounter < 10 ?  "0" + String(timeCounter) : String(timeCounter) ) + ":00" );
            timeCounter += hourDiff;
        }
        return times;
        
    } 
    
    const [times] = useState(generateTimePeriodes(hourDiff, firstTimeSlot, lastTimeSlot));
    const [busyTimesDict] = useState(getWeeks());

  return(
      <div>
          <div>
           { console.log("BUSY TIMES", busyTimes) }
          </div>
          {
              busyTimesDict.map( days => {
                  return(
                    <div className="row">
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                {
                                    days.map(day => {
                                        return(
                                        <th>
                                            <span className="day">{ day.getDate() }</span>
                                            <span className="long"> { daysName[ day.getDay()] } </span>
                                        </th>
                                        )
                                    })
                                }
                            </tr>
                            </thead>
                            
                            <tbody>
                            {
                                times.slice(0, -1).map((time, index) => {
                                const timePeriode = times[index] + " - " + times[index+1];
                                return(
                                    <AvailableTimeWeekCard
                                        time={ times[index] } 
                                        timePeriode={timePeriode} 
                                        days={days} 
                                        timeSelected={ busyTimes }
                                        selectTime={(date, time, selected) => selectTime(date, time, !selected)}
                                        readOnly = {ReadOnly}
                                    />
                                )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                  )
              })
          }
      </div>
  )
};

export default AvailableTimesForm;