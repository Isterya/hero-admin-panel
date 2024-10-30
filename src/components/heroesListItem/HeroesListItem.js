import { useState } from 'react';
import './heroesListItem.scss';

import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';

const HeroesListItem = ({ name, description, element, avatar, onDelete, onSave }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editedName, setEditedName] = useState(name);
   const [editedDescription, setEditedDescription] = useState(description);

   let elementClassName;
   switch (element) {
      case 'fire':
         elementClassName = 'heroes-list__item--fire';
         break;
      case 'water':
         elementClassName = 'heroes-list__item--water';
         break;
      case 'wind':
         elementClassName = 'heroes-list__item--wind';
         break;
      case 'earth':
         elementClassName = 'heroes-list__item--earth';
         break;
      default:
         elementClassName = 'heroes-list__item--default';
   }

   const handleEditClick = () => {
      setIsEditing(true);
   };

   const handleSaveClick = () => {
      onSave({ name: editedName, description: editedDescription, element, avatar });
      setIsEditing(false);
   };

   const handleCancelClick = () => {
      setIsEditing(false);
      setEditedName(name);
      setEditedDescription(description);
   };

   return (
      <li className={`heroes-list__item ${elementClassName}`}>
         <img src={avatar} className="heroes-list__image" alt="unknown hero" />
         <div className="heroes-list__content">
            {isEditing ? (
               <>
                  <input
                     type="text"
                     value={editedName}
                     onChange={(e) => setEditedName(e.target.value)}
                     className="heroes-list__input"
                     placeholder="Имя героя"
                  />
                  <textarea
                     value={editedDescription}
                     onChange={(e) => setEditedDescription(e.target.value)}
                     className="heroes-list__textarea"
                     placeholder="Описание героя"
                  />
                  <div className="heroes-list__edit-actions">
                     <button onClick={handleSaveClick} className="heroes-list__save-btn">
                        Сохранить
                     </button>
                     <button onClick={handleCancelClick} className="heroes-list__cancel-btn">
                        Отмена
                     </button>
                  </div>
               </>
            ) : (
               <>
                  <h3 className="heroes-list__title">{name}</h3>
                  <p className="heroes-list__description">{description}</p>
                  <button
                     type="button"
                     className="heroes-list__edit-btn"
                     onClick={handleEditClick}
                     aria-label="Edit"
                  >
                     <img src={editIcon} alt="edit icon" className="heroes-list__edit-icon" />
                  </button>
               </>
            )}
         </div>

         <button
            type="button"
            className="heroes-list__delete-btn"
            onClick={onDelete}
            aria-label="Delete"
         >
            <img src={deleteIcon} alt="delete icon" className="heroes-list__delete-icon" />
         </button>
      </li>
   );
};

export default HeroesListItem;
