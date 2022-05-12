import axios from 'axios';
const userToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
const axiosClient = {
    get: (path) => {
        let options = {
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}${path}`,
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }
        return axios(options).then((res) => {
            return res.data;
        })
    },
    post: (path, formData) => {
        let options = {
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}${path}`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }
        return axios(options).then((res) => {
                return res;
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    return err.response;
                }
            })
    },
    put: (path, formData, type = 'json') => {
        let headers = {
            'Authorization': `Bearer ${userToken}`
        }

        if (type === "multipart") {
            headers = {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }

        return axios.put(`${process.env.REACT_APP_BASE_URL}${path}`, formData, {
                headers: headers
            }).then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            })
    },
}

export default axiosClient;