import React from 'react'
import { course } from '../../assets/data/course'
import CourseCard from './CourseCard'
const CourseList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px]
    mt-[30px] lg:mt-[55px]'>
      {course.map(course=> (<CourseCard key={course.id} course={course}/>))}
    </div>
  )
}

export default CourseList
