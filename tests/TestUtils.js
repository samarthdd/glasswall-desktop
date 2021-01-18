const { Application }  = require('spectron');
const { should, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const electron = require('electron');
const path = require('path');

global.before(() => {
  should();
  use(chaiAsPromised);
});

async function startApp() {
  const app = new Application({
    path: electron,
    args: [path.join(__dirname, '..')]
  })
  chaiAsPromised.transferPromiseness = app.transferPromiseness;
  return app.start();
}

async function stopApp(app) {
  if (app && app.isRunning()) {
    await app.stop();
  }
}

describe('Check Window Count', () => {  
  let app;

  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async() => {
    await stopApp(app);
  });

  it('opens a window', async() => {
    app.client.waitUntilWindowLoaded()
    app.client.getWindowCount()
      .should.eventually.equal(1);
  });

});


describe('Check app visibility', () => {  
  let app;

  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async() => {
    await stopApp(app);
  });

  it('checks window', async() => {
    app.client.waitUntilWindowLoaded()
    app.client.browserWindow.isMinimized().should.eventually.be.false;
    app.client.browserWindow.isVisible().should.eventually.be.true;
  });

});


describe('Check window height and width', () => {  
  let app;

  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async() => {
    await stopApp(app);
  });

  it('checks height and width of window', async() => {
    app.client.waitUntilWindowLoaded()
    app.client.browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0);
    app.client.browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0);
    
  });

});
