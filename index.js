import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const porta = 3000;
const localhost = "0.0.0.0";

const app = express();

app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/css", express.static(path.join(__dirname, "css")));

app.use(
  session({
    secret: "m1Nh4Ch4v3S3cR3t4",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 minutos
    },
  })
);

app.get("/login", (requisicao, resposta) => {
  resposta.sendFile(path.resolve("publico/login.html"));
});
app.get("/index", (requisicao, resposta) => {
  resposta.sendFile(path.resolve("publico/index.html"));
});

app.post("/login", (requisicao, resposta) => {
  const { usuario, senha } = requisicao.body;

  if (usuario === "admin" && senha === "admin") {
    requisicao.session.autenticado = true;
    resposta.redirect("/Pacotes");
  } else {
    resposta.redirect("/login");
  }
});

app.get("/Pacotes", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/Pacotes.html"));
});

app.get("/detalhadoCanada", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/detalhadoCanada.html"));
});
app.get("/DetalhadoTokyo", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/detalhadoTokyo.html"));
});
app.get("/DetalhadoLondres", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/DetalhadoLondres.html"));
});
app.get("/DetalhadoNovaYork", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/DetalhadoNovaYork.html"));
});
app.get("/DetalhadoAustralia", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/detalhadoAustralia.html"));
});
app.get("/DetalhadoCaribe", autenticar, (requisicao, resposta) => {
  resposta.sendFile(path.resolve("privado/DetalhadoCaribe.html"));
});

app.get("/logout", (requisicao, resposta) => {
  requisicao.session.destroy();
  resposta.redirect("/login");
});

app.use(express.static("publico"));

app.use(autenticar, express.static("privado"));

app.get("/login", (requisicao, resposta) => {
  resposta.sendFile(path.resolve("publico/login.html"));
});

app.listen(porta, localhost, () => {
  console.log(`Servidor rodando em http://${localhost}:${porta}`);
});
