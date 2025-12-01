import { Outlet } from '@tanstack/react-router';
import { Header } from 'components/Header';
import s from './Root.module.scss';

export function Root() {
  return (
    <div className={s.Root}>
      <Header />
      <Outlet />
    </div>
  );
}
