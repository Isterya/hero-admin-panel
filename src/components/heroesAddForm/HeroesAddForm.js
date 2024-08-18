import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { heroAdded } from '../../actions';
import { v4 as uuidv4 } from 'uuid';

const HeroesAddForm = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [element, setElement] = useState('');
   const [filters, setFilters] = useState([]);

   const dispatch = useDispatch();
   const { request } = useHttp();

   useEffect(() => {
      request('http://localhost:3001/filters')
         .then((data) => {
            const filteredElements = data.filter((filter) => filter.name !== 'all');
            setFilters(filteredElements);
         })
         .catch((error) => console.log(error));
   }, [request]);

   const onSubmitHandler = (e) => {
      e.preventDefault();

      const newHero = {
         id: uuidv4(),
         name,
         description,
         element,
      };

      request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
         .then((data) => dispatch(heroAdded(data)))
         .catch((error) => console.log(error));

      setName('');
      setDescription('');
      setElement('');
   };

   return (
      <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
         <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
               Имя нового героя
            </label>
            <input
               required
               type="text"
               name="name"
               className="form-control"
               id="name"
               placeholder="Как меня зовут?"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="mb-3">
            <label htmlFor="description" className="form-label fs-4">
               Описание
            </label>
            <textarea
               required
               name="description"
               className="form-control"
               id="description"
               placeholder="Что я умею?"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               style={{ height: '130px' }}
            />
         </div>

         <div className="mb-3">
            <label htmlFor="element" className="form-label">
               Выбрать элемент героя
            </label>
            <select
               required
               className="form-select"
               id="element"
               name="element"
               value={element}
               onChange={(e) => setElement(e.target.value)}
            >
               <option>Я владею элементом...</option>
               {filters.map((filter) => (
                  <option key={filter.name} value={filter.name}>
                     {filter.label}
                  </option>
               ))}
            </select>
         </div>

         <button type="submit" className="btn btn-primary">
            Создать
         </button>
      </form>
   );
};

export default HeroesAddForm;
