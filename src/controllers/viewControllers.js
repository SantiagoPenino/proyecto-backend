export default class ViewControllers {
  home = (req, res) => {
    res.render("home");
  };
  login = (req, res) => {
    res.render("login");
  };
  register = (req, res) => {
    res.render("register");
  };
  profile = (req, res) => {
    res.render("profile");
  };
  registerError = (req, res) => {
    res.render("register-error");
  };
  loginError = (req, res) => {
    res.render("login-error");
  };
}
