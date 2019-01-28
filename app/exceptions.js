
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
  })
}