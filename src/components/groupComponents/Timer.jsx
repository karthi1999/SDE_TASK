import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

export const Timer = () => {

    const { dateTime, utcOffset } = useSelector(state => state?.directoryState);

    const [dateTimeValue, setDateTimeValue] = useState(moment(dateTime));
    const [timeOffset, setTimeOffset] = useState(utcOffset);
    const [isStop, setIsStop] = useState(false);

    useEffect(() => {
        setDateTimeValue(moment(dateTime));
    }, [dateTime])
    useEffect(() => {
        setTimeOffset(utcOffset);
    }, [utcOffset])
    useEffect(() => {
        let intervalId = '';
        if (!isStop) {
            intervalId = setInterval(() => {
                setDateTimeValue(dateTimeValue => moment(dateTimeValue).add(1, 'seconds'));
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isStop]);

    return (
        <div className='flex'>
            <div className="time_display flex flex-col items-center w-[150px] h-[50px] rounded-md border border-[#000] p-1.5 sm:ml-2 my-2 md:my-0 text-gray-900 shadow-none bg-transparent">
                <span className='font-bold text-[10px]'>{timeOffset && moment(dateTimeValue)?.utcOffset(timeOffset)?.format("YYYY-MM-DD ddd") ? moment(dateTimeValue).utcOffset(timeOffset).format("YYYY-MM-DD ddd") : ''}</span>
                <span className='font-bold text-[14px]'>{timeOffset && moment(dateTimeValue)?.utcOffset(timeOffset)?.format("HH:mm:ss") ? moment(dateTimeValue).utcOffset(timeOffset).format("HH:mm:ss") : ''}</span>
            </div>
            <button
                className="timer_btn bg-[#b6d7a8] border border-[#b6d7a8] rounded font-bold text-[14px] px-3 py-1 ml-2 my-2 md:my-0 w-[65px] h-[50px]"
                onClick={() => setIsStop(!isStop)}
            >
                {isStop ? 'Start' : 'Pause'}
            </button>
        </div>
    )
}