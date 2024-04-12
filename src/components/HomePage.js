import React from "react";
import image from '../utils/assets/images/image2.png'

export function HomePage(){
    return (
        <div>
            <img src={image} alt="clock-image" className="main-page-image"></img>
            <h1 className="title-text">Task Tracker</h1>
        </div>
    )
}