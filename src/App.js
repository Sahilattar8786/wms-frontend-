import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Common/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Customer from './Component/Customer/Customer';

function App() {
  return (
    <div className="App">
       <Navbar/>
       <BrowserRouter>
        <Routes>
          <Route path='/customer' element={<Customer/>}></Route>
          <Route path="*" element={<h4>NOT FOUND</h4>} />
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
