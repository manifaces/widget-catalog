import { ContentBox } from 'components/ContentBox';
import s from './CatalogPage.module.scss';
import { useWidgetStore } from 'store/useWidgetStore';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ProductsList } from './_sections/ProductsList';
import { useEffect } from 'react';

export const CatalogPage = () => {
  const { catalog } = useWidgetStore();
  const search = useSearch({ from: '/catalog' });
  const navigate = useNavigate();

  useEffect(() => {
    // Восстанавливаем фильтры
    catalog.filter.initFromSearchOrStorage(search);

    // После восстановления фильтров из localStorage обновляем URL
    const params = catalog.filter.toSearchParams();
    const urlDealers = typeof search.dealers === 'string' ? search.dealers : '';
    const paramDealers = params.dealers ?? '';
    const urlPriceOrder = search.priceOrder ?? '';
    const paramPriceOrder = params.priceOrder ?? '';

    const urlChanged = urlDealers !== paramDealers || urlPriceOrder !== paramPriceOrder;
    if (urlChanged) {
      navigate({ to: '/catalog', search: params });
    }
  }, [catalog.filter, search, navigate]);

  return (
    <main className={s.CatalogPage}>
      <ContentBox>
        <div className={s.CatalogPage__wrapper}>
          <h1 className={s.CatalogPage__title}>
            Каталог
          </h1>
          <ProductsList />
        </div>
        
      </ContentBox>
    </main>
  )
}