import { useNavigate, useSearch } from '@tanstack/react-router';
import { ContentBox } from 'components/ContentBox';
import { CatalogSearchParams } from 'models/catalogFilters';
import { useEffect } from 'react';
import { useWidgetStore } from 'store/useWidgetStore';
import { ProductsList } from './_sections/ProductsList';
import s from './CatalogPage.module.scss';

export const CatalogPage = () => {
  const { catalog } = useWidgetStore();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const search = useSearch({ from: '/catalog' }) as CatalogSearchParams;
  const navigate = useNavigate();

  useEffect(() => {
    catalog.filter.initFromSearchOrStorage(search);

    const params = catalog.filter.toSearchParams();
    const urlDealers = typeof search.dealers === 'string' ? search.dealers : '';
    const paramDealers = params.dealers ?? '';
    const urlPriceOrder = search.priceOrder ?? '';
    const paramPriceOrder = params.priceOrder ?? '';

    const urlChanged = urlDealers !== paramDealers || urlPriceOrder !== paramPriceOrder;
    if (urlChanged) {
      void navigate({ to: '/catalog', search: params });
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