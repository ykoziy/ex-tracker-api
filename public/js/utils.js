export function showLoadingDiv() {
  const spinnerDoc = document.querySelector(".loading-spinner");
  spinnerDoc.style.display = "block";
  setTimeout(() => {
    spinnerDoc.style.display = "none";
    showErrorDiv();
  }, 15000);
}

export function hideLoadingDiv() {
  document.querySelector(".loading-spinner").style.display = "none";
}

export function showErrorDiv() {
  document.querySelector(".loading-error").style.display = "flex";
}

export function handlePageShow(event) {
  if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
    window.location.reload();
  }
}

export function userInputSetError(form, errorMsg) {
  let inputField = form.querySelector('.form-input');
  inputField.disabled = true;
  inputField.value = errorMsg;
  inputField.classList.add("form-input-error");
  setTimeout(() => {
    inputField.classList.remove("form-input-error");
    inputField.value = '';
    inputField.disabled = false;
  }, 1000)
}

export function handleBackButton(event) {
  window.history.back();
}
