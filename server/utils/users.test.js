const expect = require('expect');

var {Users} = require('./users');

describe('Users', ()=>{
  var usersTest;
  beforeEach(()=>{
    usersTest = new Users();
    usersTest.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node'
    },{
      id: '2',
      name: 'Michael',
      room: 'javaScript'
    },{
      id: '3',
      name: 'Miguel',
      room: 'Node'
    }]
  });

  it('should be able to add user (addUser)', ()=>{
    let test = new Users();
    test.addUser('2', 'Egan', 'webdev');
    expect(test.users[0]).toInclude({
      id: 2,
      name: 'Egan',
      room: 'webdev'
    });
  });

  it('should be able to find user by ID (getUser(id))', ()=>{
    let test = usersTest.getUser('2');
    expect(test).toEqual({
      id: '2',
      name: 'Michael',
      room: 'javaScript'
    });
  });

  it('should not find user(getUser(id))', ()=>{
    let test = usersTest.getUser('1337');
    expect(test).toNotExist();
  });

  it('should be able to remove user by ID (removeUser(id))', ()=>{
    let test = usersTest.removeUser('2');
    expect(test.id).toBe('2');
    expect(usersTest.users.length).toBe(2);
    expect(usersTest.getUser('2')).toNotExist();
  });

  it('should NOT be able to remove user by invalid ID (removeUser(id))', ()=>{
    let test = usersTest.removeUser('1337');
    expect(test).toNotExist();
    expect(usersTest.users.length).toBe(3);
  });

  it('should be able to list usernames in the room of choice (getUserList(room))', ()=>{
    let list = usersTest.getUserList('Node');
    expect(list).toEqual([usersTest.users[0].name,usersTest.users[2].name]);
  });

});
