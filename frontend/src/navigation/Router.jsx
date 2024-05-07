import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

/* Pages */
import About from '../pages/About'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Artisan from '../pages/Artisan'
import Auth from '../pages/Auth'
import Dashboard from '../pages/protected/Dashboard'
import PrivateRoute from './PrivateRouteMiddleware'
import Profile from '../components/profile/Profile'
import CreateProduct from '../components/products/CreateProduct'
import UpdateProduct from '../components/products/UpdateProduct'
import Panier from '../components/panier/Panier'
import RegisterForm from '../components/forms/RegisterForm'

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'>
          <Route index element={<Artisans />} />
          <Route path=':artisanSlug' element={<Artisan />} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='services' element={<Services />} />
        <Route path='contact' element={<Contact />} />
        <Route path='profile' element={<Profile />} />
        <Route path='authentication' element={<Auth />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='panier' element={<Panier />} />
        <Route path='dashboard' element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='create-product' element={<PrivateRoute />}>
          <Route index element={<CreateProduct />} />
        </Route>
        <Route path='update-product/:id' element={<PrivateRoute />}>
          <Route index element={<UpdateProduct />} />
        </Route>
        <Route path='panier' element={<PrivateRoute />}>
          <Route index element={<Panier />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
