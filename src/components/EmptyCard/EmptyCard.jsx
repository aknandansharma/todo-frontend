import React from 'react'

const EmptyCard = ({ imageSrc, message }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={imageSrc} alt="No Task" className='w-80' />

        <p className='w-1/2 text-sm font-bold text-blue-700 text-center leading-7 mt-5'>
            {message}
        </p>
    </div>
  )
}

export default EmptyCard;