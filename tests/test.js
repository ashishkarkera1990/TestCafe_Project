import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
fixture("Regression Test")
    .page("https://google.com");

test("Testcase 1", async t => {

    await t
        .maximizeWindow()
        .typeText('#APjFqb', 'Learning testCafe')
        .click('.CcAdNb')
        //.resizeWindow(400,800)

})

test("Testcase 2", async t => {

    await t 
    .click('.MV3Tnb')
    .click('[data-g-action="products"]')
    .wait(2000)

})

fixture("TestController.scrollIntoView")
    .page`https://devexpress.github.io/testcafe/example/`;

test('Scroll element into view', async t => {
    
    const target = Selector('#submit-button');
    await t
    .maximizeWindow()
    .wait(4000)
    .scrollIntoView(target)
    .wait(4000)
});

fixture("TestController.scroll")
    .page`https://devexpress.github.io/testcafe/example/`;

test('Scroll the container', async t => {
    const container = Selector('#submit-button')
    await t
    .maximizeWindow()
    .wait(4000)
    .scroll(container, 'bottomRight')
    .wait(4000)
});

fixture ("TestController.setTestSpeed")
    .page`https://devexpress.github.io/testcafe/example/`;

const nameInput = Selector('#developer-name');

test('Test Speed', async t => {
    await t
        .maximizeWindow()
        .typeText(nameInput, 'Peter')
        .setTestSpeed(0.1)
        .wait(4000)
        .typeText(nameInput, ' Parker');
});

fixture ("TestController.takeScreenshot")
    .page`https://devexpress.github.io/testcafe/example/`;

test('Take a screenshot of a fieldset', async t => {
    await t
        .typeText('#developer-name', 'Peter Parker')
        .click('#submit-button')
        .takeScreenshot({
            path:     '.Screenshot/thank-you-page.png',
            fullPage: true,
        });
});

fixture ("TestController.switchToWindow")
    .page('https://devexpress.github.io/testcafe/');

test('Switch to a different window', async t => {
    const homepage      = await t.getCurrentWindow();
    const documentation = await t.openWindow('https://devexpress.github.io/testcafe/documentation');
    await t.switchToWindow(homepage)
        .switchToWindow(documentation)
}).skipJsErrors();

fixture ("TestController.switchToIframe")
    .page`https://demo.automationtesting.in/Frames.html`;

test('Switching to an iframe', async t => {
    const getLocation = ClientFunction(() => window.location.hostname);
    console.log('getLocation To Be   -- ' + getLocation);

    // NOTE: the ClientFunction will be executed in TOP window's context
   //await t.expect(getLocation()).eql('www.devexpress.com');

    await t
    //Element is invisible
        //.click('#TOCChatLink')
        .switchToIframe('#singleframe')
        //.typeText('#name', 'My name');

    // NOTE: the ClientFunction will be executed in IFRAME window's context
    //await t.expect(getLocation()).eql('secure.livechatinc.com');*/
}).skipJsErrors();

fixture("[API] Get Cookies")
    .page('https://devexpress.github.io/testcafe/example/');

test('Should retrieve a cookie by name', async t => {
    //set a cookie for the Example page
    await t.setCookies({ name: 'apiCookie1', value: 'value1' });

    //retrieve the named cookie from any of the tested pages
    const cookies = await t.getCookies('apiCookie1');
    const { name, value } = cookies[0];

    await t
        .expect(name).eql('apiCookie1')
        .expect(value).eql('value1');
});

fixture.only ("[API] Set Cookies")
    .page('https://devexpress.github.io/testcafe/example/');

test('Should set cookies by name and value', async t => {
    await t.setCookies({ apiCookie1: 'value1' }, 'http://localhost');

    const cookies = await t.getCookies();

    const { name, value, domain, path } = cookies[0];

    await t
        .expect(name).eql('apiCookie1')
        .expect(value).eql('value1')
        .expect(domain).eql('localhost')
        .expect(path).eql('/');
});