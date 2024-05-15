import React from 'react'
import { Link } from 'react-router-dom'
import {RiLinkedinFill} from 'react-icons/ri'
import { AiFillYoutube, AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import { FaLine } from "react-icons/fa6";

const socialLinks = [
  {
    path:'https://www.youtube.com',
    icon:<AiFillYoutube className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path:'https://www.facebook.com',
    icon:<AiFillFacebook className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path:'https://www.instagram.com',
    icon:<AiOutlineInstagram className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path:'https://www.line.com',
    icon:<FaLine className='group-hover:text-white w-4 h-5'/>,
  }
]

const quickLink1 = [
  {
    path:'/home',
    display:'Home',
  },
  {
    path:'/course',
    display:'Courses',
  },
  {
    path:'/contact',
    display:'Contact',
  },
]

const quickLink2 = [
  {
    path:'/home',
    display:'Home',
  },
]

const quickLink3 = [
  {
    path:'/home',
    display:'65090500421',
  },
  {
    path:'/home',
    display:'65090500448',
  },
]

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 pt-10'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>

            <div className='text-[32px]'>
                    I N D E M A N D
            </div>
            <p className='text-[16] leading-7 font-[400] text-textColor mt-4'>Copyright © {year} by 65090500421, 65090500448 all right reserved.</p>

            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181A1E] rounded-full
              flex items-center justify-center group hover:bg-primaryColor hover:border-none'>{link.icon}</Link> )}
            </div>
          
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              Quick Links
            </h2>

            <ul>
              {quickLink1.map((item,index) => (
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                  {item.display}</Link></li>))}
            </ul>
          </div>


          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              Support 
            </h2>

            <ul>
              {quickLink3.map((item,index) => (
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                  {item.display}</Link></li>))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
