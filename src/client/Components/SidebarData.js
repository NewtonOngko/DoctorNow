import React from 'react'
//import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardIcon from '../Assets/Dashboard.png';
import AppointmentIcon from '../Assets/Appointment.png';
import ConsultationIcon from '../Assets/Consultation.png';
import DoctorIcon from '../Assets/Doctor.png';
import HealthIcon from '../Assets/Health.png';
import ReportsIcon from '../Assets/Reports.png';
import UsersIcon from '../Assets/Users.png';

export const SidebarData = [
    {
        title:"DashBoard",
        icon: <img src={DashboardIcon}/>,
        link:"/dashboard"
    },
    {
        title:"Appointment",
        icon: <img src={AppointmentIcon}/>,
        link:"/appointment"
    },
    {
        title:"Doctors",
        icon: <img src={DoctorIcon}/>,
        link:"/doctors"
    },
    {
        title:"Users",
        icon: <img src={UsersIcon}/>,
        link:"/users"
    },
    {
        title:"Hospital",
        icon:<img src={HealthIcon}/>,
        link:"/hospital"
    },{
        title:"Consultation",
        icon:<img src={ConsultationIcon}/>,
        link:"/consultation"
    },{
        title:"Reports",
        icon:<img src={ReportsIcon}/>,
        link:"/report"
    },
]

