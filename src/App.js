import React, { useState, useEffect } from 'react';
import './App.css';
import DataProvider from './DataProvider';
// import DataContext from './DataProvider';

function useData(defaultValue) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  useEffect(() => {
    setLoading(true);
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((result) => {
        const infos = result.results.map((planetData) => {
          delete planetData.residents;
          return planetData;
        });
        setData(infos);
        setLoading(false);
      });
  }, []);
  return data;
}

const NO_RESULT = -1;

function App() {
  const data = useData([]);
  const [loading] = useState();
  const [filterKey, setFilterKey] = useState('');
  console.log(data);
  const nameFilter = (filterKey === '')
    ? data
    : data.filter((planet) => planet.name.toLocaleLowerCase()
      .search(filterKey.toLocaleLowerCase()) !== NO_RESULT);
  console.log(nameFilter);

  const handleType = ({ target }) => {
    setFilterKey(target.value);
  };

  return (
    <DataProvider>
      <input value={ filterKey } onChange={ handleType } data-testid="name-filter" />
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
            {nameFilter.map(((planet) => (
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
