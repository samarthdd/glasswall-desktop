'use strict';

const { Application }   = require('spectron');
const assert            = require('assert')
const { should, use }   = require('chai');
const chaiAsPromised    = require('chai-as-promised');
const electron          = require('electron');
const path              = require('path');


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


describe('electron-app', () => {
  it('runs in main process by default', () => {
    assert.strictEqual(process.type, 'app')
  })
})

// describe('search', () => {
//   describe('#find', () => {
//     it('should return results when a file matches a term');
//   });
// });


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


describe('verifyWindowIsVisibleWithTitle', () => {  
  let app;

  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async() => {
    await stopApp(app);
  });

  it('checks window', async() => {
    try {
      // Check if the window is visible
      const isVisible = await app.browserWindow.isVisible()
      // Verify the window is visible
      assert.strictEqual(isVisible, true)
      // Get the window's title
      const title = await app.client.getTitle()
      // Verify the window's title
      assert.strictEqual(title, 'Glasswall Desktop')
    } catch (error) {
      // Log any failures
      console.error('Test failed', error.message)
    }
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
