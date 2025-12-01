import { ContentBox } from 'components/ContentBox';
import s from './CartPage.module.scss';
import { CartList } from './_sections/CartList';

export const CartPage = () => {
  return (
    <main className={s.CartPage}>
      <ContentBox>
        <CartList />
      </ContentBox>
    </main>
  )
}