import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { ProductCard } from 'components/ProductCard';
import { observer } from 'mobx-react-lite';
import { useWidgetStore } from 'store/useWidgetStore';
import s from './CartList.module.scss';

export const CartList = observer(() => {
  const { cart } = useWidgetStore();
  
  return (
    <section className={s.CartList}>
      <div className={s.CartList__info}>
        <h1 className={s.CartList__title}>
          Корзина
        </h1>
        {cart.items.length > 0 ? (
          <div className={s.CartList__content}>
            {cart.items.map((item) => (
              <ProductCard
                key={item.product.id} 
                product={item.product}
              />
            ))}
          </div>
        ) : (
          <div className={s.CartList__empty}>
            Нет товаров, добавленных в корзину.
            <Link to={'/catalog'}>
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
      {cart.totalCount > 0 && (
        <div className={clsx(s.CartList__info, s.CartList__info_fixed)}>
          <div className={s.CartList__title}>
            Итого:
          </div>
          <div className={s.CartList__sum}>
            <p>
              Всего товаров: <span>{cart.totalCount}</span>
            </p>
            <p>
              На сумму: <span>{cart.totalPrice}</span>
            </p>
          </div>
          <div className={s.CartList__clear} onClick={() => { cart.clear(); }}>
            Очистить корзину
          </div>
        </div>
      )}
    </section>
  )
})