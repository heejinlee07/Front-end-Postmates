/* eslint-disable no-fallthrough */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable spaced-comment */

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

//초기상태
const initialState = {
  store: {
    name: '',
    location: {
      lat: 0,
      lang: 0,
    },
  },
  cart: [],
  total: 0,
};

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const cartItem = state.cart.find(
        (item) => item.name === action.payload.name,
      );
      if (!cartItem) {
        return {
          ...state,
          cart: state.cart.concat(action.payload),
        };
      } else {
        if (cartItem.options.length !== action.payload.options.length) {
          return {
            ...state,
            cart: state.cart.concat(action.payload),
          };
        } else {
          let isInCart = true;

          cartItem.options.forEach((option, idx) => {
            if (option.id !== action.payload.options[idx]) {
              isInCart = false;
            }
          });

          if (!isInCart) {
            return {
              ...state,
              cart: state.cart.concat(action.payload),
            };
          } else {
            return {
              ...state,
              cart: state.cart.map((_cartItem) => {
                if (_cartItem.name === action.payload.name) {
                  return {
                    ..._cartItem,
                    count: _cartItem.count + action.payload.count,
                  };
                }
                return _cartItem;
              }),
            };
          }
        }
      }
    }

    case REMOVE_FROM_CART:
      console.log('WHAT IS THIS PAYLOAD', action.payload);
      return {
        ...state,
        cart: state.cart.filter((item) => item.name !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}
