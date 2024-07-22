import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({ title, date, content, isPinned, onEdit, onDelete, onPinNote, status, onChangeStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onChangeStatus) onChangeStatus(newStatus); // Pass the new status to the callback
    setDropdownOpen(false);
  };

  // Determine the background color based on currentStatus
  const statusColor = currentStatus === 'Todo' ? 'bg-blue-500' :
                       currentStatus === 'InProgress' ? 'bg-green-500' :
                       currentStatus === 'Done' ? 'bg-red-500' : '';

  // Determine which dropdown items should be shown
  const statusOptions = {
    Todo: ['InProgress'],
    InProgress: ['Done'],
    Done: []
  };

  const shouldShowDropdown = statusOptions[currentStatus].length > 0;

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ${statusColor}`}>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
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
        <div className='relative' ref={dropdownRef}>
          <button
            className={`text-sm py-1 px-2 rounded border ${statusColor}`}
            onClick={() => shouldShowDropdown && setDropdownOpen(!dropdownOpen)}
          >
            {currentStatus}
          </button>
          {dropdownOpen && shouldShowDropdown && (
            <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg'>
              {statusOptions[currentStatus].map(option => (
                <a
                  key={option}
                  className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                  onClick={() => handleStatusChange(option)}
                >
                  {option}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
