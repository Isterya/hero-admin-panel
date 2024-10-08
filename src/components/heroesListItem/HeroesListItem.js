import './heroesListItem.scss';
import closeIcon from '../../assets/close-icon.png';
import userAvatar from '../../assets/avatar.png';

const HeroesListItem = ({ name, description, element, onDelete }) => {
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

   return (
      <li className={`heroes-list__item ${elementClassName}`}>
         <img src={userAvatar} className="heroes-list__image" alt="unknown hero" />
         <div className="heroes-list__content">
            <h3 className="heroes-list__title">{name}</h3>
            <p className="heroes-list__description">{description}</p>
         </div>

         <button
            type="button"
            className="heroes-list__delete-btn"
            onClick={onDelete}
            aria-label="Close"
            style={{ backgroundImage: `url(${closeIcon})` }} // Добавим фоновую картинку
         ></button>
      </li>
   );
};

export default HeroesListItem;
