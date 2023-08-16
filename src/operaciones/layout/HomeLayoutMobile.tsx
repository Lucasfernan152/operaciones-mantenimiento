import React from 'react'
import { MenuButtonComponent } from '../components/MenuButtonComponent'
import { MenuBarMobile } from '../components/ManuBarMobile';

export const HomeLayoutMobile = ({children}:any) => {
  return (
    <div className='flex justify-center'>
      {children}
      <MenuBarMobile/>
    </div>
  )
}
