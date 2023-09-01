import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import { useCart } from './ContextReducer';
import { Cart } from '../screens/Cart';

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();
  
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  
  return (
    <div>


<nav className=" border-gray-200 bg-black">
  <div className="max-w-full flex flex-wrap items-center justify-between py-4 px-20 ">
  <Link to="/" className="flex items-center">
      <img src='https://storage.googleapis.com/pai-images/02a3a7cb7d2247edb50be7ce7031d699.jpeg' className="h-10 mr-3 " alt="Food Costa Logo" />
      <span className="self-center text-3xl font-semibold whitespace-nowrap italic text-[#A8DF8E]">Food Costa</span>
  </Link>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-5" id="navbar-search">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
        <li>
          <Link to="/" className="block py-2 pl-3 pr-4 md:dark:hover:text-[#A8DF8E] text-white rounded md:bg-transparent md:p-0 " aria-current="page">Home</Link>
        </li>
      {
        (localStorage.getItem("authToken")
        ? (
          <li>
          <Link to="/" className="block py-2 pl-3 pr-4 md:dark:hover:text-[#A8DF8E] text-white rounded md:bg-transparent md:p-0 " aria-current="page"></Link>
        </li>
        ):"")
      }  
      </ul>
      <div className='flex gap-5'>
      {
        (!localStorage.getItem("authToken"))
        ? (<div className='flex gap-5'><button className='bg-[#A8DF8E] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          <Link to="/Login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-[#A8DF8E] md:hover:bg-transparent md:hover:bg-[#A8DF8E] md:p-0 md:dark:hover:text-[#A8DF8E] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
        </button>
        <button className='bg-[#A8DF8E] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          <Link to="/createuser" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-[#A8DF8E] md:hover:bg-transparent md:hover:bg-[#A8DF8E] md:p-0 dark:text-white md:dark:hover:text-[#A8DF8E] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Signup</Link>
        </button>
        </div>):
        <div className='flex gap-5'>
          <button className='bg-[#A8DF8E] text-white font-bold py-2 px-4 rounded-full' >
          <Link 
          onClick={()=>{
            setCartView(true);
          }}> 
          My Cart    
          <span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full ml-2 text-xs font-medium bg-[#DB1B22] text-white">{data.length}</span></Link>
          </button>
          {
            cartView ? <Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null
          }
          <button className="bg-[#DB1B22]  text-white font-bold py-2 px-4 rounded-full" onClick={handleLogout}>Logout</button>
        </div>
      }
       

      </div>
    </div>
  </div>
</nav>
</div>
  )
}
