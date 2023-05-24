class UserUpdate {
  String address;
  String birthDay;
  String email;
  String firstName;
  int gender;
  String imageUrl;
  String lastName;
  String phone;
  String userId;

  UserUpdate(
      {required this.address,
      required this.firstName,
      required this.lastName,
      required this.email,
      required this.gender,
      required this.phone,
      required this.birthDay,
      required this.imageUrl,
      required this.userId});

  Map<String, dynamic> toJsonWithUser() => {
        'address': address,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'gender': gender,
        'phone': phone,
        'birthDay': birthDay,
        'imageUrl': imageUrl,
        'userId': userId,
      };
}
