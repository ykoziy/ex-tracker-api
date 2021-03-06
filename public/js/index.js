import {
  ready,
  showLoadingDiv,
  hideLoadingDiv,
  showErrorDiv,
  handlePageShow,
  userInputSetError
} from './utils.js';

ready(() => {
  window.addEventListener("pageshow", handlePageShow);
  document.querySelector(".content").addEventListener("submit", onUserSubmit);
  fetchUsers();
});

function onUserSubmit(event) {
  event.preventDefault();
  const url = '/api/exercise/new-user';
  const form = event.target;
  const input = form.querySelector('.form-input');
  if (input.value === '' || input.name !== 'username') {
    input.value = '';
    input.blur();
    return;
  }

  let formData = {};
  formData[input.name] = input.value;

  fetch(url, {
    method: "post",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.status === 400 || response.status === 200) {
      return response.json();
    }
    throw Error(response.statusText);
  })
  .then(data => {
    if (data['error']) {
      if (data.error === 'username taken') {
        userInputSetError(form, 'Username taken');
      }
    } else {
      input.value = '';
      input.blur();
      let newLi = document.createElement('li');
      let parent = document.querySelector(".user-list");
      newLi.innerHTML = makeListItem(data._id, data.username);
      parent.insertBefore(newLi, parent.firstChild);
    }
  })
  .catch(err => {
    console.log(err);
  });
}

function fetchUsers() {
  const url = '/api/exercise/users';
  const parent = document.querySelector(".content");
  showLoadingDiv();
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    hideLoadingDiv();
    document.querySelector(".form-input").disabled = false;
    let newUl = document.createElement('ul');
    newUl.className = "user-list";
    data.forEach(user => {
      let newLi = document.createElement('li');
      newLi.setAttribute("data-uid", user._id);
      newLi.innerHTML = makeListItem(user._id, user.username);
      newUl.appendChild(newLi);
    });
    parent.appendChild(newUl);
  })
  .catch(err => {
    hideLoadingDiv();
    showErrorDiv();
    console.log(err);
  });
}

function makeListItem(userId, userName) {
  return `<a class="list-link" href="/u/${userId}"><span class="fas fa-user fa-2x"></span><div class="list-name">${userName}</div></a>`;
}
