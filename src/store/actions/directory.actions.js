import { getCountriesConfig, getError, getTimeZoneConfig, getUserDetailsConfig, getUserProfileConfig, getUsersConfig, getUsersPostConfig } from "src/lib";
import { directoryLoading, getCountriesList, getDateTime, getUserPostDetails, getUserProfile, getUsersList, getUsersPostCount } from "../slices";
import axios from 'axios';

export const usersListAPI = () => {
    return async (dispatch) => {
        dispatch(directoryLoading(true));
        try {
            const { url } = getUsersConfig();
            const { url: usersPostUrl } = getUsersPostConfig();
            const usersListresult = await axios.get(url);
            const usersListResponse = usersListresult?.data;
            if (usersListresult?.status === 200) {
                const usersPostListresult = await axios.get(usersPostUrl);
                const usersPostListRespnse = usersPostListresult?.data;
                if (usersPostListresult?.status === 200) {
                    const usersPostCount = usersPostListRespnse.reduce((acc, item) => {
                        const userId = item.userId;
                        acc[userId] = (acc[userId] || 0) + 1;
                        return acc;
                    }, {});
                    dispatch(getUsersList(usersListResponse))
                    dispatch(getUsersPostCount(usersPostCount))
                }
            }
            dispatch(directoryLoading(false));
        } catch (e) {
            dispatch(directoryLoading(false));
            getError(e);
        }
    };
};

export const userProfileAPI = (id) => {
    return async (dispatch) => {
        dispatch(directoryLoading(true));
        try {
            const { url } = getUserProfileConfig(id);
            const result = await axios.get(url);
            const responseUserProfile = result?.data;
            if (result?.status === 200) {
                dispatch(getUserPostDetails(responseUserProfile))
                const { url } = getUserDetailsConfig(id);
                const result = await axios.get(url);
                const response = result?.data;
                if (result?.status === 200) {
                    dispatch(getUserProfile(response))
                }
            }
            dispatch(directoryLoading(false));
        } catch (e) {
            dispatch(directoryLoading(false));
            getError(e);
        }
    };
};

export const countriesListAPI = () => {
    return async (dispatch) => {
        try {
            const { url } = getCountriesConfig();
            const result = await axios.get(url);
            const response = result?.data;
            if (result?.status === 200) {
                dispatch(getCountriesList(response))
            }
        } catch (e) {
            getError(e);
        }
    };
};

export const timeZoneAPI = (zone) => {
    return async (dispatch) => {
        try {
            const { url } = getTimeZoneConfig(zone);
            const result = await axios.get(url);
            const response = result?.data;
            if (result?.status === 200) {
                response?.datetime && dispatch(getDateTime({ utc_datetime: response.utc_datetime, utc_offset: response.utc_offset }))
            }
        } catch (e) {
            getError(e);
        }
    };
};