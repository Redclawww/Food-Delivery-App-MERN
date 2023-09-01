import React, { useState,useEffect }  from 'react'
import Navbar from "../components/Navbar"
import { Card } from '../components/Card'
import Footer from '../components/Footer'
import { Carousal } from '../components/Carousal'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodItem, setfoodItem] = useState([]);
    const [foodCat, setfoodCat] = useState([]);

    const loadData = async () => {
        const response = await fetch("http://localhost:5000/api/FoodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        setfoodItem(data[0]);
        setfoodCat(data[1]);
    }
    useEffect(() => {
        loadData();
    }, []);


    return (
        <div className='bg-[#222222]'>
            <div><Navbar /></div>
            <div className='relative' id='SearchBar'>
            <div>
                <div className='z-10 absolute w-full p-5 bottom-0 m-auto'>
                    <div class="relative flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 "
                            type="search"
                            id="search"
                            value={search}
                            placeholder="Find your Craving"
                            onChange={(e)=>setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <Carousal /></div>
            {
                foodCat !== [] ?
                    foodCat.map((data) => {
                        return (<div className='flex flex-col text-white'>
                            <div key={data._id} className='my-5 mx-16 text-3xl font-bold font-sans'>
                            {data.CategoryName}
                        </div>
                        <hr className='mx-5 bg-gray-700 border-[#343434]'/>
                        <div className='flex flex-wrap gap-10 mx-10'>
                        {foodItem !==[]
                        ? foodItem.filter((item)=>
                        ((item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))).map((filteredItems)=>{
                                return (
                                    <div key={filteredItems._id} className=''>
                                        <Card 
                                        foodItem = {filteredItems}
                                        options={filteredItems.options[0]}
                                        />
                                    </div>
                                )
                            })                                                  
                        :<div>No food items found</div>}
                        </div>
                        </div> )
                    }) :
                    (<div>NO Food Category Found</div>)
            }
            <div className='h-5'><Footer /></div>
        </div>
    )
}
