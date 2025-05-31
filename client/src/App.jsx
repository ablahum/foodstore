import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './app/store'
import { Header, Footer, Profile, OrderList, ProductList, CategoryList, TagList } from './components'
import { Register, Login, Home, Account, Checkout, Invoice } from './pages'

const Layout = ({ items }) => (
  <>
    <Header />
    {items}
    <Footer />
  </>
)

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes>
            <Route
              path='register'
              element={<Register />}
            />

            <Route
              path='login'
              element={<Login />}
            />

            <Route
              path='/'
              element={<Layout items={<Home />} />}
            />

            <Route
              path='/me'
              element={<Layout items={<Account />} />}
            >
              <Route
                path='profile'
                element={<Profile />}
              />

              <Route
                path='order'
                element={<OrderList />}
              />

              <Route
                path='products'
                element={<ProductList />}
              />

              <Route
                path='categories'
                element={<CategoryList />}
              />

              <Route
                path='tags'
                element={<TagList />}
              />
            </Route>

            <Route
              path='checkout'
              element={<Checkout />}
            />

            <Route
              path='invoice'
              element={<Invoice />}
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
