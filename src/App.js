import React from 'react';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { Header } from './components/Header';
import { Favorites, Wishlist } from './pages/Favorites';
// Importam elementele necesare
import { useReducer } from 'react';
import { initialState, cartReducer } from './store/Cart/reducer';
import { CartContext } from './store/Cart/context';
import {
  initialState as themeInitialState,
  themeReducer,
} from './store/Theme/reducer';
import { ThemeContext } from './store/Theme/context';
import { FavoritesContext } from './store/Favorites/context';
import {
  initialState as favoritesInitialState,
  favoritesReducer,
} from './store/Favorites/reducer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: '/favorites',
    element: (
      <>
        <Header />
        <Favorites />
      </>
    ),
  },
]);

export default function App() {
  // Initializam reducerul pentru cart.
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // Initializam reducerul pentru tema.
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );
  // Cream valoarea pe care o vom pasa lui CartContext.Provider.
  const cartContextValue = {
    state,
    dispatch,
  };
  // Cream valoarea pe care o vom pasa lui ThemeContext.Provider.
  const themeContextValue = {
    themeState,
    themeDispatch,
  };
  const favoritesContextValue = {
    state: favoritesState,
    dispatch: favoritesDispatch,
  };

  return (
    // Facem dissponibile catre intreaga aplicatie state-urile globale, precum si functiile ce modifica state-urile globale.

    <CartContext.Provider value={cartContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <FavoritesContext.Provider value={favoritesContextValue}>
          <div className="App primary">
            <RouterProvider router={router} />
          </div>
        </FavoritesContext.Provider>
      </ThemeContext.Provider>
    </CartContext.Provider>
  );
}
