import moment from 'moment'
import React, { useState } from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

const NoteCard = ({ title, date, content, isPinned, onEdit, onDelete, onPinNote, status, onChangeStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onChangeStatus) onChangeStatus(newStatus); // Pass the new status to the callback
    setDropdownOpen(false);
  };

  // Determine the background color and blinking effect based on currentStatus
  const statusColor = currentStatus === 'Todo' ? 'bg-blue-500' :
                       currentStatus === 'InProgress' ? 'bg-green-500' :
                       currentStatus === 'Done' ? 'bg-red-500' : '';

  return (
    <div className={`border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ${statusColor} `}>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium '>{title}</h6>
          <span className='text-xs text-slate-500'>{moment(date).format('Do MM YYYY')}</span>
        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-900' : 'text-slate-300'} cursor-pointer`} onClick={onPinNote} />
      </div>
      <p className='text-xs text-slate-500 mt-2'>{content?.slice(0, 50)}</p>
      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center gap-2'>
          <MdCreate className='icon-btn cursor-pointer hover:text-green-600' onClick={onEdit} />
          <MdDelete className='icon-btn cursor-pointer hover:text-red-600' onClick={onDelete} />
        </div>
        <div className='relative'>
          <button
            className={`text-sm py-1 px-2 rounded border ${statusColor}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {currentStatus}
          </button>
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg'>
              <a
                className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                onClick={() => handleStatusChange('Todo')}
              >
                Todo
              </a>
              <a
                className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                onClick={() => handleStatusChange('InProgress')}
              >
                InProgress
              </a>
              <a
                className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                onClick={() => handleStatusChange('Done')}
              >
                Done
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteCard
