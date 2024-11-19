// Pavel Martinez
//Final Project

//1.createElemWithText

const createElemWithText = (htmlElement = "p", textContent = "", className) => {
  let newElement = document.createElement(htmlElement);
  newElement.textContent = textContent;
  if (className) {
    newElement.className = className;
  }
  return newElement;
};

//2. createSelectOptions

const createSelectOptions = (users) => {
  if (!users) {
    return undefined;
  }

  const options = [];

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    options.push(option);
  });

  return options;
};
