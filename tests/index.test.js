import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as Utils from '../src/ui/utils/utils'

jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true },
);



describe('59934084', () => {
  it('should render', () => {
    let url = expect(Utils.getRebuildEngineUrl()).
      toBe("https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64");
  });

});


// describe('59934084', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<SomeComponent></SomeComponent>);
//   });
//   it('should render', () => {
//     expect(wrapper.exists).toBeTruthy();
//   });

//   it('should handle submit, set status to true', () => {
//     ipcRenderer.on.mockImplementationOnce((event, callback) => {
//       callback(event, 'success');
//     });
//     wrapper.find('form').simulate('submit');
//     expect(wrapper.state('status')).toBeTruthy();
//     expect(ipcRenderer.on).toBeCalledWith('asynchronous-reply', expect.any(Function));
//     expect(ipcRenderer.send).toBeCalledWith('update', 'value');
//   });
//   it('should handle submit without setting status to true', () => {
//     ipcRenderer.on.mockImplementationOnce((event, callback) => {
//       callback(event, 'failure');
//     });
//     wrapper.find('form').simulate('submit');
//     expect(wrapper.state('status')).toBeFalsy();
//     expect(ipcRenderer.on).toBeCalledWith('asynchronous-reply', expect.any(Function));
//     expect(ipcRenderer.send).toBeCalledWith('update', 'value');
//   });
// });
