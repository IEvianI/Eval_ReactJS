import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * Call API Login route
 * @param {object} credentials { identifier, password }
 * @return {object} { jwt, user }
 */
const loginApiCreate = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/local/register', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error.response);
    throw error;
  }
}

export {
  loginApiCreate
}
