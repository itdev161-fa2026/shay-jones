import axios from "axios";


const API_URL = 'http://localhost:3000/api'; 

const api = axios.create({
    baseURL : API_URL, 
}); 

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['x-auth-token'] = token; 
        }
            return config;
    }, 
        (error) => {
            return Promise.reject(error); 
        }
); 

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); 
            window.location.href = '/login';
        }
            return Promise.reject(error); 
    }
)

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/user', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error; 
  }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth', {email, password }); 
    return response.data;
  } catch (error) {
    console.error('Error logging in user: ', error);
    throw error; 
  }
};

export const getPosts = async () => {
    try{
        const response = await api.get(`/posts`)
        return response.data;  
    } 
        catch(error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
};

export const getPostById = async (id) => {
     try{
        const response = await axios.get(`${API_URL}/posts/${id}`);
        return response.data;  
    } 
        catch(error) {
            console.error('Error fetching posts:', error);
            throw error;
}
};