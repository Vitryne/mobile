let registerPassword = "";

function setRegisterPassword(value: string) {
  registerPassword = value;
}

function getRegisterPassword() {
  return registerPassword;
}

function clearRegisterPassword() {
  registerPassword = "";
}

export { clearRegisterPassword, getRegisterPassword, setRegisterPassword };

