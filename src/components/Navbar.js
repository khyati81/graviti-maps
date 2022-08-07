import React from 'react'


const navbarStyles = {
    container:{
        display:"flex",
        alignItems:"center",
        padding:"10px 50px ",
        backgroundColor:"white",
    },
    logoImg:{
        backgroundColor:"white",
    }
}

const Navbar = () => {
  return (
    <div style={navbarStyles.container}>
        <img style={navbarStyles.logoImg}  src="/images/logo.svg" alt="logo" />
    </div>
  )
}

export default Navbar