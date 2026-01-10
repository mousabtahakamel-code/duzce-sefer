export default function handler(req, res) {
  const { username, password } = req.query;

  const users = [
    // OWNER (2)
    { user: "owner1", pass: "1234", role: "owner", name: "OWNER 1" },
    { user: "owner2", pass: "1234", role: "owner", name: "OWNER 2" },

    // HAREKET AMİRİ (2)
    { user: "amiri1", pass: "1234", role: "amiri", name: "HAREKET AMİRİ 1" },
    { user: "amiri2", pass: "1234", role: "amiri", name: "HAREKET AMİRİ 2" },

    // ADMIN (2)
    { user: "admin1", pass: "1234", role: "admin", name: "ADMIN 1" },
    { user: "admin2", pass: "1234", role: "admin", name: "ADMIN 2" },

    // ŞOFÖRLER
    { user: "sofor1", pass: "1234", role: "sofor", name: "ŞOFÖR 1" },
    { user: "sofor2", pass: "1234", role: "sofor", name: "ŞOFÖR 2" }
  ];

  const found = users.find(
    u => u.user === username && u.pass === password
  );

  if (!found) {
    return res.status(401).json({ error: "Hatalı giriş" });
  }

  res.status(200).json({
    username: found.user,
    role: found.role,
    name: found.name
  });
}
