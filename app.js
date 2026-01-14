// ===============================
// SUPABASE AYARLARI
// ===============================
const SUPABASE_URL = "https://asbuijksydmwlpinbjcn.supabase.co/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYnVpamtzeWRtd2xwaW5iamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODMzNzUsImV4cCI6MjA4Mzg1OTM3NX0.naOIIqO9WFjOhFmzNJT0orx1N5TBP_tcGV70W1Iak70";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===============================
// GİRİŞ
// ===============================
async function login(){
  const username = document.getElementById("username")?.value.trim();
  const pin = document.getElementById("pin")?.value.trim();
  const msg = document.getElementById("msg");

  if(!username || !pin){
    msg.innerText = "Kullanıcı adı ve PIN gir ❌";
    return;
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("pin", pin)
    .limit(1);

  if(error || !data || data.length===0){
    msg.innerText = "Hatalı giriş ❌";
    return;
  }

  localStorage.setItem("activeUser", JSON.stringify(data[0]));

  if(data[0].role === "amir") location.href="amir.html";
  else location.href="sofor.html";
}

// ===============================
// SAAT BUTONLARI (5 DK)
// ===============================
function saatButonlariOlustur(){
  const div = document.getElementById("saatler");
  if(!div) return;

  div.innerHTML = "";

  for(let h=0; h<24; h++){
    for(let m=0; m<60; m+=5){
      const hh = String(h).padStart(2,"0");
      const mm = String(m).padStart(2,"0");
      const saat = `${hh}:${mm}`;

      const b = document.createElement("button");
      b.innerText = saat;

      b.onclick = ()=>{
        document.getElementById("saat").value = saat;
        document.querySelectorAll("#saatler button")
          .forEach(x=>x.classList.remove("active"));
        b.classList.add("active");
      };

      div.appendChild(b);
    }
  }
}

// ===============================
// SEFER ATA (AMİR)
// ===============================
async function seferEkle(){
  const user = JSON.parse(localStorage.getItem("activeUser"));
  if(!user || user.role!=="amir"){
    alert("Yetkisiz");
    return;
  }

  const sofor = document.getElementById("sofor").value;
  const hat = document.getElementById("hat").value;
  const arac = document.getElementById("arac").value;
  const saat = document.getElementById("saat").value;
  const msg = document.getElementById("msg");

  if(!saat){
    msg.innerText = "Saat seç ❌";
    return;
  }

  const { error } = await supabaseClient
    .from("seferler")
    .insert({
      sofor_username: sofor,
      hat,
      arac,
      saat
    });

  msg.innerText = error ? "Hata ❌" : "Sefer atandı ✅";
}

// ===============================
// ÇIKIŞ
// ===============================
function logout(){
  localStorage.removeItem("activeUser");
  location.href="index.html";
}

// ===============================
// SAYFA YÜKLENİNCE
// ===============================
document.addEventListener("DOMContentLoaded", ()=>{
  saatButonlariOlustur();
});

