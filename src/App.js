import React from 'react';
import './App.css';
import { BrandPage } from './pages/BrandPage';
import { SupplierPage } from './pages/SupplierPage';
import { SizePage } from './pages/SizePage';
import { GoodReceiptPage } from './pages/GoodReceiptPage';
import { OrderPage } from './pages/OrderPage';
import { ColorPage } from './pages/ColorPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { AccountPage } from './pages/AccountPage';
import { InvoicePage } from './pages/InvoicePage';
import { AuthPage } from './pages/AuthPage';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ProductPage } from './pages/ProductPage';
import { HomePage } from './pages/HomePage';
import { VoucherPage } from './pages/VoucherPage';

function App() {
  const [userToken, setUserToken] = React.useState(() => {
    const initToken = localStorage.getItem('access_token') || null;
    return initToken;
  })
  if(!userToken || !userToken.length ) {
    return <AuthPage setUserToken={setUserToken}/>
  }
  return (
    <div className="App">
        <Switch>
          <Route path="/accounts" component={AccountPage}/>
          <Route path="/invoice" component={InvoicePage} />
          <Route path="/orders" component={OrderPage} />
          <Route path="/brands" component={BrandPage} />
          <Route path="/" component={HomePage} exact/>
          <Route path="/suppliers" component={SupplierPage} />
          <Route path="/sizes" component={SizePage}/>
          <Route path="/colors" component={ColorPage} />
          <Route path="/products" component={ProductPage} />
          <Route path='/supply' component={GoodReceiptPage}/>
          <Route path='/order-status' component={OrderStatusPage}/>
          <Route path='/vouchers' component={VoucherPage}/>
        </Switch>
    </div>
  );
}

export default App;
