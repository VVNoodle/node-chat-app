const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should return false when string is invalid', ()=>{
    const test = "             ";
    expect(isRealString(test)).toBe(false);
  });

  it('should return true when string is valid', ()=>{
    const test = "   valid";
    expect(isRealString(test)).toBe(true);
  });

  it('should reject non-string values', ()=>{
    const test = 3;
    expect(isRealString(test)).toBe(false);
  });
});
