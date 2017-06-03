var _ = require('lodash');

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name, room){
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  userValid(name){
    let check = this.users.filter((list)=>{
      return name === list.name;
    });
    if(check.length !== 0) return false;
    return true;
  }

  removeUser(id){
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((currUser)=>{
                  return currUser.id !== user.id;
                });
    }
    return user;
  }

  getUser(id){
    const uniqueUser = this.users.filter((user)=>user.id === id);
    return uniqueUser[0];
  }

  getUserList(room){
    let userList = this.users.filter((user)=>user.room === room);
    userList = userList.map((user)=> user.name);
    return userList;
  }

  getRoomList(){
    var rooms = this.users.map((user) => {
           return user.room;
       });
       rooms = _.uniq(rooms);
       console.log('rooms from users.js', rooms);
       return rooms;
  }
}

module.exports = {Users};
