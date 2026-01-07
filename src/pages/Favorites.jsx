import React from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { FavoritesContext } from '../store/Favorites/context';
import { removeFromFavorites } from '../store/Favorites/actions';
import { addToCart } from '../store/Cart/actions';
import { CartContext } from '../store/Cart/context';

export function Favorites() {
  const { state: favoritesState, dispatch: favoritesDispatch } =
    useContext(FavoritesContext);
  const { dispatch: cartDispatch } = useContext(CartContext);

  function handleFavoritesRemove(id) {
    const actionResult = removeFromFavorites(id);
    favoritesDispatch(actionResult);
  }

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    cartDispatch(actionResult);
  }

  return (
    <div className="mx-2">
      {favoritesState.products.length === 0 ? (
        <p>Nu ai produse favorite.</p>
      ) : (
        favoritesState.products.map((product) => {
          const totalProductPrice = product.price * product.quantity;
          return (
            <div key={product.id} className="m-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <img src={product.image} alt="" />
                <strong>{product.name}</strong>
                <p>{product.price}$</p>
              </div>
              <Button
                variant="success"
                onClick={() => {
                  handleAddToCart({
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                  });
                }}
              >
                Adaugă în coș
              </Button>
              <Button
                variant="danger"
                onClick={() => handleFavoritesRemove(product.id)}
              >
                Șterge
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}
