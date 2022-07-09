import { createContext } from 'react';

const DataContext = createContext({
  filterByName: { name: '' },
  filterByNumericValues: [],
});

export default DataContext;
