// globals
const ownerForm = document.querySelector("form.owner-form");
const inputUser = document.querySelector('input[name="owner"]');
const todoTask = document.querySelector('input[name="todoTask"]');
const date = document.querySelector('input[name="date"]');

const todoBtn = document.querySelector("button.btnTodo");

// check if the input user is valid or not
ckeckUser();

function ckeckUser() {
  sessionStorage.getItem("user") != null;
  inputUser.value = sessionStorage.getItem("user");
}

inputUser.addEventListener("keyup", async (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    let name = e.target.value;

    // store the value in session
    if (sessionStorage.getItem("user") == null) {
      sessionStorage.setItem("user", name);
      return;
    }
    inputUser.value = sessionStorage.getItem("user");
  }
});

todoBtn.addEventListener("click", async () => {
  if (inputUser.value == "") {
    inputUser.focus();
    // throw empty field error and return
    messageHandler(false, "Enter your name", " ");
  }

  // else take input from create todo forms
  const data = {
    todoTask: todoTask.value,
    date: date.value,
    name: inputUser.value,
    category: "Busisness",
  };

  const Payload = JSON.stringify(data);

  const fetchResp = await fetch("/", {
    method: "POST",
    body: Payload,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  // converting into json
  const response = await fetchResp.json();
  const { success, message } = response;
  let path = " ";
  messageHandler(success, message, path);
});
