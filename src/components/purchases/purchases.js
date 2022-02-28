import React, { useState, useEffect } from "react"
import { useParams } from "react-router";
import { getAllProducts, getCustomerPurchases } from "../ApiManager";

export const PurchaseList = () => {
    // create initial state with useState
    const [purchased, setPurchased] = useState([])
    const [products, update] = useState([]);
    // allows parameters to be used to interpolate in useEffect API url
    let { customerId } = useParams()
    // get customer id from local memory
    customerId = parseInt(localStorage.getItem("kandy_customer"))
// fetch all products
    useEffect(
        () => {
            getAllProducts()
                .then(
                    (products) => {
                        update(products)
                    }
                )
        },
        []
    )
// filter all customer purchases from API fetch
    useEffect(
        () => {
            getCustomerPurchases(customerId)
                .then(
                    (products) => {
                        setPurchased(products)
                    }
                )
        },
        // listens for customerId to change to trigger useEffect
        [customerId]
    )
    
    
    
    return (
        <> 
            {
                // iterate through purchases
                purchased.map(purchased => {
                    // find product that matches purchased object productId
                    const product = products.find(product => purchased.productId === product.id)
                    return (
                    <div key={`product--${purchased.id}`}>
                        {product?.name} costs ${product?.price}
                    </div>
                    )
                })
            }
        </>
    )
}

{/* <table>
    <tbody>
        <tr>
            <th>Candy</th>
            <th>Quantity</th>
            <th>Price/unit</th>
        </tr>
            {
            purchased.map(purchase => {
                const foundItem = products.find(item => item.id === purchase.productId)
                const itemCount
                return <tr key={`purchases--${purchase.id}`} className="purchases">
                        <td>{foundItem.name}</td>
                        <td>{foundPurchases.length}</td>
                        <td>{foundPurchases.length}</td>
                    </tr>
            })
        }
    </tbody>
</table> */}