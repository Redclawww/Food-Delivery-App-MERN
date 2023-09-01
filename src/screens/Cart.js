import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'

export const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart()
    if (data.length === 0) {
        return (
            <div className='m-5 text-center text-3xl text-yellow-400 font-bold'>
                The Cart is Empty!
            </div>
        )

    } else {
        let totalPrice = data.reduce((total, food) => total + food.price, 0)

        const handleCheckOut = async () => {
            let userEmail = localStorage.getItem("userEmail");
            let response = await fetch("http://localhost:5000/api/orderData", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });
            console.log('JSON Response',response.status);
            if (response.status === 200) {
                dispatch({ type: "DROP" })
            }
        }

        return (
            <div>
                <div class="bg-gray-100 h-screen py-8">
                    <div class="container mx-auto px-4">
                        <h1 class="text-2xl font-semibold mb-4">Your Cart</h1>
                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="md:w-3/4">
                                <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                                    <table class="w-full">
                                        <thead>
                                            <tr>
                                                <th class="text-left font-semibold">Product</th>
                                                <th class="text-left font-semibold">Size</th>
                                                <th class="text-left font-semibold">Quantity</th>
                                                <th class="text-left font-semibold">Price</th>
                                                <th class="text-left font-semibold"></th>
                                            </tr>
                                        </thead>
                                        {
                                            data.map((food, index) => (
                                                <tbody>
                                                    <tr>
                                                        <td class="py-4">
                                                            <div class="flex items-center">
                                                                <img class="h-16 w-16 mr-4 rounded-full" src={food.img} alt="Product" />
                                                                <span class="font-semibold">{food.name}</span>
                                                            </div>
                                                        </td>
                                                        <td class="py-4">{food.size}</td>
                                                        <td class="py-4">
                                                            <div class="flex items-center">
                                                                <span class="text-center w-8">{food.qty}</span>
                                                            </div>
                                                        </td>
                                                        <td class="py-4">{food.price}</td>
                                                        <td ><button type="button" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} className="btn p-0">X</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                            </div>
                            <div class="md:w-1/4">
                                <div class="bg-white rounded-lg shadow-md p-6">
                                    <h2 class="text-lg font-semibold mb-4">Summary</h2>
                                    <div class="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span>{totalPrice}</span>
                                    </div>
                                    <div class="flex justify-between mb-2">
                                        <span>Taxes</span>
                                        <span>60.00</span>
                                    </div>
                                    <div class="flex justify-between mb-2">
                                        <span>Delivery</span>
                                        <span>0.00</span>
                                    </div>
                                    <hr class="my-2" />
                                    <div class="flex justify-between mb-2">
                                        <span class="font-semibold">Total</span>
                                        <span class="font-semibold">{totalPrice + 60}</span>
                                    </div>
                                    <button class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={handleCheckOut}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
