const API_BASE_URL = 'http://localhost:5001/api';

const workerService = {
    // Create a new worker profile
    createWorker: async (formData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to create a worker profile');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/workers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.message || 'Failed to create worker profile');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    // Get all workers with optional filters
    getWorkers: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${API_BASE_URL}/workers${queryParams ? `?${queryParams}` : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch workers');
        }

        return data;
    },

    // Get worker by ID
    getWorkerById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/workers/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch worker');
        }

        return data;
    },

    // Update worker profile
    updateWorker: async (id, formData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to update the worker profile');
        }

        const response = await fetch(`${API_BASE_URL}/workers/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update worker profile');
        }

        return data;
    },

    // Delete worker profile
    deleteWorker: async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to delete the worker profile');
        }

        const response = await fetch(`${API_BASE_URL}/workers/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete worker profile');
        }

        return data;
    }
};

export default workerService;
