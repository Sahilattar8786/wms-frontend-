import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Common/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Customer from './Component/Customer/Customer';
import Vendor from './Component/Vendor/Vendor';
import Product from './Component/Product/Product';
import VendorInvoice from './Component/VendorInvoice/VendorInvoice';
import AddInvoice from './Component/VendorInvoice/AddInvoice';
import CustomerInvoice from './Component/CustomerInvoice/CustomerInvoice';
import CreateCustomerInvoice from './Component/CustomerInvoice/CreateCustomerInvoice';
import Payment from './Component/Payment/Payment';
import Protect from './Protect';
import Login from './Login';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/customer' element={<Protect><Navbar/><Customer/></Protect>}></Route>
          <Route path='/vendor' element={<Protect><Navbar/><Vendor/></Protect>}></Route>
          <Route path='/product' element={<Protect><Navbar/><Product/></Protect>}></Route>
          <Route path='/vendorInvoice' element={<Protect><Navbar/><VendorInvoice/></Protect>}></Route>
          <Route path="/CreateInvoice" element={<Protect><Navbar/><AddInvoice/></Protect>}></Route>
          <Route path='/customerInvoice' element={<Protect><Navbar/><CustomerInvoice/></Protect>}></Route>
          <Route path='/createcustomerInvoice' element={<Protect><Navbar/><CreateCustomerInvoice/></Protect>}></Route>
          <Route path='/payment' element={<Protect><Navbar/><Payment/></Protect>} ></Route>
          <Route path="*" element={<h4>NOT FOUND</h4>} />
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
