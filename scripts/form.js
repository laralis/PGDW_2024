import ehMaiorDeIdade from "./valida_idade.js";
import ehUmEmailValido from "./valida_email.js";
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector(".formulario");

const tiposDeErros = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];
const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    tooShort: "Por favor, preencha um nome maior.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  senha: {
    valueMissing: "O campo de senha não pode estar vazio.",
    patternMismatch:
      "A senha deve conter letras maiúsculas, símbolos e números.",
    tooShort: "A senha deve ter no mínimo 8 caracteres",
  },
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },
  planos: {},
  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar.",
  },
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const listaDeRespostas = {
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    senha: e.target.elements["senha"].value,
    planos: e.target.elements["planos"].value,
    aniversario: e.target.elements["aniversario"].value,
  };
  console.log(listaDeRespostas);
  localStorage.setItem("cadastro", JSON.stringify(listaDeRespostas));
  window.location.href = "./";
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("invalid", (e) => e.preventDefault());
  campo.addEventListener("blur", () => verificaCampo(campo));
});

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");
  if (campo.name == "aniversario" && campo.value.length > 0) {
    ehMaiorDeIdade(campo);
  }
  if (campo.name == "email" && campo.value.length > 0) {
    ehUmEmailValido(campo);
  }

  tiposDeErros.forEach((tipo) => {
    if (campo.validity[tipo]) {
      mensagem = mensagens[campo.name][tipo];
    }
    if (campo.validity.customError) {
      mensagem = campo.validationMessage;
    }
  });
  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();
  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }
}
