import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './Layout/Layout'
import CompanyPage from './components/CompanyPage'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './components/ProductsSlider'
import ProductShowcasePage from './components/ProductShowCase'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const OurTeam = lazy(() => import('./pages/OurTeam'))
const MemberPage = lazy(() => import('./pages/MemeberPage'))
const ComingSoon = lazy(() => import('./components/Comminsoon'))
const RegisterCompany = lazy(() => import('./pages/RegisterCompany'))
const Commitees = lazy(() => import('./pages/Committees'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const CommitteeMembers = lazy(() => import('./pages/CommitteeMembers'))
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path='/'
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='/about'
          element={
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path='/services'
          element={
            <Suspense fallback={<Loader />}>
              <ComingSoon />
            </Suspense>
          }
        />
        <Route
          path='/product'
          element={
            <Suspense fallback={<Loader />}>
              <ComingSoon />
            </Suspense>
          }
        />
        <Route
          path='/our-products'
          element={
            <Suspense fallback={<Loader />}>
              <ProductShowcasePage />
            </Suspense>
          }
        />
        <Route
          path='/our-team/:id'
          element={
            <Suspense fallback={<Loader />}>
              <MemberPage />
            </Suspense>
          }
        />

        <Route
          path='/companies/:id'
          element={
            <Suspense fallback={<Loader />}>
              <CompanyPage />
            </Suspense>
          }
        />
        <Route
          path='/Committees'
          element={
            <Suspense fallback={<Loader />}>
              <Commitees />
            </Suspense>
          }
        />
        <Route
          path='/Committees/:committeeSlug'
          element={
            <Suspense fallback={<Loader />}>
              <CommitteeMembers />
            </Suspense>
          }
        />
      </Route>
      <Route
        path='/onboarding'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <RegisterCompany />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        }
      />
    </Routes>
  )
}
