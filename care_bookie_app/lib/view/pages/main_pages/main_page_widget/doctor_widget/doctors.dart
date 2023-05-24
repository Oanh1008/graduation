import 'package:care_bookie_app/view_model/doctor_detail_view_model.dart';
import 'package:care_bookie_app/view_model/favorite_page_view_model.dart';
import 'package:care_bookie_app/view_model/home_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../../res/constants/colors.dart';
import '../../../../../view_model/schedule_page_view_model.dart';
import '../../doctor/detail_doctor.dart';

class Doctors extends StatefulWidget {
  const Doctors({Key? key}) : super(key: key);

  @override
  State<Doctors> createState() => _DoctorsState();
}

class _DoctorsState extends State<Doctors> {
  @override
  Widget build(BuildContext context) {
    return Consumer<HomePageViewModel>(
      builder: (context, homePageViewModel, child) => Padding(
        padding: const EdgeInsets.only(left: 15.0),
        child: SizedBox(
          height: 230,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: homePageViewModel.doctors.length,
            itemBuilder: (context, index) => Container(
              alignment: Alignment.center,
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
                              onTap: () async {
                                final doctorDetailPageViewModel =
                                    Provider.of<DoctorDetailPageViewModel>(
                                        context,
                                        listen: false);

                                final schedulePageViewModel =
                                    Provider.of<SchedulePageViewModel>(context,
                                        listen: false);

                                doctorDetailPageViewModel.setDoctorDetail(
                                    homePageViewModel.doctors[index]);

                              final favoritePageViewModel = Provider.of<FavoritePageViewModel>(context,listen: false);

                              doctorDetailPageViewModel.setDoctorDetail(homePageViewModel.doctors[index]);
                                doctorDetailPageViewModel.setScheduleWithDoctor(
                                    schedulePageViewModel.schedules);

                                await doctorDetailPageViewModel.getHospitalById(
                                    homePageViewModel
                                        .doctors[index].hospitalId);

                              doctorDetailPageViewModel.setDoctorFavorite(favoritePageViewModel.listDoctorFavorite);

                              doctorDetailPageViewModel.checkFavorite();

                              await doctorDetailPageViewModel.getHospitalById(homePageViewModel.doctors[index].hospitalId);

                              // ignore: use_build_context_synchronously
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => const DetailDoctor()));
                            },

                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(20),
                                child: Image.network(
                                  homePageViewModel.doctors[index].image,
                                  fit: BoxFit.fill,
                                  width: 100,
                                  height: 100,
                                  //scale: 30,
                                ),
                              ),
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
                              child: Text(
                                  "Bs. ${homePageViewModel.doctors[index].firstName} ${homePageViewModel.doctors[index].lastName}",
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
                                child: Text(
                                    homePageViewModel.doctors[index].speciality,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
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
            ),
          ),
        ),
      ),
    );
  }
}
