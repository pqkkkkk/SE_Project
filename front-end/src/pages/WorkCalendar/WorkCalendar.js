import classNames from "classnames/bind";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import {GetAllConsultations} from "../../services/ApiService";
import {GetUser} from "../../services/UserStorageService";
import {useState, useEffect} from "react";
import styles from "./WorkSchedule.modulee.scss";
const cx = classNames.bind(styles);

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => 1,
    getDay,
    locales,
});

const mockEventData = [
    {
        title: 'Morning Meeting',
        allDay: false,
        start: new Date(2025, 0, 9, 9, 0),
        end: new Date(2025, 0, 9, 10, 0),
    },
    {
        title: 'Conference',
        start: new Date(2025, 0, 9, 13, 0),
        end: new Date(2025, 0, 9, 15, 0),
    },
];
function WorkCalendar()  {
    const currentUser = GetUser();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        GetAllConsultations(currentUser.id, currentUser.userRole, "Accepted", null, null, null)
                .then((data) => {
                    let events = data.map((consultation) => {
                        return {
                            title: "Consultation with " + consultation.patientName,
                            allDay: false,
                            start: convertToFullDate(consultation.consultationDate, consultation.startTime),
                            end: convertToFullDate(consultation.consultationDate, consultation.endTime)
                        }
                    });
                    console.log(events);
                    setEvents(events);
                })
                .catch((error) => {
                    console.error(error);
                });
    }, []);
    const convertToFullDate = (date, time) => {
        let dateParts = date.split("-");
        let timeParts = time.split(":");
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
    }
    return(
        <div
            className={cx("work-calendar")}
            style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default WorkCalendar;