
// get customers
export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
}
// get employees
export const getAllEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=location")
                .then(res => res.json())
}
// get locations
export const getAllLocations = () => {
    return fetch("http://localhost:8088/locations")
    .then(res => res.json())
}
// get products with expanded product type
export const getAllProducts = () => {
    return fetch("http://localhost:8088/products?_expand=productType")
                .then(res => res.json())
}
// get customer purchases with custom ID
export const getCustomerPurchases =  (customerId) => {
    return fetch(`http://localhost:8088/purchases?customerId=${customerId}`)
    .then(res => res.json())
}
// get all pruchases with expanded customer and product
export const getAllPurchases =  () => {
    return fetch(`http://localhost:8088/purchases?_expand=customer&_expand=product`)
    .then(res => res.json())
}