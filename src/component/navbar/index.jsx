import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, useRef, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import gsap from 'gsap'
import Socials from './assets/Socials'
import Clock from './assets/Clock'
import Close from './assets/Close'
import { Timeline } from 'gsap/gsap-core'
import { motion } from 'framer-motion'

const Navbar = () => {
    const {setToggleMenu, isToggleMenu} = useContext(DataContext)
    const menu = useRef(null)
    const linkItems= useRef(null)
    const socialContainer = useRef(null)
    const socialsRef = useRef(null) 
    const navigate = useNavigate()

    const links = [
        { name: 'gallery', to: '/gallery' },
        { name: 'pricing', to: '/pricing' },
        { name: 'info', to: '/info' }
    ];

    useEffect(() => {
        gsap.registerPlugin(Timeline)
        const tl = gsap.timeline()
    
        if (isToggleMenu) {
         document.body.style.overflow = 'hidden'
        tl.to(menu.current, {
             duration: .7,
            height: '100vh',
            ease: 'power1.in',
             clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }, 
             tl.fromTo(linkItems.current, {
            ease: 'power2.in',
            opacity:1,
            x:'-100%'
             },
             {
                x:0
             },'.7',),
             tl.fromTo(socialContainer.current, {
            ease: 'power2.in',
            opacity:1,
            x:'100%'
             },
             {
                x:0
             },'.7',),
             
        )
        }
        else {
         document.body.style.overflow = 'scroll'
         tl.fromTo(linkItems.current, {
            ease: 'power2.in',
            x: 0
             },
             {
                x:'-100%'
             }),
        tl.fromTo(socialContainer.current, {
            ease: 'power2.in',
            x:'0'
             },
             {
                x:'100%'
             },''),

        tl.to(menu.current, {
            ease: 'power2.inOut',
            height:'0',
            clipPath:'polygon(0 0, 100% 0, 100% 49%, 0 16%)',
        })
        }

    }, [isToggleMenu]);

    const handleClick = (link) => {
        setToggleMenu(!isToggleMenu)
         navigate(link)
         setTimeout(() => {
                    window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
         });
         }, 500);
    }

  return (
    <nav
     ref={menu}
     className='fixed w-screen flex bg-opacity-50 bg-black h-0 backdrop-blur-md flex-col items-start justify-start  overflow-hidden z-50'>

            <section className='flex justify-between items-center relative z-10  my-3 w-full'>
                 <Clock />
                <Close />
            </section>

        <section
          ref={linkItems}
          className='flex flex-col h-1/2 w-full   justify-center relative items-start text-xl gap-7 p-[10vw] bg-stone-600 rounded-2xl'>
        
                {links.map((link, index) => (
                <div className='flex w-fit justify-center relative items-center gap-5 group'>
                    <a
                    className={`text-gray-50 z-10 relative bg-transparent cursor-pointer text-[7vh] font-md capitalize title-font flex text-balance h-[5vh] w-fit select-none ${link.to===location.pathname ? 'text-orange-500' : 'text-gray-50'} `}
                    key={link.name} 
                    onClick={() => handleClick(link.to)}>
                     {link.name} 
                                    <span className={`absolute -bottom-1 h-[3px] w-full  ${link.to===location.pathname ? 'bg-orange-500' : 'bg-gray-100'} rounded-lg scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left`}></span>
                    </a>
                 </div>
            ))}

        </section>
    <section 
    ref={socialContainer}
    className='bg-indigo-800 rounded-2xl py-5 h-1/4 flex place-items-center'>
            <Socials ref={socialsRef} /> 
    </section>
    </nav>
  )
}

export default Navbar