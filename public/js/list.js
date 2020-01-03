ready(() => {
  //document is ready, can execute code
  document.querySelector(".content").addEventListener("submit", onExerciseSubmit);
  document.querySelector(".back-btn").addEventListener("click", handleBackButton);
  fetchExerciseLog();
});

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function onExerciseSubmit(event) {
  event.preventDefault();
  const url = '/api/exercise/add';
  const userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
  const form = event.target;
  const input = form.querySelector('.form-input');
  if (input.value === '' || input.name !== 'desc') {
    input.value = '';
    input.blur();
    return;
  }

  let formData = {};
  formData[input.name] = input.value;
  formData['dur'] = 1;
  formData['userId'] = userId;

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
    } else {
      input.value = '';
      input.blur();
      let newLi = document.createElement('li');
      let parent = document.querySelector(".user-list");
      newLi.innerHTML = makeListItem(data._id, data.description);
      parent.insertBefore(newLi, parent.firstChild);
    }
  })
  .catch(err => {
    console.log(err);
  });
}

function handleBackButton(event) {
  window.history.back();
}

function fetchExerciseLog() {
  const userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
  const url = `/api/exercise/log?userId=${userId}`;
  const parent = document.querySelector(".content");
  const refNode = document.querySelector(".form-btns");
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    removeLoadingDiv();
    document.querySelector(".form-input").disabled = false;
    let newUl = document.createElement('ul');
    newUl.className = "user-list";
    data.log.forEach(item => {
      let newLi = document.createElement('li');
      newLi.setAttribute("data-id", item._id);
      newLi.innerHTML = makeListItem(item._id, item.description);
      newUl.appendChild(newLi);
    });
    parent.insertBefore(newUl, refNode);
  })
  .catch(err => {
    console.log(err);
  });
}

function removeLoadingDiv() {
  let elem = document.querySelector('.loading-spinner');
  elem.parentNode.removeChild(elem);
}

function makeListItem(exId, text) {
  return `<a class="list-link" href="/ex/${exId}"><span class="fas fa-user fa-2x"></span><div class="list-name">${text}</div></a>`;
}
