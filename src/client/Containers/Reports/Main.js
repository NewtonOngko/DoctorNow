import React, { useRef, useState,useEffect } from 'react';
//import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { blue, red } from '@material-ui/core/colors';
import UserReport from './userReport'
import DoctorReport from './doctorReport'
import AppointmentReport from './appointmentReport'
import ConsultationReport from './ConsultationReport'
import HospitalReport from './HospitalReport'
import TransReport from './transReport'
import Loading from '../../Components/Loading'


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1000px',
      backgroundColor: '#E5E5E5',
      display:'flex',
      flex:'1',
      flexDirection:'column'
    },
    listitem:{
      backgroundColor:'white',
      width:'300px',
      height:'100px',
      margin:'20px',
      borderRadius:'20px',
    },
    tablestyle:{
      backgroundColor:'white',
      height: '450px',
      width: 'auto',
      margin:'20px',
      borderRadius:'20px',
      padding:'15px',
    },
    data:{
      border:0,
      padding:15,
      height:'400px'
    },
    printbtn:{
      borderRadius:'20px',justifyContent:'flex-end',display:'flex',height:'30px',flex:1,alignItems:'center',padding:'20px'
    }
  });

  // const dataprint = (name,onclick) =>{
  //   const style = useStyles()
  //   return <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
  //   <div>
  //     <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>{name}</p>
  //   </div>
  //   <div className={style.printbtn}>
  //   <Button
  //     style={{backgroundColor:'#0081F8',color:'white'}}
  //   variant="contained"
  //     onClick={onclick}
  //    >
  //     Print
  //   </Button>
  //   </div>
  // </div>
  // }
  const printdata=(view)=>{
   if(view==='user'){
     return <UserReport/>
   }
   if (view==='doctor'){
     return <DoctorReport/>
   }
  }
//   const getdata=()=>{
//     return (<>
//       <DoctorReport/>
//        <UserReport/>
//        </>
//      )
     
//  }

export default function Main() {
    const style = useStyles()
    const componentRef = useRef('user');
    const componentRefdoc = useRef('doctor');
    const componentRefapp = useRef('appointment');
    const componentRefconst = useRef('consultation');
    const componentRefhospit = useRef('hospital');
    const componentReftrans = useRef('transaction');
    const[value,setValue]=useState('')
    const [loading,setloading]= useState(true)
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const handlePrintdoc = useReactToPrint({
      content: () => componentRefdoc.current,
    });
    const handlePrintapp = useReactToPrint({
      content: () => componentRefapp.current,
    });
    const handlePrintconst = useReactToPrint({
      content: () => componentRefconst.current,
    });
    const handlePrinthospit = useReactToPrint({
      content: () => componentRefhospit.current,
    });
    const handlePrinttrans = useReactToPrint({
      content: () => componentReftrans.current,
    });
    useEffect(
      () => {
        let timer1 = setTimeout(() => setloading(false),  10000);
        return () => {
          clearTimeout(timer1);
        };
      },
      []
    );
    return (
      <>
      <div className={style.container} >
        {/* <div style={{display:'none'}}>
          {getdata()}
        </div> */}
        <Header/>
          <div>
            <div className={style.tablestyle}>
            <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Reports</p>
              <div style={{display:'flex',flexDirection:'row'}}>
                  {/* button user */}
                <div>
                  <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
                    <div>
                      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>Report User</p>
                    </div>
                    <div className={style.printbtn}>
                    <div style={{display:'none'}}>
                      <div ref={componentRef}>
                        <UserReport/>
                      </div>
                    </div>
                    <Button
                      style={{backgroundColor:'#0081F8',color:'white'}}
                      variant="contained"
                      onClick={handlePrint}
                      >
                      Print
                    </Button>
                    </div>
                  </div>
                </div>
               {/* button doctor */}
               <div>
                  <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
                    <div>
                      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>Report Doctors</p>
                    </div>
                    <div className={style.printbtn}>
                    <div style={{display:'none'}}>
                      <div ref={componentRefdoc}>
                        <DoctorReport/>
                      </div>
                    </div>
                    <Button
                      style={{backgroundColor:'#0081F8',color:'white'}}
                      variant="contained"
                      onClick={handlePrintdoc}
                      >
                      Print
                    </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                  {/* button Appointment */}
                <div>
                  <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
                    <div>
                      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>Report Appointment</p>
                    </div>
                    <div className={style.printbtn}>
                    <div style={{display:'none'}}>
                      <div ref={componentRefapp}>
                        <AppointmentReport/>
                      </div>
                    </div>
                    <Button
                      style={{backgroundColor:'#0081F8',color:'white'}}
                      variant="contained"
                      onClick={handlePrintapp}
                      >
                      Print
                    </Button>
                    </div>
                  </div>
                </div>
               {/* button Consultation */}
               <div>
                  <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
                    <div>
                      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>Report Consultation</p>
                    </div>
                    <div className={style.printbtn}>
                    <div style={{display:'none'}}>
                      <div ref={componentRefconst}>
                        <ConsultationReport/>
                      </div>
                    </div>
                    <Button
                      style={{backgroundColor:'#0081F8',color:'white'}}
                      variant="contained"
                      onClick={handlePrintconst}
                      >
                      Print
                    </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                  {/* button Transactions */}
                <div>
                  <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
                    <div>
                      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>Report Transactions</p>
                    </div>
                    <div className={style.printbtn}>
                    <div style={{display:'none'}}>
                      <div ref={componentReftrans}>
                        <TransReport/>
                      </div>
                    </div>
                    <Button
                      style={{backgroundColor:'#0081F8',color:'white'}}
                      variant="contained"
                      onClick={handlePrinttrans}
                      >
                      Print
                    </Button>
                    </div>
                  </div>
                </div>
               {/* button Hospital */}
               <div>
                  <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
                    <div>
                      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>Report Hospital</p>
                    </div>
                    <div className={style.printbtn}>
                    <div style={{display:'none'}}>
                      <div ref={componentRefhospit}>
                        <HospitalReport/>
                      </div>
                    </div>
                    <Button
                      style={{backgroundColor:'#0081F8',color:'white'}}
                      variant="contained"
                      onClick={handlePrinthospit}
                      >
                      Print
                    </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <Loading/>}
        </div>
      </>
    )
}
