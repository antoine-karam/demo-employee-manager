import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './app/app';
import store from './app/redux';
import ErrorBoundary from './app/pages/ErrorBoundary/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(process.env)
const client = new ApolloClient({
  uri: process.env.NX_BACK_END_URL, // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

root.render(
  <StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </ErrorBoundary>
  </StrictMode>
);
