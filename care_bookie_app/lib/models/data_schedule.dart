
class DataSchedule {

  final int age;
  final String date;
  final String dateExamination;
  final String doctorId;
  final int gender;
  final String hospitalId;
  final List invoices;
  final String name;
  final List services;
  final String session;
  final bool shareInvoice;
  final String symptom;
  final String userId;

  DataSchedule({
    required this.age,
    required this.date,
    required this.dateExamination,
    required this.doctorId,
    required this.gender,
    required this.hospitalId,
    required this.services,
    required this.session,
    required this.shareInvoice,
    required this.invoices,
    required this.userId,
    required this.symptom,
    required this.name
  });

  Map<String,dynamic> toJson() => {
    'age' : age,
    'date' : date,
    'dateExamination' : dateExamination,
    'doctorId' : doctorId,
    'gender' : gender,
    'hospitalId' : hospitalId,
    'services' : services,
    'session' : session,
    'shareInvoice' : shareInvoice,
    'invoices' : invoices,
    'userId' : userId,
    'symptom' : symptom,
    'name' : name
  };


}