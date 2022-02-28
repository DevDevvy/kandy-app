import React, { useEffect, useState } from "react";
import { getAllProducts } from "../ApiManager";


export const ProductsList = () => {
    // create product state
    const [products, setProducts] = useState([])

// get list of products from state
useEffect(
    () => {
        getAllProducts()
            .then(
                (products) => {
                    setProducts(products)
                }
            )
    },
    []
)


    // save function
    const savePurchase = (event) => {
        // prevents default event after for submit to allow post and render /purchases
        event.preventDefault()
        // create new purchase object
        const newPurchase = {
            // event.target the id of clicked item for productid
            productId: parseInt(event.target.id),
            // get customer id out of local storage
            customerId: parseInt(localStorage.getItem("kandy_customer"))
        }
        
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            // send new purchase into JSON string
            body: JSON.stringify(newPurchase)
        }
        return fetch("http://localhost:8088/purchases", fetchOption)
    }

    
    return (
        <> 
            {
                products.map(product => {
                    return (
                    <h3 key={`product--${product.id}`}>
                        <button key={`item--${product.id}`} id={product.id} onClick={savePurchase}>Purchase</button>
                        {product.name} is a {product.productType.name} that costs ${product.price}
                    </h3>
                    )
                })
            }
        </>
    )
}


