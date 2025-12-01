import { Link } from '@tanstack/react-router';
import { CartLink } from 'components/CartLink';
import { ContentBox } from 'components/ContentBox';
import s from './Header.module.scss';

export const Header = () => {  
  return (
    <header className={s.Header}>
      <ContentBox>
        <div className={s.Header__content}>
          <nav className={s.Header__navigation}>
            <Link to={'/'} className={s.Header__link}>
              Главная
            </Link>
            <Link to={'/catalog'} className={s.Header__link}>
              Каталог
            </Link>
          </nav>
          <CartLink className={s.Header__link} />
        </div>
      </ContentBox>
    </header>
  )
}