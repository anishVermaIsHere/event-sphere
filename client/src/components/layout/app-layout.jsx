import AppTheme from '../common/app-theme';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <AppTheme> <Outlet /> </AppTheme>
  )
}

export default AppLayout