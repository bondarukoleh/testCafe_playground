import {Selector, t} from "testcafe";

interface IHeaderFragment {
  logo?: null;
  prising?: null;
  transfer?: null;
  sell?: null;
  backorders?: null;
  auctions?: null;
  signIn?: null;
  support?: null;
}

class HeaderFragment {
  private rootElem: Selector = null;
  private logo: Selector = null;
  public prising: Selector = null;
  public transfer: Selector = null;
  public sell: Selector = null;
  public backorders: Selector = null;
  public auctions: Selector = null;
  public signIn: Selector = null;
  public support: Selector = null;

  constructor(root: string = '#header') {
    this.rootElem = Selector(root);
    this.logo = Selector('.logo')
    this.prising = Selector('a').withText('Pricing')
    this.transfer = Selector('a').withText('Transfer')
    this.sell = Selector('a').withText('Sell')
    this.backorders = Selector('a').withText('Backorders')
    this.auctions = Selector('a').withText('Auctions')
    this.signIn = Selector('a').withText('Sign In')
    this.support = Selector('a').withText('Support')
  }

  public async clickOn(data: IHeaderFragment) {
    for (const key of Object.keys(data)) {
      await t.click(this[key], data[key])
    }
  }
}

export {HeaderFragment, IHeaderFragment};
