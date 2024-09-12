import axios from 'axios'

export const GOOGLE_AUTH_CLIENT_ID =
  '898841086372-or1qfhn74os677at6nc7pe6lvbu466rq.apps.googleusercontent.com'
export const TWITTER_AUTH_CLIENT_ID = ''
export const TWITTER_AUTH_CLIENT_SECRET = ''
export const FACEBOOK_AUTH_APP_ID = ''

export const SocialLogin = async (access_token) => {
  localStorage.clear()
  localStorage.setItem('access_token', access_token)
  window.location.href = '/'
}
