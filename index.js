const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

const errorDisplay = (tag, msg, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = msg;
  } else {
    container.classList.remove("error");
    span.textContent = msg;
  }
};

const pseudoChecker = (text) => {
  if (text.length > 0 && (text.length < 3 || text.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
  } else if (!text.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
  } else {
    errorDisplay("pseudo", "", true);
  }
};

const emailChecker = (text) => {};

const passwordChecker = (text) => {};

const confirmChecker = (text) => {};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;

      case "email":
        emailChecker(e.target.value);
        break;

      case "password":
        passwordChecker(e.target.value);
        break;

      case "confirm":
        confirmChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});
