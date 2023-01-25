// globals
const inputUser = document.querySelector("span.username").textContent.trim();
const todoTask = document.querySelector('input[name="todoTask"]');
const date = document.querySelector('input[name="date"]');

const todoBtn = document.querySelector("button.btnTodo");
const categoryList = document.querySelectorAll("div.category");
let category;
let isChecked = false;

Array.from(categoryList).forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    let parent = e.target.parentNode;
    let color = e.target.getAttribute("data-color");
    category = e.target.getAttribute("data-category");

    if (
      e.target.classList.contains("btn") &&
      !parent.classList.contains("active")
    ) {
      let current = document.querySelector("div.category.active");
      if (current != null) {
        current.classList.remove("active");
        current.style.outline = "none";
        current.children[0].style.backgroundColor = "";
      }
      isChecked
        ? (e.target.style.backgroundColor = "")
        : (e.target.style.backgroundColor = color);

      parent.style.outline = `1px solid ${color}`;
      parent.classList.add("active");
    }
  });
});

todoBtn.addEventListener("click", async () => {
  // else take input from create todo forms
  const _id = document
    .querySelector(".owner__wrapper h1#owner_id")
    .getAttribute("data-id");

  const data = {
    _id,
    name: inputUser.value,
    todoTask: todoTask.value,
    date: date.value,
    category,
  };

  const Payload = JSON.stringify(data);

  const fetchResp = await fetch("/todo", {
    method: "POST",
    body: Payload,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  // converting into json
  const response = await fetchResp.json();
  console.log(response);
  const { success, message } = response;
  messageHandler(success, message, "todo");
});
