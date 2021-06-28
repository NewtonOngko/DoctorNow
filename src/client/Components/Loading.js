import React from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loading() {
    return (
        <div style={{position:'absolute',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width: '100%',backgroundColor : "rgba(0,0,0,0.4)"}}>
            <Loader type="MutatingDots" color="#00BFFF" height={100} width={100} />
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15,color:'white'}} >Loading...</p>
        </div>
    )
}
