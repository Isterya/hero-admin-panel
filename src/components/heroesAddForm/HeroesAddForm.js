import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

import { selectAll } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';

import './heroesAddForm.scss';

const avatarContext = require.context('../../assets/avatars', false, /\.svg$/);
const avatars = avatarContext.keys().map(avatarContext);

const HeroesAddForm = () => {
   const [heroName, setHeroName] = useState('');
   const [heroDescr, setHeroDescr] = useState('');
   const [heroElement, setHeroElement] = useState('');

   const [createHero] = useCreateHeroMutation();

   const { filtersLoadingStatus } = useSelector((state) => state.filters);
   const filters = selectAll(store.getState());

   const onSubmitHandler = (e) => {
      e.preventDefault();

      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      const newHero = {
         id: uuidv4(),
         name: heroName,
         description: heroDescr,
         element: heroElement,
         avatar: randomAvatar,
      };

      createHero(newHero).unwrap();

      setHeroName('');
      setHeroDescr('');
      setHeroElement('');
   };

   const renderFilters = (filters, status) => {
      if (status === 'loading') {
         return <option>Загрузка элементов</option>;
      } else if (status === 'error') {
         return <option>Ошибка загрузки</option>;
      }

      if (filters && filters.length > 0) {
         return filters.map(({ name, label }) => {
            // eslint-disable-next-line
            if (name === 'all') return;

            return (
               <option key={name} value={name}>
                  {label}
               </option>
            );
         });
      }
   };

   return (
      <form className="heroes-add-form" onSubmit={onSubmitHandler}>
         <div className="form-group">
            <label htmlFor="name">Имя нового героя</label>
            <input
               required
               type="text"
               name="name"
               id="name"
               placeholder="Как меня зовут?"
               value={heroName}
               onChange={(e) => setHeroName(e.target.value)}
            />
         </div>

         <div className="form-group">
            <label htmlFor="text">Описание</label>
            <textarea
               required
               name="text"
               id="text"
               placeholder="Что я умею?"
               value={heroDescr}
               onChange={(e) => setHeroDescr(e.target.value)}
            />
         </div>

         <div className="form-group">
            <label htmlFor="element">Выбрать элемент героя</label>
            <select
               required
               id="element"
               name="element"
               value={heroElement}
               onChange={(e) => setHeroElement(e.target.value)}
            >
               <option value="">Я владею элементом...</option>
               {renderFilters(filters, filtersLoadingStatus)}
            </select>
         </div>

         <button type="submit" className="btn">
            Создать
         </button>
      </form>
   );
};

export default HeroesAddForm;
