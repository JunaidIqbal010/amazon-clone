export function saveUserDetails(current_user) {
  localStorage.setItem("current_user", JSON.stringify(current_user));
}

export function saveCartDetails(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}