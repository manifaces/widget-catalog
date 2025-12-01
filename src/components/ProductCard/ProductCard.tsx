import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import { Product } from 'models/product';
import { useWidgetStore } from 'store/useWidgetStore';
import s from './ProductCard.module.scss';

const { Meta } = Card;

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = observer(({
  product
}: ProductCardProps) => {
  const { cart } = useWidgetStore();
  
  const quantityInCart = cart.getQuantity(product.id);

  return (
    <Card
      className={s.ProductCard}
      cover={
        <img
          className={s.ProductCard__image}
          src={product.imagePath}
          alt=""
        />
      }
      actions={[
        <MinusOutlined key="minus" onClick={() => { cart.decreaseProduct(product.id); }} style={{ fontSize: '20px' }} />,
        <div key="quantity" style={{ fontSize: '20px', color: quantityInCart > 0 ? '#e81741' : 'rgba(0,0,0,0.45)' }}>
          {quantityInCart}
        </div>,
        <PlusOutlined key="plus" onClick={() => { cart.addProduct(product); }} style={{ fontSize: '20px' }} />
      ]}
    >
      <Meta 
        title={product.displayName}
        description={product.formattedPrice}
      />
    </Card>
  )
})