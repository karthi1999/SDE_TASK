import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
    isLoading: false,
    usersList: null,
    usersPostCount: null,
    userProfile: null,
    userPostDetails: null,
    countriesList: null,
    dateTime: null,
    utcOffset: null,
};

const directorySlice = createSlice({
    name: 'directorySlice',
    initialState,
    reducers: {
        directoryLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        getUsersList: (state, { payload }) => {
            state.usersList = payload;
        },
        getUsersPostCount: (state, { payload }) => {
            state.usersPostCount = payload;
        },
        getUserProfile: (state, { payload }) => {
            state.userProfile = payload;
        },
        getUserPostDetails: (state, { payload }) => {
            state.userPostDetails = payload;
        },
        getCountriesList: (state, { payload }) => {
            state.countriesList = payload;
        },
        getDateTime: (state, { payload }) => {
            state.dateTime = payload.utc_datetime;
            state.utcOffset = payload.utc_offset;
        },
    },
});

const { actions, reducer } = directorySlice;

export const {
    directoryLoading,
    getUsersList,
    getUsersPostCount,
    getUserProfile,
    getUserPostDetails,
    getCountriesList,
    getDateTime,
} = actions;

export default reducer;