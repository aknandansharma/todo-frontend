import React, { useEffect, useState } from "react";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/NavBar/Navbar";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import emptyImage from "../../assets/images/empty to list.gif"
import { toast } from 'react-toastify';


const Home = () => {
    const [openAddEdit, setOpenAddEdit] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
 
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const navigate = useNavigate();

    // handel edit
    const handleEditTasks = (noteDetails) => {
        setOpenAddEdit({isShown: true, type: "edit", data: noteDetails})
    }
    

    // get user data.
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/api/v1/auth/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // get all tasks
    const getAllTasks = async () => {
        try {
            const response = await axiosInstance.get("/api/v1/auth/all-notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {console.log(error)}
    };

    // delette tasks.
    const deleteTask = async (data) => {
        const taskId = data?._id;
        try {
            const response = await axiosInstance.delete("/api/v1/auth/delete-notes/" + taskId);

            if(response.data && !response.data.error) {
                toast.success("Task Deleted Successfuly!");
                getAllTasks()
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message)
            }
        }
    }

    // update is pinned: 
    const updateIsPinned = async (data) => {
        console.log(data, "pinned")
        const taskId = data?._id;
        try {
            const response = await axiosInstance.put("/api/v1/auth/pinned-update/" + taskId, {
               isPinned: !data?.isPinned,
            });

            if(response.data && response.data.note) {
                toast.success("Task Pinned Successful!");
                getAllTasks()
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message)
            }
        }
    }

 // change status task
const onChangeStatus = async (note, newStatus) => {
    const TaskId = note?._id;
    try {
        const response = await axiosInstance.put("/api/v1/auth/update-status/" + TaskId, {
            status: newStatus,
        });

        if (response.data && !response.data.error) {
            toast.success("Status Updated Successfully!");
            getAllTasks(); // Refresh tasks
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        }
    }
};

    


    useEffect(() => {
        
        getUserInfo();
        getAllTasks();
        deleteTask();
        updateIsPinned();
        onChangeStatus();
        console.log(userInfo, "user data");
        console.log(openAddEdit.data, "noteData");
        return () => {};
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className='container mx-auto'>
                {allNotes.length > 0 ?  (
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            isPinned={item.isPinned}
                            status={item.status}
                            onEdit={() => handleEditTasks(item)}
                            onDelete={() => deleteTask(item)}
                            onPinNote={() => updateIsPinned(item)}
                            onChangeStatus={(newStatus) => onChangeStatus(item, newStatus)} 
                        />
                    ))}
                </div>
                ) : (
                    <EmptyCard imageSrc={emptyImage} message="Welcome to my Task Management Application. you can start with creating new Tasks simple click the plus icons." />
                )}
            </div>

            <button
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-green-600 hover:bg-green-400 absolute right-10 bottom-9'
                onClick={() => {
                    setOpenAddEdit({ isShown: true, type: "add", data: null });
                }}>
                <MdAdd className='text-[32px] text-white' />
            </button>

            <Modal
                isOpen={openAddEdit.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5'>
                <AddEditNotes
                    Type={openAddEdit.type}
                    noteData={openAddEdit.data}
                    onClose={() => {
                        setOpenAddEdit({
                            isShown: false,
                            type: "add",
                            data: null,
                        });
                    }}
                    getAllTasks={getAllTasks}
                />
            </Modal>
           
        </>
    );
};

export default Home;
