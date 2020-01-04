ready(() => {
  //document is ready, can execute code
  document.querySelector(".content").addEventListener("submit", onExerciseSubmit);
  document.querySelector(".back-btn").addEventListener("click", handleBackButton);
  fetchExerciseEntry();
});

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function fetchExerciseEntry() {
  const exId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
  const url = `/api/exercise/entry?exId=${exId}`;
  const inputs = document.querySelectorAll(".form-input");
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    inputs.forEach( item => {
      switch (item.name) {
        case 'date':
          item.valueAsDate = new Date(data.date);
          break;
        case 'dur':
          item.value = data.duration;
          break;
        case 'desc':
          item.value = data.description;
          break;
        default:
          break;
      }
    });
    removeLoadingDiv();
    document.querySelector(".edit-ex-form").style.display = "block";
  })
  .catch(err => {
    console.log(err);
  });
}

function onExerciseSubmit(event) {
  event.preventDefault();
  const url = '/api/exercise/edit';
  const exId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
  const form = event.target;
  const input = form.querySelectorAll('.form-input');

  let formData = {};
  formData['exId'] = exId;
  input.forEach(item => {
    formData[item.name] = item.value;
  });

  fetch(url, {
    method: "put",
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
      console.log('Something went wrong');
    }
  })
  .catch(err => {
    console.log(err);
  });
}

function handleBackButton(event) {
  window.history.back();
}

function removeLoadingDiv() {
  let elem = document.querySelector('.loading-spinner');
  elem.parentNode.removeChild(elem);
}
