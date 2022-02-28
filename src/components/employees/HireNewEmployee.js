import React, { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { getAllLocations } from "../ApiManager";

export const EmployeeForm = () => {
    // create initial state with useState
    const [employee, update] = useState({
        first_name: "",
        locationId: null,
        manager: false,
        fullTime: false,
        hourlyRate: 5
    });
    const [locations, setLocations] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllLocations()
                .then(
                    (location) => {
                        setLocations(location)
                    }
                )
        },
        []
    )


    const saveEmployee = (event) => {
        // prevents default event after for submit to allow post and render /employees
        event.preventDefault()
        
        // create new employee object
        const newEmployee = {
            first_name: employee.first_name,
            locationId: parseInt(employee.locationId),
            manager: employee.manager,
            fullTime: employee.fullTime,
            hourlyRate: parseFloat(employee.hourlyRate)
        }
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newEmployee)
        }
        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => {
                // changes browser url to /tickets
                history.push("/employees")
            })
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee Name"
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.first_name = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select 
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.locationId = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } >
                        {
                            locations.map(location => {
                                return <option key={location.id} value={location.id}>{location.name}</option>
                            })
                        }
                        </select>
                        
                        
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager:</label>
                    <input
                        
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.manager = evt.target.checked
                                // update state with new state
                                update(copy)
                            }
                        } type="checkbox" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full Time:</label>
                    <input
                        
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.fullTime = evt.target.checked
                                // update state with new state
                                update(copy)
                            }
                        } type="checkbox" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form">
                    <label htmlFor="rate">Rate:</label>
                    <input
                        required
                        type="number"
                        className="form"
                        step=".25"
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.hourlyRate = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            {/* button for submit with onClick event listener that calls saveTicket (POST to API) */}
            <button className="btn btn-primary" onClick={saveEmployee}>
                HIRE
            </button>
        </form>
    )
}

