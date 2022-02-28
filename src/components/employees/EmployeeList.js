import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAllEmployees } from "../ApiManager";

export const EmployeeList = () => {
    // set up state for employee list
    const [employee, setEmployee] = useState([])
    const history = useHistory()

    // initial API call for employee list
    useEffect(
        () => {
            getAllEmployees()
                .then(
                    (employees) => {
                        setEmployee(employees)
                    }
                )
        },
        [])
    // DELETE from API function passing in id of object
    const fireEmployee = (id) => {
        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
        // then updating employees state with function definition from update
        .then(update)
    }
    // function to update state after delete function API request
    const update = () => {
        return fetch("http://localhost:8088/employees?_expand=location")
                    .then(res => res.json())
                    .then((data) => {
                        setEmployee(data)
                    })
    }
    return (
        <> 
        {/* new hire button */}
        <button onClick={() => history.push("/employee/create")}>New Hire</button>
            {
                // map of employees
                employee.map(employee => {
                    return <div key={`employee--${employee.id}`}><h3>{employee.first_name}</h3> 
                    works at {employee.location.name}
                    {/* fire employee button */}
                    <button onClick={()=> {
                            fireEmployee(employee.id)
                    }}>Fire Employee</button></div>
                })
            }
        </>
    )
}