import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import TestPageComponent from '@/app/pages/test-page/TestPageComponent';
import HomePageComponent from '@/app/pages/home-page/HomePageComponent';
import UnknownPageComponent from '@/app/pages/404-page/UnknownPageComponent';



import Layout from '@/app/Layout';




function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Layout Route wraps pages that should include Header */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePageComponent />} />
            <Route path="home" element={<HomePageComponent />} />
            <Route path="test" element={<TestPageComponent />} />
            <Route path="*" element={<UnknownPageComponent />} /> {/* catch-all */}
          </Route>

          {/* Standalone routes without the layout/header */}
         
        </Routes>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
