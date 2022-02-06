import ReactDOM from 'react-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import './styles/global.scss';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom";
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

ReactDOM.render(
  <Router>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </Router>,
  document.getElementById('root')
);
