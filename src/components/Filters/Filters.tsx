import { useNavigate } from '@tanstack/react-router';
import { Select, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { Dealer } from 'models/dealer';
import { PriceSortOrder } from 'services';
import { useWidgetStore } from 'store/useWidgetStore';
import s from './Filters.module.scss';

export const Filters = observer(() => {
  const { catalog, dealers } = useWidgetStore();
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

  const handleToggleDealer = (dealer: Dealer, checked: boolean) => {
    catalog.filter.toggleDealer(dealer, checked);
    updateUrl();
  };

  return (
    <div className={s.Filters}>
      <Select 
        placeholder={'Сортировать по цене'}
        value={catalog.filter.priceSortOrder}
        options={sortOptions}
        onChange={handleSortChange}
      />
      {dealers.list.length > 1 && (
        <div className={s.Filters__tags}>
          {dealers.list.map((dealer) => (
            <Tag.CheckableTag
              key={dealer.id}
              checked={catalog.filter.selectedDealers.has(dealer)}
              onChange={(checked) => { handleToggleDealer(dealer, checked); }}
              style={{ height: '32px', display: 'flex', alignItems: 'center', fontSize: '16px' }}
            >
              {dealer.displayName}
            </Tag.CheckableTag>
          ))}
        </div>
      )}
    </div>
  )
})