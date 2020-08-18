import React, { useState } from "react";
import "../stylesheets/pages/table.css";

import { APPLY } from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const AvailableTimeSlot = ({ date, time, timeSelected, selectTime }) => {
    const [selected, setSelected] = useState(timeSelected);

    const selectTimePeriode = () => {
        setSelected(!selected);
        selectTime(date, time, selected)
    };

  return(
    <td onClick={() => selectTimePeriode()} style={{ backgroundColor: selected ? "#ff5d4f": "" }} >
    </td>
  )
};

const AvailableTimeWeekCard = ({time, timePeriode, days, timeSelected, selectTime}) => {
    console.log(timeSelected);

    const existsInSelected = (date) => {
        let dato = new Date(date);
        dato.setHours(time.substring(0,2));
        console.log(dato.toString())
        console.log(dato.toUTCString())
        console.log(timeSelected.some(x => (new Date(x)).toString() == dato.toString()));
        return timeSelected.some(x => (new Date(x)).toString() == dato.toString());
    }

  return(
    <tr>
      <td className="hour" rowSpan="1">
        <span> { timePeriode } </span>
      </td>
      {
        days?.map(date => {
          return(
            <AvailableTimeSlot date={date} time={time} timeSelected={ existsInSelected(date) } selectTime={(d, t, selected) => selectTime(d, t, selected)} />
          )
        })
      }
    </tr>
  );
};


const AvailableTimesFom = (props) => {
    //console.log("Busy storage",localStorage.getItem("busyTimes"));
    //localStorage.removeItem("busyTimes");
  const startInterview = new Date("2020-08-27T00:00:00.000Z");
  const endInterview = new Date("2020-09-10T00:00:00.000Z");
  //localStorage.setItem("busyTimes",);

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
        if (selected) {
            console.log("Dato:", dato.toString());
            if (!busy.some(x => (new Date(x)).toString() == dato.toString())){
                busy.push(dato);
            }
        } else{
            if (busy.some(x => (new Date(x)).toString() == dato.toString())) {
                busy.pop(dato);
            }
        }
        localStorage.setItem("busyTimes", JSON.stringify(busy));
        setBusyTimes(busy);
    }

  const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [busyTimes, setBusyTimes] = useState(JSON.parse(localStorage.getItem("busyTimes") || "[]"));
  const [busyTimesDict, setBusyTimesDict] = useState(getWeeks());



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
                                        timeSelected={ busyTimes }
                                        selectTime={(date, time, selected) => selectTime(date, time, !selected)} 
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

export default AvailableTimesFom;