export const getUsersConfig = () => (
    {
        url: `https://jsonplaceholder.typicode.com/users`,
    }
);
export const getUsersPostConfig = () => (
    {
        url: `https://jsonplaceholder.typicode.com/posts`,
    }
);
export const getUserDetailsConfig = (userId) =>(
    {
        url: `https://jsonplaceholder.typicode.com/users/${userId}`
    }
)
export const getUserProfileConfig = (userId) => (
    {
        url: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    }
);
export const getCountriesConfig = () => (
    {
        url: `http://worldtimeapi.org/api/timezone`,
    }
);
export const getTimeZoneConfig = (timezone) => (
    {
        url: `http://worldtimeapi.org/api/timezone/${timezone}`,
    }
);