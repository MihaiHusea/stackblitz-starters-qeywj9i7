export const initialState = {
  products: [],
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const favoriteProduct = state.products.some(
        (product) => product.id === action.payload.id
      );

      if (favoriteProduct) return state;        
      return {
        ...state,
        products: [
          ...state.products,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    }

    default:
      return state;
  }
}
