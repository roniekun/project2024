import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, useRef, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import gsap from 'gsap'
import Socials from './assets/Socials'
import { IoCloseSharp } from "react-icons/io5";
import { Timeline } from 'gsap/gsap-core'

const Navbar = () => {
    const {setToggleMenu, isToggleMenu} = useContext(DataContext)
    const menu = useRef(null)
    const linkItems= useRef(null)
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

        tl.to(menu.current, {
             duration: .7,
            height: '100vh',
            ease: 'power1.in',
             clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }, 
             tl.to(linkItems.current, {
            opacity:1,
            ease: 'power2.in',
            scale: 1
             },'+=.4',),
        )
        }
        else {
        tl.to(linkItems.current, {
                        scale: 1.1,
                        duration: 1,
                        rotate: -5,
                         ease: 'power2.in',
                         transformOrigin: '-5% -5%',
        },'-=.3')

        tl.to(menu.current, {
            ease: 'power2.inOut',
            height:'0',
            clipPath:'polygon(0 0, 100% 0, 100% 49%, 0 16%)',
           onComplete: () =>{
                linkItems.current.style.opacity = 0;
                linkItems.current.style.transform = 'rotate(0deg) translateY(-50%)';
            }
        },'-=.5')
             tl.to(linkItems.current, {
            scale: 1,
            rotate: 0
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
     className='fixed w-screen flex bg-[#0a0a0a] h-0 flex-col items-start justify-evenly overflow-hidden z-10'>
        <button
            onClick={()=>setToggleMenu(false)}
            className='group absolute z-10 top-5 right-[5vw] cursor-pointer text-gray-300 flex w-fit '>
            <span className='text-lg group-hover:opacity-90'>Close</span> 
            <IoCloseSharp className='fill-gray-300 w-7 h-7 relative group-hover:opacity-90'/>
            </button> 

        <section
        ref={linkItems}
          className='flex flex-col w-fit justify-center relative items-start text-xl h-auto gap-7 mx-[10vw] opacity-0'>
        
                {links.map((link, index) => (
                <div className='flex w-fit justify-center relative items-center gap-5 group'>
                    <a
                    className='text-gray-300 z-10 relative bg-transparent cursor-pointer text-[7vh] font-md capitalize title-font flex text-balance h-[5vh] w-fit select-none'
                    key={link.name} 
                    onClick={() => handleClick(link.to)}>
                     {link.name} 
                                    <span className="absolute -bottom-1 h-[3px] w-full  bg-gray-300 rounded-lg scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left"></span>
                    </a>
                 </div>
            ))}

        </section>
    <section>
            <Socials  />
    </section>

    </nav>
  )
}

export default Navbar