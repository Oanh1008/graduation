class UserLogin {
  final String id;
  late final String firstName;
  late String lastName = "";
  late String birthDay = "01-01-2001";
  late String email = "";
  late int gender = 1;
  late String phone = "";
  late String address = "";
  late String image = "";
  String? password;

  UserLogin(
      {required this.id,
      required this.firstName,
      required this.lastName,
      required this.birthDay,
      required this.email,
      required this.gender,
      required this.phone,
      required this.address,
      required this.image,
      this.password});

  factory UserLogin.fromJson(Map<String, dynamic> json) {
    return UserLogin(
        id: json['userId'],
        firstName: json['firstName'],
        lastName: json['lastName'],
        birthDay: json['birthDay'] ?? "",
        email: json['email'],
        gender: json['gender'],
        phone: json['phone'],
        address: json['address'] ?? "",
        image: json['imageUrl'] ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/512px-Breezeicons-actions-22-im-user.svg.png?20160527143724");
  }

  @override
  String toString() {
    return 'UserLogin{id: $id, firstName: $firstName, lastName: $lastName, birthDay: $birthDay, email: $email, gender: $gender, phone: $phone, address: $address, image: $image, password: $password}';
  }
}
