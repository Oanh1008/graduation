
class InvoiceData {

  final int age;
  final String date;
  final String dateExamination;
  final String doctorId;
  final String hospitalId;
  final String gender;
  final List<int> invoices;
  final String name;
  final List<int> services;
  final String session;
  final bool shareInvoice;
  final String symptom;
  final String userId;

  InvoiceData({
    required this.hospitalId,
    required this.age,
    required this.gender,
    required this.services,
    required this.symptom,
    required this.name,
    required this.session,
    required this.userId,
    required this.invoices,
    required this.shareInvoice,
    required this.doctorId,
    required this.dateExamination,
    required this.date
  });

  Map<String,dynamic> toJson() => {
    'age' : age,
    'gender' : gender,
    'services' : services,
    'symptom' : symptom,
    'name' : name,
    'session' : session,
    'userId' : userId,
    'invoices' : invoices,
    'shareInvoice' : shareInvoice,
    'doctorId' : doctorId,
    'dateExamination' : dateExamination,
    'date' : date,
    'hospitalId' : hospitalId
  };

}
