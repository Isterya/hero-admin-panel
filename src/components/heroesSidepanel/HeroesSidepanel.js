import { useGetHeroesQuery } from '../../api/apiSlice';

import StatisticsPanel from '../statisticsPanel/StatisticsPanel';

import './heroesSidepanel.scss';

const HeroesSidepanel = () => {
   const { data: heroes = [], isLoading } = useGetHeroesQuery();

   if (isLoading) {
      return <div className="heroes-sidepanel">Загрузка...</div>;
   }

   const totalHeroes = heroes.length;

   const elementCounts = heroes.reduce((acc, hero) => {
      const element = hero.element || 'unknown';
      acc[element] = (acc[element] || 0) + 1;
      return acc;
   }, {});

   return (
      <div className="heroes-sidepanel">
         <StatisticsPanel total={totalHeroes} stats={elementCounts} />
      </div>
   );
};

export default HeroesSidepanel;