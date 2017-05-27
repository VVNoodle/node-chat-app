const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should make message from args: from, text, and send createdAt',()=>{
    const test = generateMessage('Admin', 'hey this is a test');
    expect(test).toInclude({
      from: 'Admin',
      text: 'hey this is a test'
    });
    expect(test.createdAt).toBeA('number');
  });
});
