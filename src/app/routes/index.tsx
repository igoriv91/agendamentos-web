import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/shared/components/layout/ProtectedRoute'

const Login    = lazy(() => import('@/features/auth/Login'))
const Register = lazy(() => import('@/features/auth/Register'))

const SchedulePage  = lazy(() => import('@/features/schedule'))
const BookingPage   = lazy(() => import('@/features/booking'))
const StaffPage    = lazy(() => import('@/features/staff'))
const StaffForm    = lazy(() => import('@/features/staff/StaffForm'))
const ServicesPage = lazy(() => import('@/features/services'))
const ServiceForm  = lazy(() => import('@/features/services/ServiceForm'))
const CompanyPage  = lazy(() => import('@/features/company'))
const AdminPage    = lazy(() => import('@/features/admin'))

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
)

export const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"              element={<Login />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/book/:token"   element={<BookingPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/staff"        element={<StaffPage />} />
          <Route path="/staff/new"    element={<StaffForm />} />
          <Route path="/staff/:id"    element={<StaffForm />} />
          <Route path="/services"     element={<ServicesPage />} />
          <Route path="/services/new" element={<ServiceForm />} />
          <Route path="/services/:id" element={<ServiceForm />} />
          <Route path="/company"      element={<CompanyPage />} />
          <Route path="/schedule"     element={<SchedulePage />} />
          <Route path="/admin"        element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
