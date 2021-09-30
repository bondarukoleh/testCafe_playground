import {HeaderFragment, IHeaderFragment} from '../fragments'
import {step} from '../../helpers/reportDecorators';

interface IHomePage {
  header: IHeaderFragment
}

class HomePage {
  public header = new HeaderFragment()

  @step('Click something on the page step')
  public async clickOn(data: IHomePage) {
    for (const key of Object.keys(data)) {
      await this[key].clickOn(data[key])
    }
  }

  @step('Get something from the page step')
  public async getSomething() {
    return {someData: 'data'}
    // throw Error('error from TEST getSomething method')
  }

  @step('Get something that can fail')
  public async getSomethingElse() {
    throw Error('error from TEST getSomethingElse method')
  }
}


export {HomePage, IHomePage}
