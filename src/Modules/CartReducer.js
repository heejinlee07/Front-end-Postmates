/* eslint-disable no-fallthrough */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable spaced-comment */

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_INSTRUCTION_TO_CART = 'ADD_INSTRUCTION_TO_CART';

//thunk 생성함수
// export const getOptions = () => async (dispatch) => {
//   dispatch({ type: GET_OPTIONS_LOADING });

//   try {
//     const options = await optionsApi.getOptions();
//     dispatch({ type: GET_OPTIONS_SUCCESS }, options);
//   } catch (e) {
//     dispatch({ type: GET_OPTIONS_ERROR, error: e });
//   }
// };

//초기상태
const initialState = {
  cart: [],
};

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const cartItem = state.cart.find(
        (item) => item.name === action.payload.name,
      );

      // TODO: option에 대한 분기처리 어떻게 할지?
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

    // special instruction -삭제 예정
    // case ADD_INSTRUCTION_TO_CART:
    //   return {
    //     ...state,
    //     cart: state.cart.map((item) => {
    //       if (item.name === action.payload.name) {
    //         return action.payload;
    //       }
    //       return cart;
    //     }),
    //   };

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
