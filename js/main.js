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

//5. deleteChildElements

const deleteChildElements = (parentElement) => {
  if (!(parentElement instanceof HTMLElement)) {
    return undefined;
  }
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }

  return parentElement;
};

//6. addButtonListeners

const addButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");

  if (buttons.length > 0) {
    buttons.forEach((button) => {
      const postId = button.dataset.postId;
      if (postId) {
        button.addEventListener("click", (event) => {
          toggleComments(event, postId);
        });
      }
    });
  }
  return buttons;
};

//7. removeButtonListeners

const removeButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");
  buttons.forEach((button) => {
    const postId = button.dataset.postId;
    if (postId) {
      button.removeEventListener("click", (event) => {
        toggleComments(event, postId);
      });
    }
  });
  return buttons;
};

// 8. createComments

const createComments = (comments) => {
  if (!comments) {
    return undefined;
  }

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const article = document.createElement("article");
    const h3 = createElemWithText("h3", comment.name);
    const pBody = createElemWithText("p", comment.body);
    const pEmail = createElemWithText("p", `From: ${comment.email}`);
    article.append(h3);
    article.append(pBody);
    article.append(pEmail);
    fragment.append(article);
  });
  return fragment;
};

// 9. populateSelectMenu

const populateSelectMenu = (users) => {
  if (!users) {
    return undefined;
  }
  const selectMenu = document.querySelector("#selectMenu");
  const options = createSelectOptions(users);
  options.forEach((option) => {
    selectMenu.appendChild(option);
  });
  return selectMenu;
};

// 10. getUsers
const getUsers = async () => {
  try {
    const userDataResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const jsonUserData = await userDataResponse.json();
    return jsonUserData;
  } catch (err) {
    console.error(err.stack);
  }
};

// 11. getUserPosts
const getUserPosts = async (userId) => {
  if (!userId) {
    return undefined;
  }
  try {
    const userDataResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const jsonUserPosts = await userDataResponse.json();
    return jsonUserPosts;
  } catch (err) {
    console.error(err.stack);
  }
};

// 12. getUser
const getUser = async (userId) => {
  if (!userId) {
    return undefined;
  }
  try {
    const userDataResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const jsonUser = await userDataResponse.json();
    return jsonUser;
  } catch (err) {
    console.error(err.stack);
  }
};

// 13. getPostComments
const getPostComments = async (postId) => {
  if (!postId) {
    return undefined;
  }
  try {
    const userDataResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const jsonUserPostComments = await userDataResponse.json();
    return jsonUserPostComments;
  } catch (err) {
    console.error(err.stack);
  }
};

// 14. displayComments
const displayComments = async (postId) => {
  if (!postId) {
    return undefined;
  }
  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.appendChild(fragment);
  return section;
};

// 15. createPosts
const createPosts = async (posts) => {
  if (!posts) {
    return undefined;
  }
  const fragment = document.createDocumentFragment();
  for (const post of posts) {
    const article = document.createElement("article");
    const h2 = createElemWithText("h2", post.title);
    const pBody = createElemWithText("p", post.body);
    const pUserId = createElemWithText("p", `Post ID: ${post.id}`);
    const author = await getUser(post.userId);
    const pAuthor = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    const pCatchPrase = createElemWithText("p", author.company.catchPhrase);
    const button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;
    const section = await displayComments(post.id);
    article.append(h2);
    article.append(pBody);
    article.append(pUserId);
    article.append(pAuthor);
    article.append(pCatchPrase);
    article.append(button);
    article.append(section);
    fragment.append(article);
  }
  return fragment;
};

//16. displayPosts
const displayPosts = async (posts) => {
  const main = document.querySelector("main");

  let pElement = posts
    ? await createPosts(posts)
    : createElemWithText(
        "p",
        "Select an Employee to display their posts.",
        "default-text"
      );

  main.append(pElement);
  return pElement;
};

// 17. toggleComments

const toggleComments = (event, postId) => {
  if (!(event || postId)) {
    return undefined;
  }
  event.target.listener = true;
  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  return [section, button];
};

//18 refreshPosts
const refreshPosts = async (posts) => {
  if (!posts) {
    return undefined;
  }
  const removeButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector("main"));
  const fragment = await displayPosts(posts);
  const addButtons = addButtonListeners();
  return [removeButtons, main, fragment, addButtons];
};
