import React, {useState} from "react";
import { filterTasks, updateOptions } from "../redux/TaskTrackerSlice";
import { useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";

export function FilterTasks(props){
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch()

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    function handleOptionChange(option){
        const updatedOptions = [...props.selectedOptions];
        const index = updatedOptions.indexOf(option);

        if (index === -1) {
        updatedOptions.push(option)
        } else {
        updatedOptions.splice(index, 1)
        }
        dispatch(updateOptions(updatedOptions))
        dispatch(filterTasks({options: updatedOptions}))
    }

    return (
        <>
            <div className="filter-btn">
                <a>
                    <i className="bi bi-filter fs-2" onClick={toggleDropdown}></i>
                </a>

                {showDropdown && <ul>
                    <li>
                        <input
                            type="checkbox"
                            id="incomplete"
                            checked={props.selectedOptions.includes("Incomplete")}
                            onChange={() => handleOptionChange("Incomplete")}
                        />
                        <label htmlFor="incomplete">Incomplete</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="inprogress"
                            checked={props.selectedOptions.includes("Inprogress")}
                            onChange={() => handleOptionChange("Inprogress")}
                        />
                        <label htmlFor="inprogress">In Progress</label>                    
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="completed"
                            checked={props.selectedOptions.includes("Completed")}
                            onChange={() => handleOptionChange("Completed")}
                        />
                        <label htmlFor="completed">Completed</label>
                    </li>
                </ul>}
            </div>
        </>
    )
}