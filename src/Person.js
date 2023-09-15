export class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set department(arg) {
    this._department = arg;
  }

  get manager() {
    return this._department.manager;
  }
}
