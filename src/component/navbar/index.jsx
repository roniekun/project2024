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
    const clock = useRef(null)  
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
            height: '100vh',
            ease: 'power1.in',
             clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }, 
             tl.fromTo(linkItems.current, {
            ease: 'bounce.out',
            opacity:1,
            x:'-110%'
             },
             {
                x:0
             },'.5',),
             tl.fromTo(socialContainer.current, {
            ease: 'bounce.in',
            opacity:1,
            x:'110%'
             },
             {
                x:0
             },'.5',),

             tl.fromTo(clock.current, {
            ease: 'bounce.in',
            opacity:0
             },
             {
                opacity: 1
             },'-=.1',),
        )
        }
        else {
         document.body.style.overflow = 'scroll'
         tl.fromTo(linkItems.current, {
            ease: 'power.in',
            x: 0
             },
             {
                x:'-110%'
             }),
        tl.fromTo(socialContainer.current, {
            ease: 'bounce',
            x:'0'
             },
             {
                x:'110%'
             },''),

             tl.fromTo(clock.current, {
            ease: 'bounce.in',
            opacity:1
             },
             {
                opacity: 0
             },),

        tl.to(menu.current, {
            ease: 'power.inOut',
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
     className='fixed w-screen flex flex-col bg-opacity-50 bg-gradient-to-b  from-neutral-950 via-neutral-800 to-transparent  h-0 backdrop-blur-md box-border  items-start justify-start  overflow-hidden z-50 gap-2 px-5'>

            <section className='flex justify-between items-center relative z-10  my-3 w-full'>
                 <Clock />
                <Close />
            </section>
        <div className='flex flex-wrap'>
        <section
          ref={linkItems}
          className='flex flex-col justify-center relative items-start gap-y-1 px-[5vw] my-1 py-5 rounded-2xl bg-opacity-75 shadow-sm'>
              <h1 className='uppercase font-extrabold text-blue-500 self-start text-xs mb-2'>Navigations</h1>

        
                {links.map((link, index) => (
                <div className='flex w-fit justify-center relative items-center group h-fit'>
                    <a
                    className={`z-10 relative bg-transparent cursor-pointer text-xl capitalize title-font flex w-fit font-normal  select-none                          ${link.to===location.pathname ? 'text-gray-50' : 'text-gray-400'}
`}
                    key={link.name} 
                    onClick={() => handleClick(link.to)}>
                     {link.name} 
                                    {/* <span className={`absolute bottom-0 h-[3px] w-full  ${link.to===location.pathname ? 'bg-orange-500' : 'bg-gray-100'} rounded-lg scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left`}></span> */}
                    </a>
                 </div>
            ))}

        </section>

    <section 
    ref={socialContainer}
    className='flex flex-col rounded-2xl w-full gap-3 bg-opacity-75 shadow-sm px-[5vw]  py-5'>
    <h1 className='uppercase font-extrabold text-blue-500 self-start text-xs'>Socials</h1>
            <Socials ref={socialsRef} /> 
    </section>

        </div>
    </nav>
  )
}

export default Navbar