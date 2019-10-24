import fetch from 'fetch';

export default {
    userSearch: payload => fetch('http://google.ca/userSearch', { method: 'POST', body: payload }),
};
