import { API_BASE_URL, endpoints } from './config';
import { authService } from './authService';

const getAuthHeaders = () => {
    const token = authService.getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const jobService = {
    async getAllJobs(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = `${API_BASE_URL}${endpoints.jobs.list}${queryParams ? `?${queryParams}` : ''}`;
            
            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch jobs');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    async getJobById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoints.jobs.getById(id)}`, {
                headers: getAuthHeaders(),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch job');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    async createJob(jobData) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoints.jobs.create}`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(jobData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create job');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    async updateJob(id, jobData) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoints.jobs.update(id)}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify(jobData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update job');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    async deleteJob(id) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoints.jobs.delete(id)}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete job');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },
};
