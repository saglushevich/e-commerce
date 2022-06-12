import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import { ApolloProvider } from "@apollo/client"
import { client } from './apolloClient/apolloClient';
import { Provider } from 'react-redux';
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <App />
          </Provider>
      </ApolloProvider>
    </React.StrictMode>
);