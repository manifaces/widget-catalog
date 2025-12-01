import { Filters } from "components/Filters";
import { Loader } from 'components/Loader';
import { ProductCard } from "components/ProductCard";
import { observer } from "mobx-react-lite";
import { useWidgetStore } from "store/useWidgetStore";
import s from './ProductsList.module.scss';

export const ProductsList = observer(() => {
  const { catalog, dealers } = useWidgetStore();
  
  const products = catalog.filteredAndSortedProducts;

  return (
    <section className={s.ProductsList}>
      {!dealers.ready && (
        <Loader />
      )}
      {dealers.list.length > 0 && (
        <Filters />
      )}
      <div className={s.ProductsList__content}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
})