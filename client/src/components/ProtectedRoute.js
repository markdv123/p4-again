import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ authenticated, children, component: Component, ...rest }) =>
  authenticated === true ? (
    <Route {...rest} component={Component}>
      {console.log(authenticated)}
    </Route>
  ) : (
    <Redirect to="/" />
  )

export default ProtectedRoute