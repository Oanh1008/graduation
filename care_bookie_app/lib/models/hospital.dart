
import 'package:care_bookie_app/models/service.dart';
import 'package:care_bookie_app/models/working_day_detail.dart';

class Hospital {

  final String id;
  final String hospitalName;
  final String address;
  final double priceFrom;
  final double priceTo;
  final bool status;
  final String information;
  final num star;
  final String image;
  final List<Service> services;
  final List<WorkingDayDetail> workingDayDetails;

  Hospital({
    required this.id,
    required this.hospitalName,
    required this.address,
    required this.priceFrom,
    required this.priceTo,
    required this.status,
    required this.information,
    required this.star,
    required this.services,
    required this.workingDayDetails,
    required this.image
  });

  factory Hospital.fromJson(Map<String,dynamic> json) {

    List servicesJson = json['services'];

    List<Service> services = servicesJson.map((e) => Service.fromJson(e)).toList();

    List workingDayDetailsJson = json['workingDayDetails'];

    List<WorkingDayDetail> workingDayDetails;

    if(workingDayDetailsJson.isNotEmpty) {
      workingDayDetails = workingDayDetailsJson.map((e) => WorkingDayDetail.fromJson(e)).toList();
    } else {
      workingDayDetails = [];
    }

    return Hospital(
        id: json['hospitalId'],
        hospitalName: json['hospitalName'],
        address: json['address'] ?? "",
        priceFrom: json['priceFrom'] ?? 0,
        priceTo: json['priceTo'] ?? 0,
        status: json['status'],
        information: json['information'] ?? "",
        star: json['star'],
        services: services,
        workingDayDetails: workingDayDetails,
        image: json['imageUrl']
    );

  }


}