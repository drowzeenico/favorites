
class BaseForm {
  constructor (data) {
    this.valid = true;
    this.error = null;

    this.data = data
  }

  validate() {
    return true;
  }


  build() {
    return this.data;
  }
}

module.exports = BaseForm;