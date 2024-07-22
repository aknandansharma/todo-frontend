import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const AddEditNotes = ({ noteData, Type, getAllTasks, onClose}) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [error, setError] = useState(null);


    // Add Note
    const addNewNote = async () => {
        
        try {
            const response = await axiosInstance.post("/api/v1/auth/add-notes", {
                title,
                content,
            });

            if(response.data && response.data.note) {
                toast.success("Task added successfully!")
                getAllTasks()
                onClose()
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }
    }

    // Edit Tasks
    const editNote = async () => {
        const taskId = noteData?._id;
        try {
            const response = await axiosInstance.put("/api/v1/auth/update-notes/" + taskId, {
                title,
                content,
            });

            if(response.data && response.data.note) {
                toast.success("Update Task successfully!")
                getAllTasks()
                onClose()
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }
    }

    const handleAddNote = () => {
        console.log(noteData, "note data")
        if(!title) {
            setError("Please Enter The Title.")
            return;
        }
        if(!content) {
            setError("Please Enter The Content.")
            return;
        }
        setError("");

        if(Type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }


    }

    return (
        <div className="relative">

            <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200" onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Add the Title.'
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                    type='text'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded overflow-y-scroll'
                    placeholder='Content'
                    rows={5}
                />
            </div>
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            <button
                className='btn-primary font-medium mt-5 p-3'
                onClick={handleAddNote}>
                {Type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
};

export default AddEditNotes;
