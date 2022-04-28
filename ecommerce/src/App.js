import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from './screens/ProductScreen'
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"

const App = () => {
  return (
    <Router>
    <Header />
    <main>
      <Container>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen}/>
        <Route path ='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/shipping' component={ShippingScreen}/>
        <Route path='/payment' component={PaymentScreen}/>
        <Route path='/order/:id' component={OrderScreen}/>
        <Route path ='/admin/userList' component={UserListScreen} />
        {/* <Route path ='/admin/orderList' component={OrderListScreen} /> */}

        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />



      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;