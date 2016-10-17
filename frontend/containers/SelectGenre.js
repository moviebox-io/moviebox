import React from 'react';
import { connect } from 'react-redux';
import { selectGenre } from '../actions';

let SelectGenre = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(selectGenre(input.value));
        input.value = '';
      }}>
        <input ref={node => {
          input = node;
        }} />
        <button type="submit">
          Filter by Genre
        </button>
      </form>
    </div>
  );
};

SelectGenre = connect()(SelectGenre);

export default SelectGenre;
