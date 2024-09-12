import './App.scss'

import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp'
import SignIn from './pages/Auth/SignIn'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Checkmail from './pages/Auth/Checkmail'
import ResetPassword from './pages/Auth/ResetPassword'
import VerificationCode from './pages/Auth/VerificationCode'
import LockScreen from './pages/Auth/LockScreen'
import Dashboard from './pages/Dashboard'
import GlobeSearch from './pages/GlobeSearch'
import Options from './pages/Options'
import Notification from './pages/Notification'
import Crude from './pages/Crude'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/" element={<GlobeSearch />} />
      <Route path="/options" element={<Options />} />
      <Route path="/crude" element={<Crude />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/checkmail" element={<Checkmail />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/verification" element={<VerificationCode />} />
      <Route path="/lock" element={<LockScreen />} />
    </Routes>
  )
}

export default App
