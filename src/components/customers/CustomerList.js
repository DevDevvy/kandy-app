import React, { useEffect, useState } from "react";
import { getAllPurchases } from "../ApiManager";
import "./CustomerList.css"
// import { useHistory } from "react-router";

export const CustomerList = () => {
    const [customer, assignCustomers] = useState([])
    const [purchasesArray, setPurchases] = useState([])
    // const history = useHistory()

    useEffect(
        () => {
            getAllPurchases()
                .then(
                    (purchases) => {
                        setPurchases(purchases)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            const customerArray = []
            const organizedList = findPurchases()
            const sortedList = organizedList.sort((a,b) => {return b.purchases - a.purchases})
            for (const id in sortedList) {
                customerArray.push(organizedList[id])
            }
            
                assignCustomers(customerArray)
            },
        [purchasesArray]
    )


    const findPurchases = () => {
        let purchaseList = []
        for (const purchase of purchasesArray) {
            if (!(purchase.customer.id in purchaseList)) {
                const customer = JSON.parse(JSON.stringify(purchase.customer))
                purchaseList[purchase.customer.id] = customer
                purchaseList[purchase.customer.id]["purchases"] = 1
            } else {
                purchaseList[purchase.customer.id]["purchases"]++
            }
        }
        return purchaseList
    }

    // function that maps out customers and purchases in a table
    const CustomerPurchases = () => {
        return customer.map((customer) => {
            return (
                <tr key={`customer--${customer.id}`} className="list">
                        <td>{customer.name}</td>
                        <td>{customer.purchases}</td>
                    </tr>
            )
        })
    }
    const FinalList = CustomerPurchases()
    
    return (
        <> 
            <table>
            <thead>
            <tr>
                <th>Customer</th>
                <th>Candies Bought</th>
            </tr>
            </thead>
            <tbody>
            {FinalList}
            </tbody>
            </table>
        </>
    )
}