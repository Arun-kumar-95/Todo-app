const btns = document.querySelectorAll(".filterTodo");

Array.from(btns).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // tract the current active btn
    var current = document.getElementsByClassName("active");
    current[0].classList.remove("active");
    // add the active class to btn
    btn.classList.add("active");
  });
});

// delete todo
const deleteBtns = document.querySelectorAll('input[type="checkbox"]');

Array.from(deleteBtns).forEach((btn) => {
  btn.addEventListener("change", async (e) => {
    e.preventDefault();
    let btnid = btn.getAttribute("data-id");

    const data = {
      _id: btnid,
    };
    let Payload = JSON.stringify(data);
    const fetchResp = await fetch(`/todo/alltodos/${btnid}`, {
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
    messageHandler(success, message, "todo/alltodos");
  });
});

// signout

document.querySelector(".signout").addEventListener("click", async (e) => {
  e.preventDefault();

  const data = {
    isLoggedOut: true,
  };
  let Payload = JSON.stringify(data);
  const fetchResp = await fetch("/todo/alltodos/", {
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
  messageHandler(success, message, " ");
});
