const API_PREFIX = process.env.API_PREFIX || 'http://localhost:5000';

export const urls = {
    get_params: `${API_PREFIX}/get_params`,
    get_data: `${API_PREFIX}/get_data`,
    get_plot: `${API_PREFIX}/get_plot`
};
