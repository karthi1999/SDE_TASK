import React from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="overlay fixed top-0 left-0 w-[100%] h-[100%] bg-[#00000080] flex items-center justify-center" onClick={()=>onClose()}>
                    <div className="modal bg-[#fff] w-[90%] sm:w-[500px] relative p-[20px] rounded-[8px]" onClick={(e) => e.stopPropagation()}>
                        <span className="close absolute top-2 right-2 text-[20px] cursor-pointer" onClick={()=>onClose()}>&times;</span>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
