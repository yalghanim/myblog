import { extendObservable } from "mobx";

class myStore {
  constructor() {
      extendObservable(this, {
        authenticated: false,
        username: "",
        token: "",
        editMode: false,
        alert: 0,
        detailMode: false,
      }
    )
  }
}
export default new myStore()
