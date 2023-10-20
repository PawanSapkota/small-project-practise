console.log("This is a note app");

const addBtn = document.querySelector(".add");

addBtn.addEventListener("click", () => {
  showNewNotes();
});

function showNewNotes() {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="notes">
        <div class="tools">
            <button class="edit  "><i class="fas fa-edit"></i></button>
            <button  class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main hidden"></div>         
        <textarea ></textarea>
    </div> `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn =note.querySelector(".delete");

  const textArea = note.querySelector("textarea");
  const main = note.querySelector(".main");

  editBtn.addEventListener("click", () => {
    textArea.classList.toggle("hidden");
    main.classList.toggle("hidden");
  });
  deleteBtn.addEventListener('click',()=>{
      note.remove();
  })

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);
  });

  document.body.appendChild(note);
}


