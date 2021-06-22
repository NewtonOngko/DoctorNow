import React from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loading() {
    return (
        <div style={{position:'absolute'}}>
            <Loader type="MutatingDots" color="#00BFFF" height={100} width={100} />
        </div>
    )
}
