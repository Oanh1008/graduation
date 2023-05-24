import 'package:care_bookie_app/view_model/history_page_view_model.dart';
import 'package:care_bookie_app/view_model/home_page_view_model.dart';
import 'package:care_bookie_app/view_model/login_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:provider/provider.dart';
import '../../../../res/constants/colors.dart';
import '../../../view_model/bottom_navbar_view_model.dart';
import '../../../view_model/favorite_page_view_model.dart';
import '../../../view_model/schedule_page_view_model.dart';
import 'main_page_widget/AppbarCustom.dart';
import 'clinic/clinic_widget/clinics_nearby.dart';
import 'main_page_widget/doctor_widget/doctors.dart';
import 'main_page_widget/favorite_infos.dart';
import '../search_page/search_button.dart';

class MainPage extends StatefulWidget {
  const MainPage({
    Key? key,
  }) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    var loadHospitalAndDoctor =
        Provider.of<HomePageViewModel>(context, listen: false);

    if (loadHospitalAndDoctor.doctors.isEmpty) {
      loadHospitalAndDoctor.getAllDoctor();
    }

    if (loadHospitalAndDoctor.hospitals.isEmpty) {
      loadHospitalAndDoctor.getAllHospital();
    }

    final historyPageViewModel =
        Provider.of<HistoryPageViewModel>(context, listen: false);

    final loginPageViewModel =
        Provider.of<LoginPageViewModel>(context, listen: false);

    historyPageViewModel.setHistories(loginPageViewModel.userLogin.id);

    final schedulePageViewModel =
        Provider.of<SchedulePageViewModel>(context, listen: false);

    print(loginPageViewModel.userLogin.toString());

    schedulePageViewModel.loadSchedules(loginPageViewModel.userLogin.id);

    final favoritePageViewModel =
        Provider.of<FavoritePageViewModel>(context, listen: false);

    favoritePageViewModel
        .getAllDoctorFavoriteByUserId(loginPageViewModel.userLogin.id);

    favoritePageViewModel
        .getAllHospitalFavoriteByUserId(loginPageViewModel.userLogin.id);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: true,
      right: true,
      left: true,
      child: Consumer<BottomNavBarViewModel>(
        builder: (context, value, child) {
          return Scaffold(
            backgroundColor: ColorConstant.BackGroundColor,
            body: SizedBox(
              width: MediaQuery.of(context).size.width,
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Column(
                  children: [
                    const AppbarCustom(),
                    hiPatient(),
                    const SearchButton(),
                    const FavoriteInfos(),
                    doctorTitle(),
                    const Doctors(),
                    clinicsNearbyTitles(),
                    const ClinicsNearby(),
                    const SizedBox(
                      height: 100,
                    )
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget hiPatient() {
    return Consumer<LoginPageViewModel>(
        builder: (context, value, child) => Padding(
              padding: const EdgeInsets.fromLTRB(40, 45, 35, 0),
              child: Row(
                children: [
                  SizedBox(
                    width: 240,
                    child: Text(
                      "Chào ${value.userLogin.firstName}",
                      style: const TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 30,
                          color: Colors.black87,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  //
                  Image.asset('assets/images/wavinghand.png',
                      width: 60, height: 60, fit: BoxFit.cover),
                ],
              ),
            ));
  }

  Widget doctorTitle() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(35, 40, 0, 0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          textBaseline: TextBaseline.alphabetic,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 10, 0.0),
              child: Image.asset(
                'assets/images/doctor02.png',
                scale: 6,
              ),
            ),
            const Text(
              'BÁC SỸ',
              style: TextStyle(
                  fontStyle: FontStyle.italic,
                  fontWeight: FontWeight.w600,
                  fontSize: 32,
                  color: Colors.black87,
                  letterSpacing: 1.5,
                  fontFamily: 'Poppins'),
            ),
          ],
        ));
  }

  Widget clinicsNearbyTitles() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(35, 30, 0, 0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 0, 0.0),
              child: Image.asset(
                'assets/images/clinic.png',
                scale: 4,
                fit: BoxFit.fill,
              ),
            ),
            Container(
              padding: const EdgeInsets.only(top: 10),
              width: 180,
              height: 80,
              child: RichText(
                text: const TextSpan(children: [
                  TextSpan(
                    text: "PHÒNG KHÁM",
                    style: TextStyle(
                        height: 1.4,
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w600,
                        fontSize: 23,
                        color: Color(0xff4fa2e7),
                        letterSpacing: 1.5,
                        fontFamily: 'Poppins'),
                  ),
                  WidgetSpan(
                      child: Padding(
                    padding:
                        EdgeInsets.symmetric(vertical: 3.0, horizontal: 25.0),
                    child: Text(
                      "SỨC KHỎE",
                      style: TextStyle(
                          height: 1.2,
                          fontStyle: FontStyle.italic,
                          fontWeight: FontWeight.w800,
                          fontSize: 22,
                          color: Colors.green,
                          letterSpacing: 1.5,
                          fontFamily: 'Lemonada'),
                    ),
                  )),
                ]),
              ),
            )
          ],
        ));
  }
}
