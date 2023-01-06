import React from 'react';

import { Provider } from 'react-redux';
import Contact from './src/features/contact/Contact';

import { store } from './src/app/store';

function App() {
  return (
    <Provider store={store}>
      <Contact />
    </Provider>
  )
}

export default App;