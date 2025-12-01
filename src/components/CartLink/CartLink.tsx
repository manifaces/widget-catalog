import { useWidgetStore } from 'store/useWidgetStore';
import { ShoppingOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import s from './CartLink.module.scss';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

export const CartLink = observer(({ className }: { className?: string }) => {
  const { cart } = useWidgetStore();
  return (
    <Link to={'/cart'} className={clsx(s.CartLink, className)}>
      <ShoppingOutlined style={{ fontSize: '24px'}} />
      <div>Корзина</div>
      {cart.totalCount > 0 && (
        <div className={s.CartLink__count}>
          {cart.totalCount}
        </div>
      )}
    </Link>
  )
})