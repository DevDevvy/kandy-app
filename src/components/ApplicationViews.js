import React from "react"
import { Route } from "react-router"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"
import { EmployeeForm } from "./employees/HireNewEmployee"
import { LocationsList } from "./locations/Locations"
import { ProductsList } from "./products/ProductList"
import { PurchaseList } from "./purchases/purchases"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/locations">
                <LocationsList />
            </Route>
            <Route path="/products">
                <ProductsList />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employee/create">
                <EmployeeForm />
            </Route>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/purchases">
                <PurchaseList />
            </Route>
        </>
    )
}