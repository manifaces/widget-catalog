import { useNavigate, useSearch } from '@tanstack/react-router';
import { ContentBox } from 'components/ContentBox';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react-lite';
import { CatalogSearchParams } from 'models/catalogFilters';
import { useEffect } from 'react';
import { useWidgetStore } from 'store/useWidgetStore';
import { ProductsList } from './_sections/ProductsList';
import s from './CatalogPage.module.scss';

export const CatalogPage = observer(() => {
  const { catalog } = useWidgetStore();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const search = useSearch({ from: '/catalog' }) as CatalogSearchParams;
  const navigate = useNavigate();

  useEffect(() => {
    if (catalog.filter.loading) return;
    
    catalog.filter.initializeFrom(search);

    const params = catalog.filter.toSearchParams();
    const searchStr = JSON.stringify(search);
    const paramsStr = JSON.stringify(params);

    const urlChanged = searchStr !== paramsStr;

    if (urlChanged) {
      void navigate({ to: '/catalog', search: params });
    }

  }, [catalog.filter, search, navigate, catalog.filter.loading]);

  return (
    <main className={s.CatalogPage}>
      <ContentBox>
        <div className={s.CatalogPage__wrapper}>
          <h1 className={s.CatalogPage__title}>
            Каталог
          </h1>
          {catalog.filter.loading ? (
            <Loader />
          ) : (
            <ProductsList />
          )}
        </div>
      </ContentBox>
    </main>
  )
})