import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

it('renders without crashing', async() => {
  var mock = new MockAdapter(axios);
  mock.onGet('/api/values/current').reply(200, { '5': '8' });
  mock.onGet('/api/values/all').reply(200, [{ 'number': '5' }]);

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  await timeout(2000);
  ReactDOM.unmountComponentAtNode(div);
});
