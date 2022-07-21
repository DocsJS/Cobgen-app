export function setUser(state, payload) {
  localStorage.setItem('user', JSON.stringify(payload))
  state.user = payload
}

export function setJwt(state, payload) {
  localStorage.setItem('jwt', payload)
  state.jwt = payload
}

// clear storage and state
export function clearStorage(state) {
  localStorage.clear()
  state.user = null
  state.jwt = null
}