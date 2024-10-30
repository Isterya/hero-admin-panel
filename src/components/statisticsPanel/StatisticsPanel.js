import './statisticsPanel.scss';

const StatisticsPanel = ({ total, stats }) => {
   return (
      <div className="statistics-panel">
         <h3 className='statistics-panel__header'>Статистика героев</h3>
         <p className='statistics-panel__total'>Всего героев: {total}</p>
         <ul className='statistics-panel__list'>
            {Object.entries(stats).map(([element, count]) => (
               <li className='statistics-panel__elem' key={element}>
                  {element}: {count}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default StatisticsPanel;