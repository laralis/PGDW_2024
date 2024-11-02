export default function ehUmEmailValido(campo) {
  if (!validaEmail(campo.value)) {
    campo.setCustomValidity("O email não é válido");
  }
}
function validaEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}
