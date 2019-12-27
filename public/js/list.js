ready(() => {
  //document is ready, can execute code
  //document.querySelector(".content").addEventListener("submit", submitForm);
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
