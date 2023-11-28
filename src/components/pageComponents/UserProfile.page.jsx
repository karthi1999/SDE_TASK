import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { CountryDropdown } from '../groupComponents';
import { userProfileAPI } from 'src/store';
import { Modal } from '../baseComponents';

const UserProfilePage = () => {

    const dispatch = useDispatch();
    const { userId } = useParams();
    const navigate = useNavigate();
    const { isLoading, userProfile, userPostDetails } = useSelector(state => state?.directoryState);

    const [userDetails, setUserDetails] = useState(null);
    const [postDetails, setPostDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        title: '',
        content: '',
    });

    const openModal = (title, body) => {
        setIsModalOpen(true);
        setModalData({
            title,
            body
        });
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        userId && dispatch(userProfileAPI(userId));
    }, []);
    useEffect(() => {
        setUserDetails(userProfile);
    }, [userProfile]);
    useEffect(() => {
        setPostDetails(userPostDetails);
    }, [userPostDetails]);

    return (
        <div className='w-[100vw] h-[100vh] p-4 md:p-7 xl:p-10 overflow-scroll'>
            <div className="top-navbar flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <button
                    className='bg-[#cfe2f3] rounded font-bold text-[14px] px-3 py-1 w-[65px] h-[50px]'
                    onClick={() => navigate("/users")}
                >
                    Back
                </button>
                <CountryDropdown />
            </div>
            <h1 className='text-center font-bold text-[20px] md:text-[24px] mb-4'>Profile Page</h1>
            <div className="page-content flex flex-col justify-center items-center">
                {
                    isLoading ?
                        <Bars
                            height="25"
                            width="25"
                            color="#00D090"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass="pt-1 sm:pt-2"
                            visible={true}
                        /> :
                        <div className="profile-wrapper">
                            <div className="profile-details flex flex-col md:flex-row justify-between items-start mb-4 border border-[#000] rounded p-2">
                                <div className="left flex flex-col border border-[#000] rounded p-2 mb-2 md:mb-0">
                                    <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>
                                        Name: <span className='font-normal text-[14px] md:text-[16px]'>{userDetails?.name ? userDetails.name : '--'}</span>
                                    </h2>
                                    <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>
                                        Username: <span className='font-normal text-[14px] md:text-[16px]'>{userDetails?.username ? userDetails.username : '--'}</span>
                                    </h2>
                                    <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>
                                        Catch phrase: <span className='font-normal text-[14px] md:text-[16px]'>{userDetails?.company?.catchPhrase ? userDetails.company.catchPhrase : '--'}</span>
                                    </h2>
                                </div>
                                <div className="right flex flex-col border border-[#000] rounded p-2">
                                    <div className='flex flex-col mb-2'>
                                        <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>Address: </h2>
                                        <span className='text-[14px] md:text-[16px] ml-4'>{userDetails?.address.street ? userDetails.address.street : '--'}</span>
                                        <span className='text-[14px] md:text-[16px] ml-4'>{userDetails?.address.suite ? userDetails.address.suite : '--'}</span>
                                        <span className='text-[14px] md:text-[16px] ml-4'>{userDetails?.address.city ? userDetails.address.city : '--'}</span>
                                        <span className='text-[14px] md:text-[16px] ml-4'>{userDetails?.address.zipcode ? userDetails.address.zipcode : '--'}</span>
                                    </div>
                                    <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>
                                        Email: <span className='font-normal text-[14px] md:text-[16px]'>{userDetails?.email ? userDetails.email : '--'}</span>
                                    </h2>
                                    <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>
                                        Phone: <span className='font-normal text-[14px] md:text-[16px]'>{userDetails?.phone ? userDetails.phone : '--'}</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    postDetails && Array.isArray(postDetails) ?
                                        postDetails.map((data, index) => {
                                            const { title, body } = data
                                            return (
                                                <div
                                                    key={index}
                                                    className="border border-[#000] rounded p-2 cursor-pointer"
                                                    onClick={() => openModal(title, body)}
                                                >
                                                    <h2 className='font-bold text-[16px] md:text-[18px] mb-2'>
                                                        {title}
                                                    </h2>
                                                    <p className='indent-4 text-[14px] md:text-[16px]'>
                                                        {body}
                                                    </p>
                                                </div>
                                            )
                                        }) : ''
                                }
                            </div>
                        </div>
                }
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                >
                    <h2 className='font-bold text-[20px] md:text-[24px] mb-4'>{modalData?.title ? modalData.title : '--'}</h2>
                    <p className='indent-8 text-[16px] md:text-[18px]'>{modalData?.body ? modalData.body : '--'}</p>
                </Modal>
            </div>
        </div >
    )
}

export default UserProfilePage