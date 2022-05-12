export const initialState = {
  cart: [],
  current_user: null,
};

if(localStorage.getItem('cart')) {
  initialState.cart = JSON.parse(localStorage.getItem('cart'));
}

if(localStorage.getItem('current_user')) {
  initialState.current_user = JSON.parse(localStorage.getItem('current_user'));
}

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const cart_index = state.cart.findIndex(cartItem => cartItem.id === action.item.id);
      let update_cart =[...state.cart]
      if (cart_index >= 0) {
        console.log(update_cart)
        update_cart[cart_index].quantity = action.item.quantity;
        console.log("update---->", update_cart)
      }else{
        update_cart = [...state.cart, action.item]
        console.log("Initial cart", update_cart)
      }
      localStorage.setItem("cart", JSON.stringify(update_cart));
      return {
        ...state,
        cart: update_cart,
      };

    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];
      if(index >= 0){
        newCart.splice(index,1)
      }else{
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in the cart.`
        )
      }
      return{
        ...state,
        cart: newCart
      }
    
    case "SET_USER":
      return {
        ...state,
        current_user: action.user
      }

    case "SIGN_OUT":
      return {
        ...state,
        current_user: null,
        cart: []
      }

    case "EMPTY_CART":
      return {
        ...state,
        cart: []
      }

    default:
      return state;
  }
}

export default reducer;