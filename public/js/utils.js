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
