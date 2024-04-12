import React from "react";
import {Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export function CreateTask(){
    const navigate = useNavigate()
    return(
        <>
            <div className="page-background"></div>
            <Button className="im-in-button" onClick={() => navigate('/save-task')}>I'm in!</Button>
        </>
    )
}