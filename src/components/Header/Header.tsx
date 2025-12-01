import s from './Header.module.scss';
import { Link } from '@tanstack/react-router';
import { ContentBox } from 'components/ContentBox';
import { CartLink } from 'components/CartLink';

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