import React from 'react'
import SignIn from '../views/UserAuth/SignIn'
import Layout from '../components/Layout/Layout'

function login() {
  return (
    <Layout>
      <SignIn/>
    </Layout>
  )
}

export default login