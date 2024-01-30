import React from 'react'
import styles from './index.module.css'
import { useEffect, useContext } from 'react'
import { DataContext } from '../../context/DataContext'

const Contact = () => {
    const { pageTitle, setTitle } = useContext(DataContext)

      useEffect(() => {
        location.title = 'Info'
        setTitle(`${location.title} - ${pageTitle}`)
      }, [location.pathname])

  return (
    <main className={styles.container}>
      Contact
    </main>
  )
}

export default Contact