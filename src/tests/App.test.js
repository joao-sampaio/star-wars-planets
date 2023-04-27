import React from 'react';
import { findAllByRole, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('Testa se a tabela de dados existe', async () => {
  render(<App />);
  const planetName = await screen.findByText('Tatooine')
  const table = screen.getByRole('table')
  expect(table).toBeInTheDocument();
});

test('Testa o filtro de nome', async () => {
  render(<App />);
  const planetName = await screen.findByText('Tatooine')
  const input = screen.getByTestId('name-filter');
  userEvent.type(input, 'aa');
  expect(planetName).not.toBeInTheDocument();
});

test('Testa se é possivel adicionar e remover um filtro numerico', async () => {
  render(<App />);
  const planetName = await screen.findByText('Tatooine')
  const input = screen.getByTestId('value-filter');
  userEvent.type(input, '1000');
  const addBtn = screen.getByRole('button', {name: 'Filtrar'});
  userEvent.click(addBtn);
  const filter = await screen.findByTestId('filter');
  expect(filter).toBeInTheDocument();
  const removeBtn = screen.getByRole('button', {name: 'X'});
  userEvent.click(removeBtn);
  expect(filter).not.toBeInTheDocument();
});

test('Testa o botão que remove todos os filtros', async () => {
  render(<App />);
  const planetName = await screen.findByText('Tatooine')
  const input = screen.getByTestId('value-filter');
  userEvent.type(input, '1000');
  const addBtn = screen.getByRole('button', {name: 'Filtrar'});
  userEvent.click(addBtn);

  userEvent.type(input, '1000');
  userEvent.click(addBtn);

  let filter = await screen.findAllByTestId('filter');
  expect(filter.length).toBe(2);
  
  const removeBtn = screen.getByRole('button', {name: 'Remove All'});
  userEvent.click(removeBtn);
  
  expect(filter[0]).not.toBeInTheDocument();
  expect(filter[1]).not.toBeInTheDocument();
});

test('Testa os filtros numericos', async () => {
  render(<App />);
  const planetName = await screen.findByText('Tatooine')
  
  const column = screen.getByTestId('column-filter')
  userEvent.selectOptions(column, 'diameter')

  const comparison = screen.getByTestId('comparison-filter')
  userEvent.selectOptions(comparison, 'menor que')

  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '123456')

  const addBtn = screen.getByRole('button', {name: 'Filtrar'});
  userEvent.click(addBtn)

  userEvent.selectOptions(column, 'population')

  userEvent.selectOptions(comparison, 'igual a')

  userEvent.type(input, '654321')
  userEvent.click(addBtn)


  let rows = await screen.findAllByRole('row');
  
  expect(rows.length).toBe(1)

});

