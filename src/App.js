import Home from './screens/Home';
import {Login} from './screens/Login';
import './App.css';
import {
  BrowserRouter as Router,Routes,Route
} from 'react-router-dom'
import { SignUp } from './screens/SignUp';
import {CartProvider} from './components/ContextReducer';
 

function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<SignUp />} />
      </Routes>
    </Router>
    </CartProvider>
    
  );
}

export default App;
