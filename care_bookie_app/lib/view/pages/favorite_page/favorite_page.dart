import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import '../../../res/constants/colors.dart';
import '../main_pages/main_page_widget/AppbarCustom.dart';
import 'clinic_favorite.dart';
import 'doctor_favorite.dart';

class FavoritePage extends StatelessWidget {
  const FavoritePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: true,
      right: true,
      left: true,
      child: Scaffold(
        backgroundColor: ColorConstant.BackGroundColor,
        body: SizedBox(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                children: [
                  const AppbarCustom(),
                  favoriteDoctor(),
                  const DoctorFavorite(),
                  favoriteClinic(),
                  const ClinicFavorite(),
                  const SizedBox(height: 120)
                ],
              ),
            )),
      ),
    );
  }

  Widget favoriteDoctor() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 0, 0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          //textBaseline: TextBaseline.alphabetic,
          children: [
            Container(
              padding: const EdgeInsets.only(top: 20),
              //color: Colors.grey,
              width: 220,
              height: 80,
              child: RichText(
                text: const TextSpan(children: [
                  TextSpan(
                    text: "Bác sỹ",
                    style: TextStyle(
                        height: 1,
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w800,
                        fontSize: 32,
                        //textBaseline: TextBaseline.alphabetic,
                        color: Color(0xff4fa2e7),
                        letterSpacing: 1.5,
                        fontFamily: 'Montserrat'),
                  ),
                  WidgetSpan(
                      child: Padding(
                        padding:
                        EdgeInsets.symmetric(vertical: 10, horizontal: 20.0),
                        child: Text(
                          "Yêu thích",
                          style: TextStyle(
                              height: 0.6,
                              fontStyle: FontStyle.italic,
                              fontWeight: FontWeight.w800,
                              fontSize: 28,
                              //textBaseline: TextBaseline.alphabetic,
                              color: Colors.green,
                              //letterSpacing: 1.5,
                              fontFamily: 'Montserrat'),
                        ),
                      )),
                ]),
                //textScaleFactor: 0.8,
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0.0),
              child: SvgPicture.asset(
                'assets/images/doctorFavourite.svg',
                width: 90,
                height: 90,
                fit: BoxFit.fill,
              ),
            ),
          ],
        ));
  }

  Widget favoriteClinic() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(20,30, 0, 0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          //textBaseline: TextBaseline.alphabetic,
          children: [
            Container(
              padding: const EdgeInsets.only(top: 20),
              //color: Colors.grey,
              width: 220,
              height: 80,
              child: RichText(
                text: const TextSpan(children: [
                  TextSpan(
                    text: "Phòng khám",
                    style: TextStyle(
                        height: 1,
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w800,
                        fontSize: 30,
                        //textBaseline: TextBaseline.alphabetic,
                        color: Colors.orange,
                        letterSpacing: 1.5,
                        fontFamily: 'Montserrat'),
                  ),
                  WidgetSpan(
                      child: Padding(
                        padding:
                        EdgeInsets.symmetric(vertical: 3.0, horizontal: 20.0),
                        child: Text(
                          "yêu thích",
                          style: TextStyle(
                              height: 1,
                              fontStyle: FontStyle.italic,
                              fontWeight: FontWeight.w800,
                              fontSize: 28,
                              //textBaseline: TextBaseline.alphabetic,
                              color: Colors.blueAccent,
                              //letterSpacing: 1.5,
                              fontFamily: 'Montserrat'),
                        ),
                      )),
                ]),
                //textScaleFactor: 0.8,
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0.0),
              child: SvgPicture.asset(
                'assets/images/clinicFavourite.svg',
                width: 90,
                height: 90,
                fit: BoxFit.fill,
              ),
            ),
          ],
        ));
  }
}
