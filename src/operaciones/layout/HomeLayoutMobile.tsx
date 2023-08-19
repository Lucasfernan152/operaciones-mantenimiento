
import { MenuBarMobile } from '../components/MenuBarMobile';

export const HomeLayoutMobile = ({children}:any) => {
  return (
    <div className='flex justify-center'>
      {children}
      <MenuBarMobile/>
    </div>
  )
}
