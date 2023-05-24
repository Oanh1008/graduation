
class BookInformation {

  final int id;
  final String userId;
  final String hospitalId;
  final String doctorId;
  final String date;
  final String dateExamination;
  final String session;
  final String symptom;
  final String message;
  final String name;
  final int age;
  final String gender;
  final String status;
  final bool shareInvoice;

  BookInformation({
    required this.id,
    required this.userId,
    required this.hospitalId,
    required this.doctorId,
    required this.date,
    required this.dateExamination,
    required this.session,
    required this.symptom,
    required this.message,
    required this.name,
    required this.age,
    required this.gender,
    required this.status,
    required this.shareInvoice
  });

  factory BookInformation.fromJson(Map<String,dynamic> json) {

    return BookInformation(
        id: json['id'],
        userId: json['userId'],
        hospitalId: json['hospitalId'],
        doctorId: json['doctorId'] ?? "",
        date: json['date'],
        dateExamination: json['dateExamination'],
        session: json['session'],
        symptom: json['symptom'],
        message: json['message'] ?? "",
        name: json['name'] ?? "",
        age: json['age'] ?? 0,
        gender: json['gender'] ?? "",
        status: json['status'],
        shareInvoice: json['shareInvoice']
    );

  }

}