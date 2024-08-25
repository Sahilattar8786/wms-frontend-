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

function App() {
  return (
    <div className="App">
       <Navbar/>
       <BrowserRouter>
        <Routes>
          <Route path='/customer' element={<Customer/>}></Route>
          <Route path='/vendor' element={<Vendor/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/vendorInvoice' element={<VendorInvoice/>}></Route>
          <Route path="/CreateInvoice" element={<AddInvoice/>}></Route>
          <Route path='/customerInvoice' element={<CustomerInvoice/>}></Route>
          <Route path='/createcustomerInvoice' element={<CreateCustomerInvoice/>}></Route>
          <Route path="*" element={<h4>NOT FOUND</h4>} />
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
