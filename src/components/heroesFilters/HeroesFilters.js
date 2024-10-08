import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';

import './heroesFilters.scss';

const HeroesFilters = () => {
   const { filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);
   const filters = selectAll(store.getState());
   const dispatch = useDispatch();
   const { request } = useHttp();

   useEffect(() => {
      dispatch(fetchFilters(request));

      // eslint-disable-next-line
   }, []);

   if (filtersLoadingStatus === 'loading') {
      return <p className="filters-loading">Загрузка...</p>;
   } else if (filtersLoadingStatus === 'error') {
      return <p className="filters-error">Ошибка загрузки</p>;
   }

   const renderFilters = (arr) => {
      if (arr.length === 0) {
         return <p className="filters-not-found">Фильтры не найдены</p>;
      }

      return arr.map(({ name, label }) => {
         const btnClass = classNames('filter-btn', {
            active: name === activeFilter,
         });

         return (
            <button key={name} id={name} className={btnClass} onClick={() => dispatch(filtersChanged(name))}>
               {label}
            </button>
         );
      });
   };

   const elements = renderFilters(filters);

   return (
      <div className="heroes-filters">
         <p className="filters-title">Отфильтруйте героев по элементам</p>
         <div className="btn-group">{elements}</div>
      </div>
   );
};

export default HeroesFilters;
