import React from 'react'
//import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardIcon from '../../client/Assets/Dashboard.png';
import AppointmentIcon from '../../client/Assets/Appointment.png';
import ConsultationIcon from '../../client/Assets/Consultation.png';
import DoctorIcon from '../../client/Assets/Doctor.png';
import HealthIcon from '../../client/Assets/Health.png';
import ReportsIcon from '../../client/Assets/Reports.png';
import UsersIcon from '../../client/Assets/Users.png';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

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
        title:"Transactions",
        icon: <ReceiptIcon/>,
        link:"/transactions"
    },
    {
        title:"Withdraw",
        icon: <AccountBalanceWalletIcon/>,
        link:"/withdraw"
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
    {
        title:"News",
        icon:<AnnouncementIcon/>,
        link:"/news"
    },
]

