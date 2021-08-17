"strict mode";

// const getUserData = function () {
//   fetch(`https://jsonplaceholder.typicode.com/users`)
//     .then((res) => res.json())
//     .then((users) => console.log(users));
// };

const userContainer = document.createElement("div");
userContainer.classList.add("row", "row-cols-2");
const dropDownOptions = document.getElementsByClassName("dropdown-item");
const userSearch = document.getElementById("userSearch");
// let usersArray = [];

const getUserData = async function () {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  let users = await res.json();
  usersArray = users;
  console.log(usersArray);
  displayUsers(usersArray);
  allowSelectOption();
  //   userSearch.onchange = filterUsers(this.value);
};

const displayUsers = function (usersArray) {
  for (i = 0; i < usersArray.length; i++) {
    createUserCards(usersArray[i]);
    console.log("created");
  }
  document.getElementsByTagName("body")[0].appendChild(userContainer);
};

const createUserCards = function (userObj) {
  let newUser = document.createElement("div");
  newUser.classList.add("card", "col", "m-4");
  newUser.innerHTML = `<ul class="list-group list-group-flush">
  <li class="list-group-item">${userObj.name}</li>
  <li class="list-group-item">${userObj.username}</li>
  <li class="list-group-item">${userObj.email}</li>
  <li class="list-group-item">${JSON.stringify(userObj.address)}</li>
</ul>`;
  userContainer.appendChild(newUser);
};

window.onload = () => {
  getUserData();
};

// dropDownOptions.forEach((option) => {
//   option.addEventListener("click", console.log(option.innerText));
// });

const allowSelectOption = function () {
  for (i = 0; i < dropDownOptions.length; i++) {
    dropDownOptions[i].addEventListener("click", (event) => {
      let selectedOption = event.target.closest(".dropdown-item").innerText;
      console.log(selectedOption);
      document.getElementById("selector-button").innerText = selectedOption;
    });
  }
};

const filterUsers = async function (query) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  let users = await res.json();
  usersArray = users;
  console.log(usersArray);
  let selectedOption = document
    .getElementById("selector-button")
    .innerText.toLowerCase();
  console.log(selectedOption);
  userContainer.innerHTML = "";
  let filteredUsers = usersArray.filter((user) =>
    user[selectedOption].toLowerCase().includes(query.toLowerCase())
  );
  console.log(filteredUsers);
  displayUsers(filteredUsers);
  //   if (query.length > 2 || query === "") {
  //     const filteredUsers = UsersArray.filter((book) =>
  //       book.title.toLowerCase().includes(query.toLowerCase())
  //     );
  //     console.log(filteredUsers);

  //
  //   }
};

const onlyTheNames = async function () {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  let users = await res.json();
  usersArray = users;

  userContainer.innerHTML = "";
  let listGroup = document.createElement("ul");
  listGroup.classList.add("list-group", "list-group-flush");
  for (i = 0; i < usersArray.length; i++) {
    let name = document.createElement("li");
    name.classList.add("list-group-item");
    name.innerText = `${usersArray[i].name}`;
    listGroup.appendChild(name);
  }
  userContainer.appendChild(listGroup);
};
