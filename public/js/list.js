ready(() => {
  //document is ready, can execute code
  //document.querySelector(".content").addEventListener("submit", submitForm);
  fetchExerciseLog();
});

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

//example user id:    99kG29em
function fetchExerciseLog() {
  const userId = "99kG29em";
  const url = `http://localhost:3000/api/exercise/log?userId=${userId}`;
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