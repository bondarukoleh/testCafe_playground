import {RequestLogger} from 'testcafe';

const cookieIntercept = RequestLogger({url: /cookies/, method: 'post'}, {logResponseHeaders: true});

const getCookieFromHeader = (headers: object): string => {
  const allCookie = headers['set-cookie'][0];
  const profileCookieStr = allCookie.split(';')[0]
  if(!profileCookieStr.length || !profileCookieStr.includes('some_cookie_header')) {
    throw new Error(`No needed cookies here "${allCookie}"`)
  }
  return profileCookieStr.split('=')[1];
}

fixture`Some flow`
test.requestHooks(cookieIntercept)('Test with intercept', async t => {
  const cookieValue = getCookieFromHeader(await cookieIntercept.requests[0].response.headers)
  console.log(`Cookie value ${cookieValue}`);
})
