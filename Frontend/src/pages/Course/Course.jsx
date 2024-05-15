import React from 'react'
import CourseCard from '../../components/Courses/CourseCard'
import { course } from '../../assets/data/course'
const Course = () => {
  return (
    <div>

      <section className='bg-[#fff9ea]'>
        <div className='container text-center'>
          <h2 className='heading'>
            Find a Course
          </h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] 
          rounded-md flex items-center justify-between'>
              <input type="search" className='py-2 pl-4 pr-2 bg-transparent w-full
              focus:outline-none cursor-pointer placeholder:text-textColor'
              placeholder='Search Course'/>
              <button className='btn mt-0 rounded-[0px] rounded-r-md'>
                Search
              </button>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 lg:grid-cols-3 gap-5'>
          {course.map(course => (
            <CourseCard key={course.id} course={course}/>
          ))}
        </div>

        </div>
      </section>
    </div>
  )
}

export default Course
