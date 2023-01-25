const dateInput = (document.getElementById("date").value = datePattern);
// globals

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
        current.children[0].classList.remove("active");
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
  const _id = document.querySelector(".create_todo_wrapper").getAttribute("id");
  console.log(document.querySelector("#status").value);
  const data = {
    _id,
    todoTask: todoTask.value,
    date: date.value,
    category,
    isCompleted: document.querySelector("#status").value,
  };

  const Payload = JSON.stringify(data);

  const fetchResp = await fetch(`/todo/update/${_id}`, {
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
  messageHandler(success, message, "todo/alltodos");
});
