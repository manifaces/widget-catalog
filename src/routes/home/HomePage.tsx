import { Loader } from "components/Loader";
import { observer } from "mobx-react-lite";
import { useWidgetStore } from "store/useWidgetStore";
import s from './HomePage.module.scss';
import { ErrorMessage } from "components/ErrorMessage";
import { GalleryPreview } from "./_sections/GalleryPreview";
import { ContentBox } from "components/ContentBox";

export const HomePage = observer(() => {
  const { catalog } = useWidgetStore();

  const products = catalog.productsForHomeCarousel;

  return (
    <main className={s.HomePage}>
      <ContentBox>
        <div className={s.HomePage__wrapper}>
          <h1 className={s.HomePage__title}>
            Главная
          </h1>
          <div className={s.HomePage__content}>
            {catalog.loading && (
              <Loader />
            )}
            {catalog.error && (
              <ErrorMessage 
                title={'Ошибка загрузки товаров'}
                subtitle={catalog.error}
              />
            )}
            {products.length > 0 ? (
              <GalleryPreview products={products} />
            ) : null}
          </div>
        </div>
      </ContentBox>
    </main>
  )
})