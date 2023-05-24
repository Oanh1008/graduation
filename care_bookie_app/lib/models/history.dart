
import 'package:care_bookie_app/models/invoice_information.dart';
import 'package:care_bookie_app/models/medicines.dart';
import 'package:care_bookie_app/models/service.dart';

class History {

  final String fullNameBook;
  final int ageBook;
  final String gender;
  final String hospitalName;
  final String address;
  final num star;
  final String hospitalImage;
  final String doctorName;
  final num totalPrice;
  final List<Service> services;
  final List<Medicine> medicines;
  final InvoiceInformation invoiceInformation;

  History({
    required this.fullNameBook,
    required this.ageBook,
    required this.gender,
    required this.hospitalName,
    required this.address,
    required this.star,
    required this.hospitalImage,
    required this.doctorName,
    required this.services,
    required this.invoiceInformation,
    required this.medicines,
    required this.totalPrice
  });

  factory History.fromJson(Map<String,dynamic> json) {

    List servicesJson = json['services'];

    List<Service> services = servicesJson.map((e) => Service.fromJson(e)).toList();

    List medicinesJson = json['medicines'];

    List<Medicine> medicines = medicinesJson.map((e) => Medicine.fromJson(e)).toList();

    var invoiceInformationJson = json['invoiceInformation'];

    InvoiceInformation invoiceInformation = InvoiceInformation.fromJson(invoiceInformationJson);

    var fullNameBook = json['user']['fullNameBook'];
    var ageBook = json['user']['ageBook'];
    var genderBook = json['user']['genderBook'];

    if(fullNameBook == null) {
      fullNameBook = json['user']['fullName'];
      ageBook = json['user']['age'];
      genderBook = json['user']['gender'];

    }

    return History(
        fullNameBook: fullNameBook,
        ageBook: ageBook,
        gender: genderBook,
        hospitalName: json['hospitalName'],
        address: json['address'],
        star: json['star'] ?? 0,
        hospitalImage: json['imageUrl'],
        doctorName: json['doctorName'],
        services: services,
        invoiceInformation: invoiceInformation,
        medicines: medicines,
        totalPrice: json['totalPrice']
    );

  }

}