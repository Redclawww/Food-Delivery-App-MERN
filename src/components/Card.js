import React,{useState,useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatchCart,useCart } from './ContextReducer'

export const Card = (props) => {
    const data = useCart();
    const dispatch = useDispatchCart();
    let options = props.options
    let priceOptions = Object.keys(options || {})
    const priceRef = useRef();
    
    const [qty, setqty] = useState(1);
    const [size, setSize] = useState('');

    const handleAddToCart = async()=>{
    let food = [];
    for(const item of data){
        if(item.id === props.foodItem._id){
            food = item;
            break;
        }
    }
    if(food !== []){
        if(food.size === size){
            await dispatch({type: "UPDATE",id: props.foodItem._id,price: totalPrice, qty: qty})
            return
        }
    
    else if(food.size !== size){
            await dispatch({type: "ADD",id: props.foodItem._id,name: props.foodItem.name,price: totalPrice, qty: qty,size: size,img: props.foodItem.img});
            return
        }
        return
    }
    await dispatch({type: "ADD",id: props.foodItem._id,name: props.foodItem.name,price: totalPrice, qty: qty,size: size,img: props.foodItem.img});
}
    let totalPrice = qty*parseInt(options[size]);
    
    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])

    

    return (
        <div >
            <div>

                <div className="max-w-s border border-[#343434] rounded-3xl z-1 bg-[#222222] mt-6 " >
                    <Link href="/" className="relative min-w-fit">
                        <img className="object-cover h-64 w-80 z-0 rounded-3xl" src={props.foodItem.img} alt="..." />
                    </Link>
                    <div className="p-5">
                        <Link href="/">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.foodItem.name}</h5>
                        </Link>
                        <div>
                            <select className=" w-fit inline-flex mr-5 items-center px-3 py-2 text-sm font-extrabold text-center text-white bg-[#A8DF8E] rounded-3xl"
                             onChange={(e)=>setqty(e.target.value)}
                            >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    )
                                })}
                            </select>
                            <select className="w-fit rounded-3xl inline-flex items-center px-3 py-2 text-sm font-extrabold text-center text-white bg-[#A8DF8E] "
                                onChange={(e)=>setSize(e.target.value)}
                                ref={priceRef}
                                >
                                {
                                    priceOptions.map((data)=>{
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>
                            <div className="w-fit p-2 text-lg font-bold text-white ">
                            ₹ {totalPrice}/- 
                            </div>
                            <button className='bg-white px-3 py-2 rounded-3xl font-bold font-sans text-black' onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

