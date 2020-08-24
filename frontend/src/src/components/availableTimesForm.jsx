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




const AvailableTimesForm = (props) => {
    //console.log("Busy storage",localStorage.getItem("busyTimes"));
    //localStorage.removeItem("busyTimes");
    

  const startInterview = new Date("2020-08-27T00:00:00.000Z");
  const endInterview = new Date("2020-09-10T00:00:00.000Z");
  //localStorage.setItem("busyTimes",);
  const ReadOnly = props.readOnly ? true : false;

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
        const dates = getDates(startInterview, endInterview);
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
        const busy = busyTimes;
        const test = testTime;
        console.log("TEST", testTime)
        console.log("TESTTIMEBSY", busy)
        if (selected) {
            console.log("Dato:", dato.toString());
            if (!busy.some(x => (new Date(x)).toString() == dato.toString())){
                addDate(busy, dato);
                }
        } else {
            if (busy.some(x => (new Date(x)).toString() == dato.toString())) {
                removeDate(busy, dato)
            }
        }
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
        setBusyTimes(copyBusy)
    }
    
    console.log(props.data)
    const times = (props.data.hours == "everyHour") ? ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"] : ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]; 
    const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const test = props.data.busyTimes;
    const [testTime, setTestTime] = useState(test);
    const [busyTimes, setBusyTimes] = useState(JSON.parse(localStorage.getItem("busyTimes") || "[]"));
    const [busyTimesDict, setBusyTimesDict] = useState(getWeeks());

    console.log("props", test)
    console.log("TestTime", testTime);
    console.log("busyTime", JSON.parse(localStorage.getItem("busyTimes")));

  return(
      <div>
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
                                        timeSelected={ Boolean(props.busyTimes) ? props.busyTimes : busyTimes }
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