import React, { createContext } from 'react';
import PropTypes from 'prop-types';
// import DataContext from './DataContext';
// import  from 'react';

const DataContext = createContext([]);

const DataProvider = ({ children }) => {
  const data = [];
  return (
    <DataContext.Provider value={ data }>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DataProvider;
