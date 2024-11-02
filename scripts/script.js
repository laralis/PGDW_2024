const button_join = document.querySelectorAll(".join_Button");

button_join.forEach(button => {
  button.addEventListener("click", () => {
    window.location.href = "formulario.html";
  });
  
});