
import 'package:care_bookie_app/models/book_information.dart';
import 'package:care_bookie_app/models/service.dart';

class Schedule {

  final String hospitalName;
  final String addressHospital;
  final num starHospital;
  final String doctorName;
  final String imageHospital;
  final BookInformation bookInformation;
  final List<Service> services;

  Schedule({
    required this.imageHospital,
    required this.hospitalName,
    required this.addressHospital,
    required this.starHospital,
    required this.bookInformation,
    required this.services,
    required this.doctorName
  });

  factory Schedule.fromJson(Map<String,dynamic> json) {

    List servicesJson = json['services'];

    List<Service> services = servicesJson.map((e) => Service.fromJson(e)).toList();

    var bookInformationJson = json['bookInformation'];

    BookInformation bookInformation = BookInformation.fromJson(bookInformationJson);

    return Schedule(
        imageHospital: json['imageUrlH'],
        hospitalName: json['hospitalNameH'],
        addressHospital: json['addressH'] ?? "",
        starHospital: json['starH'] ?? 0,
        bookInformation: bookInformation,
        services: services,
        doctorName: json['doctorName']
    );

  }


}