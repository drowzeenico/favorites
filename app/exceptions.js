
module.exports = {
  fieldIsRequired: e => ({
    name: 'fieldIsRequired',
    status: 422,
    message: 'This field is required',
    payload: e
  }),

  passwordsAreMismatched: e => ({
    name: 'passwordsAreMismatched',
    status: 400,
    message: 'Passwords are mismatched',
    payload: e
  }),

  SequelizeUniqueConstraintError: e => ({
    name: 'SequelizeUniqueConstraintError',
    status: 422,
    message: e.errors[0].message,
    payload: e
  }),

  unhundledError: (e, msg = 'Unknown error', status = 400) => ({
    name: 'unhundledError',
    status: status,
    message: msg,
    payload: e
  }),

  userNotFound: (e) => ({
    name: 'userNotFound',
    status: 404,
    message: 'User not found'
  }),

  authentificationFailed: (e) => ({
    name: 'authentificationFailed',
    status: 401,
    message: 'Authentification failed',
    payload: e
  }),
}