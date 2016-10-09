import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './Greeting';

// https://webpack.github.io/docs/hot-module-replacement-with-webpack.html#what-is-needed-to-use-it
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Greeting name="World?" />,
  document.getElementById('app')
);
