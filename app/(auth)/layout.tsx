import React from 'react'

import { PropsWithChildren } from 'react'

const AuthLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='flex justify-center pt-12'>
      {children}
    </div>
  )
}

export default AuthLayout
