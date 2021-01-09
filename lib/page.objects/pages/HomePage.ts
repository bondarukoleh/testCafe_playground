import {HeaderFragment, IHeaderFragment} from '../fragments'

interface IHomePage {
  header: IHeaderFragment
}

class HomePage {
  public header = new HeaderFragment()

  public async clickOn(data: IHomePage) {
    for (const key of Object.keys(data)) {
      await this[key].clickOn(data[key])
    }
  }
}


export {HomePage, IHomePage}
