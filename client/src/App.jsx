import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
// import { persistor } from "./app/store";
import { Header, Footer, Profile, Order, Products, Categories, ProfileTags } from "./components";
import { Register, Login, Home, Account, Cart, Checkout, Invoice } from "./pages";

const Layout = ({ element }) => {
  return (
    <>
      <Header />
      {element}
      {/* <Footer /> */}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout element={<Home />} />} />
            <Route path="/me" element={<Layout element={<Account />} />}>
              <Route path="profile" element={<Profile />} />
              <Route path="order" element={<Order />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="tags" element={<ProfileTags />} />
            </Route>
            <Route path="cart" element={<Layout element={<Cart />} />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="invoice" element={<Invoice />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
