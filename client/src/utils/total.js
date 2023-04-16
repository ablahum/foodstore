export const subTotal = (price, qty) => {
  return price * qty
}

export const total = (params) => {
  return params.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
}
