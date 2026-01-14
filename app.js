// ===============================
// SUPABASE AYARLARI
// ===============================
const SUPABASE_URL = "https://asbuijksydmwlpinbjcn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYnVpamtzeWRtd2xwaW5iamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODMzNzUsImV4cCI6MjA4Mzg1OTM3NX0.naOIIqO9WFjOhFmzNJT0orx1N5TBP_tcGV70W1Iak70";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===============================
// GİRİŞ FONKSİYONU
// ===============================
async function login() {
  const usernameInput = document.getElementById("username");
  const pinInput = document.getElementById("pin");
  const msg = document.getElementById("msg");

  // EMNİYET
  if (!usernameInput || !pinInput) {
    alert("INPUT BULUNAMADI");
    return;
  }

  const username = usernameInput.value.trim();
  const pin = pinInput.value.trim();

  if (username === "" || pin === "") {
    msg.innerText = "Kullanıcı adı ve PIN gir ❌";
    return;
  }

  msg.innerText = "Kontrol ediliyor...";

  // SUPABASE SORGUSU
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("pin", pin)
    .limit(1);

  if (error) {
    console.error(error);
    msg.innerText = "Sunucu hatası ❌";
    return;
  }

  if (!data || data.length === 0) {
    msg.innerText = "Hatalı giriş ❌";
    return;
  }

  const user = data[0];

  // OTURUM KAYDET
  localStorage.setItem("activeUser", JSON.stringify(user));

  // ROLE GÖRE YÖNLENDİR
  if (user.role === "amir") {
    window.location.href = "amir.html";
  } else if (user.role === "sofor") {
    window.location.href = "sofor.html";
  } else {
    msg.innerText = "Rol tanımsız ❌";
  }
}

// ===============================
// SAYFA KORUMA (AMİR / ŞOFÖR)
// ===============================
function protectPage(expectedRole) {
  const raw = localStorage.getItem("activeUser");
  if (!raw) {
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(raw);
  if (user.role !== expectedRole) {
    window.location.href = "index.html";
  }
}

// ===============================
// ÇIKIŞ
// ===============================
function logout() {
  localStorage.removeItem("activeUser");
  window.location.href = "index.html";
}

// ===============================
// ŞOFÖR SEFERLERİNİ YÜKLE
// ===============================
async function loadSoforSeferleri() {
  const raw = localStorage.getItem("activeUser");
  if (!raw) return;

  const user = JSON.parse(raw);

  const { data } = await supabaseClient
    .from("seferler")
    .select("*")
    .eq("sofor_username", user.username)
    .order("created_at", { ascending: false });

  const liste = document.getElementById("liste");
  if (!liste) return;

  liste.innerHTML = "";

  if (!data || data.length === 0) {
    liste.innerHTML = "Sefer yok";
    return;
  }

  data.forEach(s => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.marginTop = "10px";

    div.innerHTML = `
      <b>${s.hat}</b><br>
      ${s.arac}<br>
      Saat: ${s.saat}<br>
      Durum: ${s.durum}
    `;

    liste.appendChild(div);
  });
}
