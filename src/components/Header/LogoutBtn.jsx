import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 font-medium"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
