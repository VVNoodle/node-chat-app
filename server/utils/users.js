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
    const uniqueUser = this.users.filter((user)=> user.id === id);
    var i;
    for (i = 0; i < this.users.length; i++) {
      if(this.users[i] === uniqueUser[0]){
        break;
      }
    }
    this.users.splice(i, i);
    return uniqueUser[0];
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
}

module.exports = {Users};
