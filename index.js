let userform = document.getElementById("formOfUser");

const getEntries = () => {
  let entries = sessionStorage.getItem("userEntries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

const displayEntries = () => {
  const entries = getEntries();
  const tableEntries = entries
    .map((entry) => {
      const namecell = `<td>${entry.name}</td>`;
      const emailcell = `<td>${entry.email}</td>`;
      const pswdcell = `<td>${entry.pswd}</td>`;
      const dobcell = `<td>${entry.dob}</td>`;
      const acceptTermscell = `<td>${entry.accepted ? "yes" : "no"}</td>`;

      const row = `<tr>
         
          ${namecell} ${emailcell}${pswdcell} ${dobcell} ${acceptTermscell}
        </tr>`;
      return row;
    })
    .join("\n");
  const table = `<table>
  <caption>Entries Table</caption>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Dob</th>
      <th>Accepted terms?</th>
    </tr>
    ${tableEntries}
  </table>`;
  let details = document.getElementById("user-Entries");
  details.innerHTML = table;
};

let userEntries = getEntries();

const dateIn = document.getElementById("dob");
dateIn.addEventListener("input", () => validate(dateIn));
const oldestDate = new Date("1969-09-12");
const latestDate = new Date("2006-09-11");

function validate(element) {
  const userDate = new Date(element.value);
  if (userDate < oldestDate || userDate > latestDate) {
    element.setCustomValidity(
      "date must be between 1969-09-12 and 2006-09-11 "
    );
  } else {
    element.setCustomValidity("");
  }
  element.reportValidity();
}

const saveForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("Name").value;
  const dob = document.getElementById("Dob").value;
  const email = document.getElementById("Email").value;
  const pswd = document.getElementById("Password").value;
  const accepted = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    dob,
    email,
    pswd,
    accepted,
  };
  userEntries.push(entry);
  sessionStorage.setItem("userEntries", JSON.stringify(userEntries));
  displayEntries();
};
userform.addEventListener("submit", saveForm);
displayEntries();
