import React from 'react'
import logo from "../assets/images/logo.png"
import img1 from "../assets/images/img1.png"
import img2 from "../assets/images/img2.png"
import img3 from "../assets/images/img3.png"

const Footer = () => {
  return (
   <div className='' style={{backgroundColor:"#1C2541", padding:"20px"}}>
   <div className='d-flex justify-content-center'>
    <img src={logo} alt="logo" style={{height:"130px"}}/>

   </div>
   <div className='d-flex justify-content-center mt-2'>
    <p className='text-center text-white'>Sasto parts is the best parts shop for your bike<br/>
accessories. What kind of parts do you need<br/>
you can get here soluta nobis</p>
    </div>
    <div className='d-flex justify-content-between gap-3'>
        <div className='text-white'>
<h5>baneshwor, kathmandu</h5>
<h5>sastoparts23@gmail.com</h5>
        </div>
        <div className='d-flex gap-5'>
<img src={img1} alt="img1" style={{height:"20px"}}/>
<img src={img2} alt="img1" style={{height:"20px"}}/>
<img src={img3} alt="img1" style={{height:"20px"}}/>

        </div>
        </div>
   </div>
  )
}

export default Footer