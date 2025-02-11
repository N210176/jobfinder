export const API_BASE_URL = 'http://localhost:5001/api';

export const endpoints = {
    auth: {
        signup: '/auth/signup',
        login: '/auth/login',
    },
    jobs: {
        list: '/jobs',
        create: '/jobs',
        getById: (id) => `/jobs/${id}`,
        update: (id) => `/jobs/${id}`,
        delete: (id) => `/jobs/${id}`,
    },
};
