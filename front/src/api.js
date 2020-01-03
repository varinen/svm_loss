if (process.env.NODE_ENV === 'production') {
    export let apiUrl = 'http://svm-demo.singularaspect.com';
} else {
    export let apiUrl = 'http://localhost:5000';
}

export const pathGetParams = '/get_params';
export const apiGetParams = `${apiUrl}${pathGetParams}`;

export const pathGetData = '/get_data';
export const apiGetData = `${apiUrl}${pathGetData}`;

export const pathFetchPlot = '/get_plot';
export const apiFetchPlot = `${apiUrl}${pathFetchPlot}`;

export const pathFetchStep = '/get_step';
export const apiFetchStep = `${apiUrl}${pathFetchStep}`;