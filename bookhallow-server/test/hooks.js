// // https://glebbahmutov.com/blog/mocha-and-sinon/
//
//
// const sinon = require('sinon');
//
//
// before(() => {
//   global.sandbox = sinon.createSandbox()
// })
// beforeEach(() => {
//   global.sandbox.restore()
// })
//
//
// exports.mochaHooks = {
//   afterEach() {
//     sinon.restore();
//   },
// };
