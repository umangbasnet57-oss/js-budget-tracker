const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const typeInput = document.getElementById("typeInput");
const addBtn = document.getElementById("addBtn");

const list = document.getElementById("list");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ---------- helpers ----------
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function render() {
  // reset UI
  list.innerHTML = "";
  let income = 0;
  let expense = 0;

  for (const t of transactions) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = `${t.desc} : $${t.amount} (${t.type})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "12px";

    // store id on elements so we can delete later
    li.dataset.id = t.id;

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  }

  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent = income - expense;
  const balanceBox = document.getElementById("balanceBox");
const bal = Number(balanceEl.textContent);

if (bal < 0) balanceBox.classList.add("negative");
else balanceBox.classList.remove("negative");
}

// ---------- events ----------
addBtn.addEventListener("click", function () {
  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (desc === "" || isNaN(amount) || amount <= 0) {
    alert("Enter valid description and amount");
    return;
  }

  const newTransaction = {
    id: Date.now().toString(),
    desc,
    amount,
    type,
  };

  transactions.push(newTransaction);
  saveTransactions();
  render();

  descInput.value = "";
  amountInput.value = "";
});

// event delegation for delete (works after refresh)
list.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.parentElement;
    const id = li.dataset.id;

    transactions = transactions.filter((t) => t.id !== id);
    saveTransactions();
    render();
  }
});

// initial load
render();
