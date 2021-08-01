import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../Components/Header'
import { DataGrid } from '@material-ui/data-grid'
import { FormControlLabel, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { blue, red } from '@material-ui/core/colors'
import { GetWithdrawAll } from '../../Request/service/withdraw'
import { transaction, withdraw } from '../../Features/viewSlice'
import { useDispatch } from 'react-redux'
import history from '../../Route/history'

const useStyles = makeStyles({
  container: {
    width: 'auto',
    height: '1000px',
    backgroundColor: '#E5E5E5',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  },
  listitem: {
    backgroundColor: 'white',
    width: '300px',
    height: '100px',
    margin: '20px',
    borderRadius: '20px',
  },
  tablestyle: {
    backgroundColor: 'white',
    height: '750px',
    width: 'auto',
    margin: '20px',
    borderRadius: '20px',
  },
  data: {
    border: 0,
    padding: 15,
    height: '720px',
  },
})
const RowEdit = ({ index }) => {
  const dispatch = useDispatch()
  const handleEditClick = () => {
    console.log(index.withdraw_id)
    history.push('/withdraw/edit')
    dispatch(
      withdraw({
        id: index.withdraw_id,
      }),
    )
  }
  const handleDeleteClick = () => {
    // some action
  }
  return (
    <FormControlLabel
      control={
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleEditClick}
          >
            <EditIcon style={{ color: blue[500] }} />
          </IconButton>
        </>
      }
    />
  )
}

const columns = [
  // { field: 'withdraw_id', headerName: 'ID', width: 100 },
  { field: 'doctor_id', headerName: 'Doctor', width: 350 },
  { field: 'withdraw Status', headerName: 'Status', width: 350 },
  {
    field: 'amount',
    headerName: 'Price',
    width: 150,
  },
  {
    field: 'account_receiver',
    headerName: 'Account',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: 'pointer' }}
        >
          <RowEdit index={params.row} />
        </div>
      )
    },
  },
]

export default function Main() {
  const style = useStyles()
  const [data, setdata] = useState([])
  useEffect(() => {
    GetWithdrawAll()
      .then((res) => setdata(res))
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <div className={style.container}>
        <Header />
        <p
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            fontFamily: 'Noto Sans JP',
            margin: 15,
          }}
        >
          Withdraw
        </p>
        {/* <div style={{display:'flex',flexDirection:'row'}}>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >Total Users</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >12</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Consultations</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >12</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Doctors</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >12</p>
         </div>
         </div> */}
        <div>
          <div className={style.tablestyle}>
            <div
              style={{
                padding: 15,
                justifyContent: 'flex-end',
                display: 'flex',
              }}
            >
              {/* <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}>
              Add Data
              </Button> */}
            </div>
            <DataGrid
              getRowId={(r) => r.withdraw_id}
              className={style.data}
              rows={data}
              columns={columns}
              pageSize={10}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </>
  )
}
