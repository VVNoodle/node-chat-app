const expect = require('expect');

const {generateMessage, generateLocMsg} = require('./message');

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

describe('generateLocMsg', ()=>{
  it('should generate correct location object', ()=>{
    const test = generateLocMsg('Admin', 3, 3);
    expect(test).toInclude({
      from: 'Admin',
      url: 'https://www.google.com/maps/?q=3,3'
    });
    expect(test.createdAt).toBeA('number');
  });
});
