export default class User {
  constructor(username, email, password, first_name, last_name, password2) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password2 = password2;
  }
}