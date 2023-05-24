
class InvoiceInformation {

  final int id;
  final String symptomDetail;
  final String advices;
  final String diagnose;
  final String dateTimeInvoice;
  final String doctorId;
  final String hospitalId;
  final String userId;
  final double discountInsurance;

  InvoiceInformation({
    required this.id,
    required this.symptomDetail,
    required this.advices,
    required this.diagnose,
    required this.dateTimeInvoice,
    required this.userId,
    required this.doctorId,
    required this.hospitalId,
    required this.discountInsurance,
  });

  factory InvoiceInformation.fromJson(Map<String,dynamic> json) {

    return InvoiceInformation(
        id: json['id'],
        symptomDetail: json['symptomDetail'] ?? "",
        advices: json['advices'] ?? "",
        diagnose: json['diagnose'] ?? "",
        dateTimeInvoice: json['dateTimeInvoice'],
        doctorId: json['doctorId'],
        hospitalId: json['hospitalId'],
        userId: json['userId'],
        discountInsurance: json['discountInsurance'] ?? 0
    );

  }

}