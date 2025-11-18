import React from 'react'
import AuthFormBasic from './form'
const login = () => {
  return (
    <div>
      <AuthFormBasic route="auth/token/" method="login" />
    </div>
  )
}

export default login
