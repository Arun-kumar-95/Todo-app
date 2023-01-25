const errorWRAP = document.querySelector(".error__wrapper");
const errorDIV = errorWRAP.querySelector(".error__container");
const host = window.location.host;

// display error popup
const messageHandler = (status, message, path) => {
  errorWRAP.classList.add("active");

  errorDIV.children[1].textContent = message;
  if (status === true) {
    errorDIV.classList.add("success");
    errorDIV.children[0].classList.add("s-icon");
    setTimeout(function () {
      redirect(path);
    }, 1200);
  } else {
    errorDIV.classList.add("error");
    errorDIV.children[0].classList.add("e-icon");
  }

  setTimeout(function () {
    hideMessage(status);
  }, 2500);
};

const hideMessage = (status) => {
  errorWRAP.classList.remove("active");
  if (status === "success") {
    errorDIV.classList.remove("success");
    errorDIV.children[0].classList.remove("s-icon");
  } else {
    errorDIV.classList.remove("error");
    errorDIV.children[0].classList.remove("e-icon");
  }
};

const redirect = (path) => {
  window.location.href = `http://${host}/${path}`;
};
