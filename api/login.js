const users = [
  // OWNER
  { user: "34iett", pass: "mousab12", page: "owner.html", name: "WEB ISLEMCI" },
  { user: "duzce", pass: "1234", page: "owner.html", name: "Patron" },

  // HAREKET AMİRİ
  { user: "amiri1", pass: "1111", page: "amiri.html", name: "Hareket Amiri 1" },
  { user: "amiri2", pass: "2222", page: "amiri.html", name: "Hareket Amiri 2" },

  // ŞOFÖR
  { user: "sofor1", pass: "3333", page: "sofor.html", name: "Şoför 1" },
  { user: "sofor2", pass: "4444", page: "sofor.html", name: "Şoför 2" }
];

// users sadece ilk sefer localStorage'a yazılır
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  const msg = document.getElementById("msg");

  const usersLS = JSON.parse(localStorage.getItem("users")) || [];
  const found = usersLS.find(x => x.user === u && x.pass === p);

  if (found) {
    localStorage.setItem("aktifKullanici", JSON.stringify(found));
    window.location.href = found.page;
  } else {
    msg.innerText = "Hatalı giriş";
  }
}


