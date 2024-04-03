import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'

export default function AdminRouter() {
  return (
    <Routes>
        <Route path='/admin' element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
        </Route>
    </Routes>
  )
}
