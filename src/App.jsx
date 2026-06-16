import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './pages/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import ServicePage from './pages/ServicePage/ServicePage'
import DoctorsPage from './pages/DoctorsPage/DoctorsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ServiceAboutPage from './pages/ServiceAboutPage/ServiceAboutPage'
import ReviewsPage from './pages/ReviewsPage/ReviewsPage'

import RecordsPage from './pages/RecordsPage/RecordsPage'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import StaffPage from './pages/StaffPage/StaffPage'
import AdminLayout from './pages/AdminLayout/AdminLayout'
import PrivateRoute from './components/PrivateRoute'
import ReviewsAdmin from './pages/ReviewsAdmin/ReviewsAdmin'

import BarberLoginPage from './pages/BarberLoginPage/BarberLoginPage'
import BarberCabinetPage from './pages/BarberCabinetPage/BarberCabinetPage'
import BarberPrivateRoute from './components/BarberPrivateRoute'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path='/services' element={<ServicePage />} />
                        <Route path='/doctors' element={<DoctorsPage />} />
                        <Route path='/reviews' element={<ReviewsPage />} />
                        <Route path='/services/:id' element={<ServiceAboutPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>

                    <Route path='/barber-login' element={<BarberLoginPage />} />

                    <Route
                        path='/barber'
                        element={
                            <BarberPrivateRoute>
                                <BarberCabinetPage />
                            </BarberPrivateRoute>
                        }
                    />

                    <Route
                        path='/admin'
                        element={
                            <PrivateRoute>
                                <AdminLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index path='records' element={<RecordsPage />} />
                        <Route path='reviews' element={<ReviewsAdmin />} />
                        <Route path='services' element={<ServicesPage />} />
                        <Route path='staff' element={<StaffPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
