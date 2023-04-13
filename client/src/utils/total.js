const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = (params) => {
  if (regex.test(params)) {
    return true
  } else {
    return false
  }
}

// export function subtotal(items) {
// return items.reduce((acc, curr) => acc + curr.qty, 0);
// }

export const total = (items) => {
  return items.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
}
