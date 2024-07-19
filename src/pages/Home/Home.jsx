import React, { useEffect, useState } from "react";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from '../../components/NavBar/Navbar';


const Home = () => {
    const [openAddEdit, setOpenAddEdit] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // get user data.
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/api/v1/auth/get-user");
            if(response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
            console.log(userInfo, "dalds")
        } catch (error) {
            if(error.response.status === 401) {
                localStorage.clear();
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        console.log("user effect", userInfo)
        getUserInfo();
        return () => {}
    }, [])




    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    <NoteCard
                        title={"Aknandan Metting"}
                        date={"05 Mar 1998"}
                        content={
                            "Aknnadan sharma village post pokharhan and dist is aurangabad and state is bihar."
                        }
                        isPinned={true}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        onPinNote={() => {}}
                    />
                </div>
            </div>

            <button
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-green-600 hover:bg-green-400 absolute right-10 bottom-9'
                onClick={() => {
                    setOpenAddEdit({isShown: true, type: "add", data: null});
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
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5'
                >
                <AddEditNotes
                    type={openAddEdit.type}
                    noteData={openAddEdit.data}
                    onClose={() => {
                        setOpenAddEdit({isShown: false, type: "add", data: null});
                    }}
                />
            </Modal>
        </>
    );
};

export default Home;
