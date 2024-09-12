import axios from 'axios'

export const API_URL = 'https://www.api.thespacevision.net/'
// export const API_URL = 'http://localhost:8080/'
export const handleSignIn = async (user) => {
  await axios
    .post(API_URL + 'token/', user, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      localStorage.clear()
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.access}`
    })
}

export const handleSignUp = async (user) => {
  await axios
    .post(API_URL + 'signup/', user, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      localStorage.clear()
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.access}`
    })
}

export const handleSignOut = async () => {
  await axios
    .post(
      API_URL + 'token/refresh/',
      {
        refresh_token: localStorage.getItem('refresh_token'),
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      axios.defaults.headers.common['Authorization'] = null
    })
}

export const handleReset = async (data) => {
  await axios
    .put(API_URL + 'reset/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('message', res.data.message)
      localStorage.removeItem('email')
      return res.data.message
    })
}
