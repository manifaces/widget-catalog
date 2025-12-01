import { ShoppingOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useWidgetStore } from 'store/useWidgetStore';
import s from './CartLink.module.scss';

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