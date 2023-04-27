import React from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const data = {
    filterByName: { name: '' },
    filterByNumericValues: [],
  };
  return (
    <DataContext.Provider value={ data }>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default DataProvider;
