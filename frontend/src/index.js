import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {thunk} from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer/rootReducer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import ChangePassword from './components/pages/common/changePassword/changePassword';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/changePassword',
        element: <ChangePassword />,
      },
      {
        path: '*',
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
]);


const store = createStore( rootReducer, applyMiddleware(thunk) )
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
