import HeroesTopPanel from '../heroesTopPanel/HeroesTopPanel';
import HeroesSidepanel from '../heroesSidepanel/HeroesSidepanel';
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';

const App = () => {
   return (
      <main className="app">
         <HeroesSidepanel />
         <div className="app__wrapper">
            <div className="app__container">
               <div className="app__panel">
                  <HeroesTopPanel />
               </div>
               <div className="content">
                  <HeroesList />
                  <div className="content__interactive">
                     <HeroesAddForm />
                     <HeroesFilters />
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
};

export default App;
