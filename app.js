// 🔑 SUPABASE BİLGİLERİNİ BURAYA KOY
const SUPABASE_URL = "https://asbuijksydmwlpinbjcn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYnVpamtzeWRtd2xwaW5iamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODMzNzUsImV4cCI6MjA4Mzg1OTM3NX0.naOIIqO9WFjOhFmzNJT0orx1N5TBP_tcGV70W1Iak70";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// GİRİŞ
async function login(){
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;
  const msg = document.getElementById("msg");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("pin", pin)
    .single();

  if(error || !data){
    msg.innerText = "Hatalı giriş ❌";
    return;
  }

  localStorage.setItem("user", JSON.stringify(data));

  if(data.role === "amir") window.location.href="amir.html";
  else window.location.href="sofor.html";
}

// SEFER EKLE (AMİR)
async function seferEkle(){
  const user = JSON.parse(localStorage.getItem("user"));
  if(!user || user.role!=="amir") return;

  const { error } = await supabase.from("seferler").insert({
    sofor_username: document.getElementById("sofor").value,
    hat: document.getElementById("hat").value,
    arac: document.getElementById("arac").value,
    saat: document.getElementById("saat").value
  });

  document.getElementById("msg").innerText =
    error ? "Hata ❌" : "Sefer atandı ✅";
}

// ŞOFÖR SEFERLERİ
async function yukleSeferler(){
  const user = JSON.parse(localStorage.getItem("user"));
  if(!user) return;

  const { data } = await supabase
    .from("seferler")
    .select("*")
    .eq("sofor_username", user.username);

  const liste = document.getElementById("liste");
  if(!liste) return;

  liste.innerHTML="";
  data.forEach(s=>{
    liste.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin-top:10px">
        <b>${s.hat}</b><br>
        ${s.arac}<br>
        Saat: ${s.saat}<br>
        Durum: ${s.durum}
      </div>`;
  });
}

// ÇIKIŞ
function logout(){
  localStorage.removeItem("user");
  window.location.href="index.html";
}

document.addEventListener("DOMContentLoaded", yukleSeferler);
