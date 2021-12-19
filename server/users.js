const users = [];

//Function to add user
const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and chatRoom are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };
  users.push(user);
  return { user };
};

//Function to remove user
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
};

//Get users
const getUser = (id) => users.find((user) => user.id === id);

//Get the users inn a chatroom
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };