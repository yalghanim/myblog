import { extendObservable } from "mobx";

class myStore {
  constructor() {
      extendObservable(this, {
        authenticated: false,
        username: "",
        token: "",
      }
    )
  }
}
export default new myStore()
