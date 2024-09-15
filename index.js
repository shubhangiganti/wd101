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
      const pswdcell = `<td>${entry.password}</td>`;
      const dobcell = `<td>${entry.dob}</td>`;
      const acceptTermscell = `<td>${entry.acceptTerms ? "true" : "false"}</td>`;

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
const dateIn = document.getElementById("dob");
const oldestDate = new Date("1969-09-14");
const latestDate = new Date("2006-09-13");

function validate() {
  const userDate = new Date(dateIn.value);

  if (userDate < oldestDate || userDate > latestDate) {
    dateIn.setCustomValidity("date must be between 1969-09-12 and 2006-09-11 ");
    dateIn.reportValidity();
    return false;
  } else {
    dateIn.setCustomValidity("");
    return true;
  }
}

dateIn.addEventListener("input", () => validate(dateIn));

const saveForm = (event) => {
  event.preventDefault();
  /*const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = document.getElementById("email").value;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return; // Stop form submission
  }*/

  if (!validate()) {
    alert("Your age must be between 18 and 55.");
    return;
  }

  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    dob,
    email,
    password,
    acceptTerms,
  };
  let userEntries = getEntries();
  userEntries.push(entry);
  sessionStorage.setItem("userEntries", JSON.stringify(userEntries));
  displayEntries();
};
userform.addEventListener("submit", saveForm);
displayEntries();
