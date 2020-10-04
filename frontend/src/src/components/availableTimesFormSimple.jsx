import React, { useState, useEffect } from "react";
import "../stylesheets/components/availableTimesTable.css";

import Loading from './loadingSpinner.jsx'

import {ME_BUSY_TIMES} from "../requests/userRequests";
import { useQuery } from "@apollo/client";

const AvailableTimeSlot = ({ date, time, timeSelected, selectTime, readOnly, selectSingleTimeMode,markPastDates }) => {
    const [selected, setSelected] = useState(timeSelected);

    useEffect(() => {
        setSelected(timeSelected)
    }, [timeSelected]);

    const selectTimePeriode = () => {
        if(!selectSingleTimeMode){
            setSelected(!selected);
        }
        selectTime(date, time, selected)
    };

    let currentTime = new Date()
    let slotTime = new Date(date);
    let hour = parseInt(time.substring(0,2));
    slotTime.setHours(hour);

    if (readOnly) {
       return(<td style={{ backgroundColor: selected ? "#ff5d4f": "" }} ></td>);
    }
    else if(slotTime < currentTime && markPastDates){
      return(<td style={{backgroundColor:"#595959"}} ></td>);
    }
    else {
        return (<td onClick={() => selectTimePeriode()} style={{ backgroundColor: selected ? "#ff5d4f": "" }} ></td>);
    };
};

const AvailableTimeWeekCard = ({time, timePeriode, days, timeSelected, selectTime, readOnly, selectSingleTimeMode, markPastDates}) => {

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
            <AvailableTimeSlot date={date} time={time} timeSelected={ existsInSelected(date) } selectTime={(d, t, selected) => selectTime(d, t, selected)} readOnly={readOnly} selectSingleTimeMode={selectSingleTimeMode} markPastDates={markPastDates} />
          )
        })
      }
    </tr>
  );
};




const AvailableTimesFormSimple = ({busyTimes, setBusyTimes, startDate, endDate, hourDiff, firstTimeSlot, lastTimeSlot, readOnly, selectSingleTimeMode=false, markPastDates=false}) => {
  
    const ReadOnly = readOnly ? true : false;
    const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [busyTimesUpdated, setBusyTimesUpdated] = useState(busyTimes.slice());


    const IsValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
      }


    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const GetDates = ({startDate, endDate}) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    const GetWeeks = () => {
        const dates = GetDates({startDate, endDate});
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

    const selectTime = (date, time, selected) => {
        let dato = new Date(date);
        const hour = parseInt(time.substring(0,2));
        dato.setHours(hour);
        if (selectSingleTimeMode != undefined && selectSingleTimeMode) {
            setBusyTimesUpdated([dato]);
            setBusyTimes(dato);
            return dato;
        }
        let busy = [...busyTimesUpdated];
        if (selected) {
            if (!busy.some(x => (new Date(x)).toString() == dato.toString())){
                busy.push(dato);
            }
        } else {
            busy = busy.filter(x => (new Date(x)).toString() != dato.toString());
        }
        setBusyTimesUpdated(busy);
        setBusyTimes(busy);
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


    return(
      <div>
          {!IsValidDate(startDate) ? <Loading /> : GetWeeks().map( days => {
                  return(
                    <div className="row">
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                {days.map(day => {
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
                            {times.slice(0, -1).map((time, index) => {
                                const timePeriode = times[index] + " - " + times[index+1];
                                return(
                                    <AvailableTimeWeekCard
                                        time={ times[index] } 
                                        timePeriode={timePeriode} 
                                        days={days} 
                                        timeSelected={ busyTimes }
                                        selectTime={(date, time, selected) => selectTime(date, time, !selected)}
                                        readOnly = {ReadOnly}
                                        selectSingleTimeMode = {selectSingleTimeMode}
                                        markPastDates = {markPastDates}
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

export default AvailableTimesFormSimple;