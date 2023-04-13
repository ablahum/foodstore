// export function subtotal(items) {
// return items.reduce((acc, curr) => acc + curr.qty, 0);
// }

export const total = (items) => {
  return items.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
}
