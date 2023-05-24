
class Doctor {

  final String id;
  final String firstName;
  final String lastName;
  final String phone;
  final String speciality;
  final String hospitalId;
  final String information;
  final String image;
  final num star;
  final List knowledges;

  Doctor({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.phone,
    required this.speciality,
    required this.hospitalId,
    required this.information,
    required this.image,
    required this.star,
    required this.knowledges
  });

  factory Doctor.fromJson(Map<String,dynamic> json) {

    return Doctor(
        id: json['userId'],
        firstName: json['firstName'] ?? "",
        lastName: json['lastName'] ?? "",
        phone: json['phone'] ?? "",
        speciality: json['speciality'] ?? "",
        hospitalId: json['hospitalId'],
        information: json['information'] ?? "",
        image: json['imageUrl'] ?? "https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg",
        star: json['star'] ?? 0,
        knowledges: json['knowledges'] ?? []
    );

  }

}