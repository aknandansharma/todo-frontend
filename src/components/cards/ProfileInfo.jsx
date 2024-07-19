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
                <button className='text-sm text-slate-700 underline' onClick={userLogout}>
                    Logout
                </button>
            </div>
        </div>
    </>
  )
}

export default ProfileInfo