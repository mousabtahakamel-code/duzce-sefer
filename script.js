// İlk kurulum
if (!localStorage.users) {
  localStorage.users = JSON.stringify([
    {username:"34iett", password:"pogba", role:"owner", messages:[]},
    {username:"amir", password:"123", role:"amir", messages:[]},
    {username:"sofor", password:"123", role:"sofor", messages:[]}
  ]);
  localStorage.assignments = JSON.stringify([]);
}

let currentUser = null;

const getUsers = () => JSON.parse(localStorage.users);
const saveUsers = u => localStorage.users = JSON.stringify(u);
const getAssignments = () => JSON.parse(localStorage.assignments);
const saveAssignments = a => localStorage.assignments = JSON.stringify(a);

// LOGIN
function login(){
  const u = loginUser.value;
  const p = loginPass.value;
  const user = getUsers().find(x => x.username===u && x.password===p);
  if(!user) return loginMsg.innerText="Hatalı giriş";

  currentUser = user;
  loginDiv.classList.add("hidden");
  document.getElementById(user.role+"Panel").classList.remove("hidden");

  if(user.role==="amir") loadSofors();
  if(user.role==="sofor") loadSoforPanel();
}

// LOGOUT
function logout(){
  currentUser = null;
  document.querySelectorAll(".panel").forEach(p=>p.classList.add("hidden"));
  loginDiv.classList.remove("hidden");
}

// OWNER
function addUser(){
  let users = getUsers();
  users.push({
    username:addUserName.value,
    password:addUserPass.value,
    role:addUserRole.value,
    messages:[]
  });
  saveUsers(users);
  alert("Hesap eklendi");
}

function removeUser(){
  let users = getUsers().filter(u => u.username !== removeUserName.value);
  saveUsers(users);
  alert("Hesap silindi");
}

function changePassword(){
  let users = getUsers();
  let u = users.find(x=>x.username===changeUserName.value);
  if(!u) return alert("Kullanıcı yok");
  u.password = changeUserPass.value;
  saveUsers(users);
  alert("Şifre değişti");
}

function sendMessage(){
  let users = getUsers();
  users.forEach(u=>{
    if(u.role!=="owner"){
      u.messages.push({
        text: ownerMessage.value,
        date: new Date().toLocaleString()
      });
    }
  });
  saveUsers(users);
  alert("Mesaj gönderildi");
}

// AMİR
function loadSofors(){
  soforSelect.innerHTML="";
  getUsers().filter(u=>u.role==="sofor").forEach(s=>{
    soforSelect.innerHTML += `<option>${s.username}</option>`;
  });
}

function assign(){
  let a = getAssignments().filter(x=>x.sofor!==soforSelect.value);
  a.push({
    sofor: soforSelect.value,
    hat: hatSelect.value,
    arac: aracSelect.value
  });
  saveAssignments(a);
  renderAssignments();
}

function renderAssignments(){
  assignList.innerHTML="";
  getAssignments().forEach(a=>{
    assignList.innerHTML += `${a.sofor} → ${a.arac} | ${a.hat}<br>`;
  });
}

// ŞOFÖR
function loadSoforPanel(){
  const users = getUsers();
  const user = users.find(u=>u.username===currentUser.username);
  const a = getAssignments().find(x=>x.sofor===user.username);

  soforInfo.innerHTML = a ? `${a.arac}<br>${a.hat}` : "Atama yok";

  soforMessages.innerHTML="";
  user.messages.forEach(m=>{
    soforMessages.innerHTML += `[${m.date}] ${m.text}<br>`;
  });
}

