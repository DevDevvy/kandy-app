import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import { Register } from "./auth/Register"
import { Login } from "./auth/Login"
import { Route, Redirect } from "react-router"

export const KandyKorner = () => {
    return (
        <>
        <Route
        render={() => {
            if (localStorage.getItem("kandy_customer")) {
            return (
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            );
            } else {
            return <Redirect to="/login" />;
            }
        }}
    />
        <Route path="/login">
        <Login />
        </Route>
        <Route path="/register">
        <Register />
        </Route>
        </>
    )
}
