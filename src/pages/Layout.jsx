import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import {useNavigate } from 'react-router-dom'



const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Announcement/>

      <Navbar/>

      <Slider/>
      
    </div>
  )
}

export default Layout