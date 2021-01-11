import ApiClient from './ApiClient'

export const __GetProfile = async (username) => {
  try {
    const res = await ApiClient.get(`/users/${username}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const __RegisterUser = async (name, username, email, password) => {
  try {
    const res = await ApiClient.post('/users/register', {name, username, email, password})
    return res.data
  } catch (error) {
    throw error
  }
}

export const __CheckSession = async () => {
  try {
    const res = await ApiClient.get('/users/refresh/session')
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const __LoginUser = async (email, password) => {
  try {
    const res = await ApiClient.post('/users/login', {email, password})
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (error) {
    throw error
  }
}
