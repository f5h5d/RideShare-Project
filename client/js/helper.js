let globalVariables = {
  signedIn: false,
  email: '',
  fullName: ''
}


export const changeSignedIn = (value) => {
  globalVariables.signedIn = value
}

export const changeEmail = (value) => {
  globalVariables.email = value
}

export const changeFullName = (value) => {
  globalVariables.fullName = value
}

// const changeIsSignedIn = (value) => {
//   globalVariables.signedIn = value
// }

export default globalVariables;