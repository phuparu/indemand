import React from 'react'
import { faqlist } from '../../assets/data/faqlist'
import FaqItem from './FaqItem'
const FaqList = () => {
  return (
    <div>
      <ul className='mt-[38px]'>
        {faqlist.map((item,index)=> <FaqItem item={item} key={index}/>)}
      </ul>
    </div>
  )
}

export default FaqList
