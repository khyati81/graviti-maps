import React from 'react'
import Navbar from '../components/Navbar'
import './style.css'
import Maps from '../components/Maps'

const Home = () => {
  return (
    <>
        {/* NAVBAR */}
        <Navbar/>

        {/* MAIN BODY */}
        <div>
           {/* HEADING */}
           <h1 className='home__title'>Let's calculate <span>distance</span> from Google maps</h1>

           <div className='sub__container'>
           {/* INPUTS and MAP */}
           <Maps/>
           </div>
        </div>
    </>
  )
}

export default Home