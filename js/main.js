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

//3. toggleCommentSection

const toggleCommentSection = (postId) => {
  if (!postId) {
    return undefined;
  }
  const section = document.querySelector(`section[data-post-id="${postId}"]`);

  if (!section) {
    return null;
  }
  section.classList.toggle("hide");

  return section;
};

//4.toggleCommentButton
const toggleCommentButton = (postId) => {
  if (!postId) {
    return undefined;
  }
  const button = document.querySelector(`button[data-post-id="${postId}"]`);
  if (!button) {
    return null;
  }

  button.textContent =
    button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";

  return button;
};
