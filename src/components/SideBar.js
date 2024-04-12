import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from "react-router-dom";

export function SideBar(props){
    
    return (
        <>
        <div className={`sidebar ${props.isSidebarShrunk ? 'shrink' : ''}`}>
            <div className="toggle-sidebar" onClick={props.toggleSidebar}>
                <i className={`shrink-icon bi bi-arrow-${props.isSidebarShrunk ? 'right' : 'left'}-circle`}></i>
            </div>
            <div className="sidebar-items">
                <ul className="nav nav-pills flex-column">
                    <li className={`mb-3 fs-4 ${props.isSidebarShrunk ? 'shrink-li' : 'expand-li'}`}>
                        <Link to='/create-task' className="nav-link text-decoration-none">
                            <i className="bi bi-card-list"></i>
                            <span className={`ms-2 ${props.isSidebarShrunk ? 'hide' : ''} `}>Create Task</span>
                        </Link>
                    </li>
                    <li className={`mb-3 fs-4 ${props.isSidebarShrunk ? 'shrink-li' : 'expand-li'}`}>
                        <Link to='/reports' className="nav-link text-decoration-none">
                            <i className="bi bi-file-bar-graph"></i>
                            <span className={`ms-2 ${props.isSidebarShrunk ? 'hide' : ''} `}>Reports</span>
                       </Link> 
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}