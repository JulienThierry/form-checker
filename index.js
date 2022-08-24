const form = document.querySelector("form");

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;

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
    pseudo = null;
  } else if (!text.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = text;
  }
};

const emailChecker = (text) => {
  if (!text.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = text;
  }
};

const passwordChecker = (text) => {
  progressBar.classList = "";
  if (
    !text.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Le mot de passe doit contenir un minium de 8 caractère une majuscule, un caractère spécial et un chiffre"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (text.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = text;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = text;
  }
  if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (text) => {
  if (text !== password) {
    errorDisplay("confirm", "Les mots de passe ne correpondent pas");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo: pseudo,
      email: email,
      password: password,
    };
    console.log(data);

    inputs.forEach((input) => {
      input.value = "";
    });
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("inscription validée");
  } else {
    alert("Veuillez remplir correctement les champs");
  }
});
