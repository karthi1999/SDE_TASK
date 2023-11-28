import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersListAPI } from 'src/store';
import { Bars } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';

const DirectoryPage = () => {
    const dispatch = useDispatch();
    const { isLoading, usersList, usersPostCount } = useSelector(state => state?.directoryState);

    const [users, setUsers] = useState(null);
    const [usersPost, setUsersPost] = useState(null);

    useEffect(() => {
        setUsers(usersList);
        setUsersPost(usersPostCount);
    }, [usersList, usersPostCount]);
    useEffect(() => {
        dispatch(usersListAPI());
    }, []);
    
    return (
        <div className='w-[100vw] h-[100vh] p-4 md:p-7 xl:p-10 overflow-scroll'>
            <h1 className='text-center font-bold text-[20px] md:text-[24px] mb-4'>Directory</h1>
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
                        users && Array.isArray(users) && users.length > 0 ? users.map((user, index) => {
                            const { id, name } = user
                            return (
                                <NavLink
                                    key={index}
                                    id={id}
                                    className="user-list-wrapper flex flex-col sm:flex-row sm:justify-between bg-[#cfe2f3] border border-[#000] rounded font-bold text-[14px] md:text-[16px] w-[100%] lg:w-[80%] mb-2 md:mb-4 p-2 cursor-pointer"
                                    to={`/users/${id}`}
                                >
                                    <span className='w-fit'>Name: {name ? name : 'N/A'}</span>
                                    <span className='w-fit'>Posts: {usersPost?.[id] ? usersPost[id] : '00'}</span>
                                </NavLink>
                            )
                        }) :
                            <h1>No Records</h1>
                }
            </div>
        </div>
    )
}

export default DirectoryPage