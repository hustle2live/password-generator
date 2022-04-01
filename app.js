const passwordElem = document.getElementById("password"),
  lengthElem = document.querySelector("#length"),
  lengthTextElem = document.querySelector("#lengthText"),
  copyButtonElem = document.querySelector(".copy"),
  copyButtonTextElem = document.querySelector(".copy span");

const checkboxes = document.querySelectorAll("input[type=checkbox]");

const characters = {
  symbols: "!@#$%^&*(){}[]=<>/,.",
  similar: "il1Lo0O",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789"
};

const generatePassword = () => {
  const passwordArray = [];
  const lengthRequired = +lengthElem.value;
  const options = Array.from(checkboxes);

  const noOptionsChecked = options.every((option) => !option.checked);

  hideCopiedMessage();

  if (noOptionsChecked) {
    passwordElem.value = "select an option";
  } else {
    while (passwordArray.length < lengthRequired) {
      for (const i in checkboxes) {
        if (checkboxes[i].checked)
          passwordArray.push(getRandomCharacter(checkboxes[i].name));
      }
    }

    const shuffledFinalPassword = passwordArray
      .sort((a, b) => 0.5 - Math.random())
      .join("")
      .slice(0, lengthRequired);

    passwordElem.value = shuffledFinalPassword;
  }

  lengthTextElem.textContent = lengthElem.value;
};

const getRandomCharacter = (optionName) => {
  return characters[optionName][
    Math.floor(Math.random() * characters[optionName].length)
  ];
};

const showCopiedMessage = () => (copyButtonTextElem.style.display = "block");
const hideCopiedMessage = () => (copyButtonTextElem.style.display = "none");

copyButtonElem.addEventListener("click", () => {
  const input = passwordElem.value;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(input);
  showCopiedMessage();
});

lengthElem.addEventListener("input", generatePassword);
