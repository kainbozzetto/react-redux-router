export function setName(name) {
  return {
    type: 'SET_NAME',
    payload: name,
  };
}

export function setEmail(email) {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
}
