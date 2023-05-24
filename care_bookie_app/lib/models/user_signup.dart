class UserSignup {
  String email;
  String firstName;
  String lastName;
  String password;
  String phone;

  UserSignup(
      {required this.email,
      required this.firstName,
      required this.lastName,
      required this.password,
      required this.phone});

  Map<String, dynamic> toJsonWithUser() => {
        'email': email,
        'firstName': firstName,
        'lastName': lastName,
        'password': password,
        'phone': phone
      };
}
