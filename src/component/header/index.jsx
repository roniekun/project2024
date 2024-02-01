import React from 'react'
import Menu from './assets/Menu'
import Home from './assets/Home'
import { useLocation } from 'react-router-dom'
import { useState, useEffect,useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import Logo from './assets/Logo'
import Nav from './assets/Nav'
import Socials from './assets/Socials'
import { motion } from 'framer-motion'

const Header = () => {
  const [homeButton, setHomeButton] = useState(false)
  const { isMobile, isScrolled } = useContext(DataContext)
  const location = useLocation()

  useEffect(() => {
    setHomeButton(location.pathname !== '/' ? true : false)
  }, [location])

  return (
    <motion.main 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: .3}}
    className={`w-screen opacity-0 fixed z-30 top-0 ${isScrolled ? 'transform -translate-y-full' : ''}  transition  justify-center items-center flex bg-transparent backdrop-blur-md h-14 md:h-16 shadow-md`}>
      {homeButton ? <Home /> : <Logo/>}
      {isMobile ? <Menu /> : <Nav/>}
      {!isMobile && <Socials />}
    </motion.main>
  )
}

export default Header