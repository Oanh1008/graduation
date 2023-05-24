import 'package:care_bookie_app/view_model/favorite_page_view_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:provider/provider.dart';

import '../../../res/constants/colors.dart';
import '../../../view_model/doctor_detail_view_model.dart';
import '../../../view_model/schedule_page_view_model.dart';
import '../main_pages/doctor/detail_doctor.dart';

class DoctorFavorite extends StatefulWidget {
  const DoctorFavorite({Key? key}) : super(key: key);

  @override
  State<DoctorFavorite> createState() => _DoctorFavoriteState();
}

class _DoctorFavoriteState extends State<DoctorFavorite> {
  @override
  Widget build(BuildContext context) {

    final favoritePageViewModel = Provider.of<FavoritePageViewModel>(context,listen: false);

    return  Padding(
      padding: const EdgeInsets.only(top: 0.0),
      child: SizedBox(
        height: 225,
        child: ListView(
          scrollDirection: Axis.horizontal,
          children: [
            const SizedBox(
              width: 20,
            ),
            ...favoritePageViewModel.listDoctorFavorite.map((favorite) => Container(
              margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
              alignment: Alignment.topCenter,
              child: Container(
                margin: const EdgeInsets.only(right: 15),
                height: 200,
                width: 155,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(27),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey.withOpacity(0.15),
                        spreadRadius: 0,
                        blurRadius: 10,
                        offset: const Offset(0, 3))
                  ],
                ),
                child: Column(
                  children: [
                    Stack(
                      children: [
                        Container(
                          padding: const EdgeInsets.only(top: 7),
                          height: 135,
                          width: 140,
                          decoration: BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                  color: Colors.grey.withOpacity(0.2),
                                  spreadRadius: 1,
                                  blurRadius: 15,
                                  offset: const Offset(0, 20))
                            ],
                          ),
                          child: Ink(
                            decoration: BoxDecoration(
                              color: Colors.blue,
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            child: InkWell(
                              onTap: () async{

                                final doctorDetailPageViewModel = Provider.of<DoctorDetailPageViewModel>(context,listen: false);

                                final schedulePageViewModel = Provider.of<SchedulePageViewModel>(context,listen: false);

                                doctorDetailPageViewModel.setDoctorDetail(favorite.doctor);

                                doctorDetailPageViewModel.setScheduleWithDoctor(schedulePageViewModel.schedules);

                                doctorDetailPageViewModel.setIsFavoritePage(true);

                                await doctorDetailPageViewModel.getHospitalById(favorite.doctor.hospitalId);

                                // ignore: use_build_context_synchronously
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => const DetailDoctor()));
                              },
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(20),
                                child: Image.network(
                                  favorite.doctor.image,
                                  fit: BoxFit.fitWidth,

                                  //scale: 30,
                                ),
                              ),
                            ),
                          ),
                        ),
                        Container(
                          margin: const EdgeInsets.fromLTRB(105, 10, 0, 0),
                          height: 28,
                          width: 28,
                          child: GestureDetector(
                            onTap: () async{

                              await favoritePageViewModel.deleteDoctorFavorite(favorite.doctorFavouriteId.toString(), favorite);
                              setState(() {

                              });
                            },
                            child: const Icon(
                              IconlyBold.closeSquare,
                              color: Color(0xffee5353),
                              size: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(15, 10, 10, 0),
                      child: Column(
                        children: [
                          SizedBox(
                              width: 130,
                              height: 20,
                              //color: Colors.grey,
                              child: Text("Dr. ${favorite.doctor.lastName} ${favorite.doctor.firstName}",
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                      fontSize: 14,
                                      //overflow: TextOverflow.ellipsis,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500,
                                      fontFamily: 'Merriweather Sans'))),
                          Row(
                            children: [
                              Expanded(
                                child: Text(favorite.doctor.speciality,
                                    style: const TextStyle(
                                        overflow: TextOverflow.ellipsis,
                                        fontSize: 14,
                                        //overflow: TextOverflow.ellipsis,
                                        color: ColorConstant.Grey01,
                                        fontWeight: FontWeight.w400,
                                        fontFamily: 'Merriweather Sans')),
                              ),
                            ],
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            )),
          ],
        ),
      ),
    );
  }
}
