import React from 'react'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
const Home = () => {
  return (
    <div>
      {/* -----Hero section------ */}
    <section className='hero__section pt-[40px] 2xl:h-[800px]'>
      <div className="container">
        <div className='flex flex-col lg:flex-row gap-[70px] items-center justify-between'>
          {/* ---- hero content ---- */}
          <div>
            <div className='lg:w-[570px]'>
              <h1 className='text-[48px] leading-[46px] text-headingColor font-[600] md:text-[60]
              md:leading-[70px] tracking-widest'>
                INDEMAND Private Tutoring 
              </h1>
              <p className='text__para tracking-wider'>
                เว็บไซต์ที่ช่วยให้การจองเวลาเรียนเป็นเรื่องง่าย
              </p>

              <button className='btn text-[20px]'>
                จองเวลาเลย
              </button>
            </div>

            {/* ---- hero section -----*/}
            <div className='mt-[30px] lg:mt[70px] flex flex-col lg:flex-row lg:items-center gap-5
            lg:gap-[30px]'>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                text-headingColor'>
                  30+
                </h2>
                <span className='w-[100px] h-2 bg-brownColor rounded-full block mt-[-14px]'></span>
                <p className='text__para'>Lorem ipsum dolor sit amet</p>
              </div>
            </div>

          </div>

        <div className='flex gap-[30px] justify-end '></div>
          <div>
            <img className='w-full' src={img4} alt="" />
          </div>
          <div className='mt-[30px]'>
            <img src={img2} alt="" className='w-full mb-[30px]' />
            <img src={img3} alt="" className='w-full ' />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Home
