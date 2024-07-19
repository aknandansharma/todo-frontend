import React from 'react'
import {getName} from '../../utils/helper'

const ProfileInfo = ({ userInfo, userLogout }) => {


  return (
    <>
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200'>
            {getName(userInfo?.fullName)}
           
            </div>
            <div>
                {/* <p className='text-sm font-medium'>Aknandan Sharma</p> */}
                <button className='px-4 py-2 border border-blue-500 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75' onClick={userLogout}>
                    Logout
                </button>
            </div>
        </div>
    </>
  )
}

export default ProfileInfo