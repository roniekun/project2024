import React from 'react'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import Footer from '../../component/footer'
import PageAnimator from '../../assets/anim/PageAnimator'

const Gallery = () => {
    const { user, setTitle } = useContext(DataContext)

      useEffect(() => {
        location.title = 'Gallery'
        setTitle(`${location.title} - ${user.title}`)
      }, [location.pathname])


  return (
    <PageAnimator>
    <main className='min-h-screen'>
        <div className='h-screen'></div>
      <section>
        <Footer />
      </section>
    </main>
    </PageAnimator>
  )
}

export default Gallery