import { useNavigate } from '@tanstack/react-router';
import { Select, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { PriceSortOrder } from 'services';
import { useWidgetStore } from 'store/useWidgetStore';
import s from './Filters.module.scss';

export const Filters = observer(() => {
  const { catalog } = useWidgetStore();
  const navigate = useNavigate();

  const sortOptions = [
    { value: null, label: 'Без сортировки' },
    { value: 'asc', label: 'Сначала дешёвые' },
    { value: 'desc', label: 'Сначала дорогие' },
  ];

  const updateUrl = () => {
    void navigate({
      to: '/catalog',
      search: catalog.filter.toSearchParams(),
    });
  };

  const handleSortChange = (value: PriceSortOrder) => {
    catalog.filter.setPriceSortOrder(value ?? null);
    updateUrl();
  };

  const handleToggleDealer = (id: string, checked: boolean) => {
    catalog.filter.toggleDealer(id, checked);
    updateUrl();
  };

  return (
    <div className={s.Filters}>
      <Select 
        placeholder={'Сортировать по цене'}
        value={catalog.filter.priceSortOrder}
        options={sortOptions}
        onChange={handleSortChange}
        style={{ width: '100%', maxWidth: '200px' }}
      />
      {catalog.filter.availableDealers.length > 1 && (
        <div className={s.Filters__tags}>
          {catalog.filter.availableDealers.map((dealerId) => (
            <Tag.CheckableTag
              key={dealerId}
              checked={catalog.filter.selectedDealerIds.has(dealerId)}
              onChange={(checked) => { handleToggleDealer(dealerId, checked); }}
              style={{ height: '32px', display: 'flex', alignItems: 'center', fontSize: '16px' }}
            >
              {dealerId}
            </Tag.CheckableTag>
          ))}
        </div>
      )}
    </div>
  )
})