import React, { useState } from 'react'
import sci01 from '../../images/sci01.jpg'
import SidePanel from './SidePanel';
const CourseDetail = () => {
  
  const [tab, setTab] = useState('about');
  
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>

            <div className='md:col-span-2'>
              <div className='flex items-center gap-5'>
                <figure className='max-w-[200px] max-h-[200px]'>
                  <img src={sci01} alt="" />
                </figure>

                <div>
                  <span className='bg-[#CCF0F3] text-beigeColor py-1 px-6
                  lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                    SCIENCE
                  </span>
                  <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
                    PRIVATE SCIENCE
                  </h3>
                  <p className='text__para text-[14px] leading-6 md:text-[15px]
                  lg:max-w-[390px]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque deleniti accusamus perspiciatis facere officia id, optio inventore totam 
                  </p>
                </div>
              </div>

              <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
                <button
                onClick={() => setTab('about')}
                className={'${tab == "about" && py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold'}
                >
                  About
                </button>

              </div>
            </div>
            <div>
              <SidePanel/>
            </div>
        </div>
      </div>
    </section>
  )
}

export default CourseDetail
