import React from 'react'
import { Link } from 'react-router-dom'

function Middleware() {
  return (
    <div>
      <h1>This route is not found</h1>
      <p>Check if there is a type mistake</p>
      <p>Go to home page <Link style={{ color: 'red' }} to='/home' >Home </Link></p>
    </div>
  )
}

export default Middleware
