import { Outlet } from '@tanstack/react-router';
import s from './Root.module.scss';
import { Header } from 'components/Header';

export function Root() {
  return (
    <div className={s.Root}>
      <Header />
      <Outlet />
    </div>
  );
}
