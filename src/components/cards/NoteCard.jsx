import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

const NoteCard = ({title, date, content, isPinned, onEdit, onDelete, onPinNote}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>

            <div>
                <h6 className='text-sm font-medium '>{title}</h6>
                <span className='text-xs text-slate-500'>{date}</span>
            </div>

            <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-900' : 'text-slate-300'} cursor-pointer`}  />
        </div>

        <p className='text-xs text-slate-500 mt-2'>{content?.slice(0, 50)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center gap-2'>
                <MdCreate
                    className='icon-btn cursor-pointer hover:text-green-600'
                    onClick={onEdit}
                />
                <MdDelete
                    className='icon-btn cursor-pointer hover:text-red-600'
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard