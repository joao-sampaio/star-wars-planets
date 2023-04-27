import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import DataProvider from './DataProvider';
import DataContext from './DataContext';

function useData(defaultValue) {
  const [data, setData] = useState(defaultValue);
  useEffect(() => {
    // Old api:
    // fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    // New api:
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((result) => {
        const infos = result.results.map((planetData) => {
          delete planetData.residents;
          return planetData;
        });
        setData(infos);
      });
  }, []);
  return data;
}

const NO_RESULT = -1;

function App() {
  const data = useData([]);
  const [loading] = useState();
  const [filterKey, setFilterKey] = useState('');

  const { filterByNumericValues } = useContext(DataContext);

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleType = ({ target }) => {
    setFilterKey(target.value);
  };

  const handleFilter = ({ target }) => {
    if (target.value !== '') {
      const newFilter = { ...filter };
      newFilter[target.name] = target.value;
      setFilter(newFilter);
    }
  };

  const getColumns = () => {
    const columns = ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'];
    filterByNumericValues.map((f) => {
      const index = columns.indexOf(f.column);
      columns.splice(index, 1);
      return 0;
    });
    return columns;
  };

  const addFilter = () => {
    if (getColumns().length >= 1) {
      const temp = filter;
      if (temp.value.length > 1) {
        temp.value = temp.value.slice(0, temp.value.length - 1);
      }
      filterByNumericValues.push(temp);
      setFilter({
        column: getColumns()[0],
        comparison: 'maior que',
        value: 0,
      });
    }
  };

  const removeFilter = ({ target }) => {
    let index = 0;
    let remove = 0;
    const column = target.name;
    filterByNumericValues.map((f) => {
      if (f.column === column) {
        remove = index;
      }
      index += 1;
      return 0;
    });
    filterByNumericValues.splice(remove, 1);
    setFilter({
      column: getColumns()[0],
      comparison: 'maior que',
      value: 0,
    });
  };
  const removeAllFilters = () => {
    for (let i = 0; i <= filterByNumericValues.length + 1; i += 1) {
      filterByNumericValues.pop();
    }
    setFilter({
      column: getColumns()[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  const getFilteredData = () => {
    const nameFilter = (filterKey === '')
      ? data
      : data.filter((planet) => planet.name.toLocaleLowerCase()
        .search(filterKey.toLocaleLowerCase()) !== NO_RESULT);
    let temp = [...nameFilter];
    filterByNumericValues.map((f) => {
      temp = temp.filter((planet) => {
        if (f.comparison === 'maior que') {
          return parseInt(planet[f.column], 10) > parseInt(f.value, 10);
        } if (f.comparison === 'menor que') {
          return parseInt(planet[f.column], 10) < parseInt(f.value, 10);
        }
        return parseInt(planet[f.column], 10) === parseInt(f.value, 10);
      });
      return 0;
    });
    return temp;
  };

  return (
    <DataProvider>
      <input value={ filterKey } onChange={ handleType } data-testid="name-filter" />
      <div>
        <select
          value={ filter.column }
          onChange={ handleFilter }
          name="column"
          data-testid="column-filter"
        >
          {getColumns().map((c) => <option key={ c }>{c}</option>)}
        </select>
        <select
          onChange={ handleFilter }
          name="comparison"
          data-testid="comparison-filter"
          value={ filter.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          value={ filter.value }
          onChange={ handleFilter }
          name="value"
          data-testid="value-filter"
          type="number"
        />
        <button
          onClick={ addFilter }
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
      <div>
        {filterByNumericValues.map((f) => (
          <div data-testid="filter" key={ f.column }>
            <text>{f.column}</text>
            <text>{f.comparison}</text>
            <text>{f.value}</text>
            <button onClick={ removeFilter } name={ f.column } type="button">X</button>
          </div>
        ))}
        <button
          onClick={ removeAllFilters }
          type="button"
          data-testid="button-remove-filters"
        >
          Remove All
        </button>
      </div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredData().map(((planet) => (// filteredData
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            )))}
          </tbody>
        </table>
      )}
    </DataProvider>
  );
}

export default App;
