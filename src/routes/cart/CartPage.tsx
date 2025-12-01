import { ContentBox } from 'components/ContentBox';
import { CartList } from './_sections/CartList';
import s from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <main className={s.CartPage}>
      <ContentBox>
        <CartList />
      </ContentBox>
    </main>
  )
}