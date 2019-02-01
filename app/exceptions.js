
module.exports = {
  fieldIsRequired: e => ({
    status: 422,
    message: 'This field is required',
    payload: e
  }),

  passwordsAreMismatched: e => ({
    status: 400,
    message: 'Passwords are mismatched',
    payload: e
  }),

  SequelizeUniqueConstraintError: e => ({
    status: 422,
    message: e.errors[0].message,
    payload: e
  }),

  unhundledError: (e, msg = 'Unknown error') => ({
    status: 400,
    message: msg,
    payload: e
  })
}