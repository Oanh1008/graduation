import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';

import '../../../res/constants/colors.dart';
import '../../../view_model/doctor_detail_view_model.dart';
import '../../../view_model/favorite_page_view_model.dart';
import '../../../view_model/hospital_detail_page_view_model.dart';
import '../../../view_model/schedule_page_view_model.dart';
import '../../../view_model/search_page_view_model.dart';
import '../main_pages/clinic/detail_clinic.dart';
import '../main_pages/doctor/detail_doctor.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  String _selectedStar = '5 Star';
  String _selectedDisease = 'Non';

  final List<String> _starLevels = [
    '5 Star',
    '4 Stars',
    '3 Stars',
    '2 Stars',
    '1 Stars'
  ];
  final List<String> _diseases = [
    'Non',
    'Disease A',
    'Disease B',
    'Disease C',
    'Disease D',
    'Disease E',

  ];

  bool isClickSearch = false;

  @override
  Widget build(BuildContext context) {

    final searchPageViewModel = Provider.of<SearchPageViewModel>(context,listen: false);

    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(10),
            ),
          ),
          leading: IconButton(
            icon: const Icon(
              Icons.arrow_back,
              color: Colors.black,
            ),
            onPressed: () {

              searchPageViewModel.keySearch.text = "";

              Navigator.pop(context);
            },
          ),
          title: Container(
            width: 600,
            decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(50)),
            child: TextField(
              controller: searchPageViewModel.keySearch,
              decoration: InputDecoration(
                fillColor: Colors.white,
                hintText: 'Tìm kiếm trên Carebookie...',
                hintStyle: const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 17,
                    color: ColorConstant.Grey00,
                    fontFamily: 'Poppins'),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(vertical: 12),
                suffixIcon: IconButton(
                  icon: const Icon(
                    Icons.search,
                    color: Colors.black,
                  ),
                  onPressed: () async{

                    isClickSearch = true;

                    await searchPageViewModel.setDataSearch(searchPageViewModel.keySearch.text);

                    setState(() {

                    });

                  },
                ),
                filled: true,
              ),
              onChanged: (value) {},
            ),
          ),
        ),
        body: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Column(
            children: [
              isClickSearch ? Column(
                children: [
                  doctorSearchTitle(),
                  doctorSearch(),
                  hospitalSearchTitle(),
                  hospitalSearch(),
                  const SizedBox(height: 120)
                ],
              ) : Container()
            ],
          ),
        ));
  }

  Widget doctorSearchTitle() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(35, 20, 0, 0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          //textBaseline: TextBaseline.alphabetic,
          children: [
            Container(
              padding: const EdgeInsets.only(top: 20),
              //color: Colors.grey,
              width: 200,
              height: 80,
              child: RichText(
                text: const TextSpan(children: [
                  TextSpan(
                    text: "Search",
                    style: TextStyle(
                        height: 1,
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w600,
                        fontSize: 35,
                        //textBaseline: TextBaseline.alphabetic,
                        color: Color(0xff4fa2e7),
                        letterSpacing: 1.5,
                        fontFamily: 'Poppins'),
                  ),
                  WidgetSpan(
                      child: Padding(
                        padding:
                        EdgeInsets.symmetric(vertical: 3.0, horizontal: 10.0),
                        child: Text(
                          "Doctor",
                          style: TextStyle(
                              height: 0.8,
                              fontStyle: FontStyle.italic,
                              fontWeight: FontWeight.w600,
                              fontSize: 32,
                              //textBaseline: TextBaseline.alphabetic,
                              color: Colors.green,
                              //letterSpacing: 1.5,
                              fontFamily: 'Poppins'),
                        ),
                      )),
                ]),
                //textScaleFactor: 0.8,
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0.0),
              child: SvgPicture.asset(
                'assets/images/schedule.svg',
                width: 80,
                height: 80,
                fit: BoxFit.fill,
              ),
            ),
          ],
        ));
  }

  Widget doctorSearch() {

    final searchPageViewModel = Provider.of<SearchPageViewModel>(context,listen: false);

    return Padding(
      padding: const EdgeInsets.only(top: 0.0),
      child: SizedBox(
        height: 250,
        child: Column(
          children: [
            const SizedBox(
              width: 35,
            ),

            searchPageViewModel.dataSearch.doctors.isNotEmpty ?
            Expanded(
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: searchPageViewModel.dataSearch.doctors.length,
                itemBuilder: (context, index) => Container(
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

                                    final favoritePageViewModel = Provider.of<FavoritePageViewModel>(context,listen: false);

                                    await doctorDetailPageViewModel.getDoctorById(searchPageViewModel.dataSearch.doctors[index].doctorId);

                                    doctorDetailPageViewModel.setScheduleWithDoctor(schedulePageViewModel.schedules);

                                    doctorDetailPageViewModel.setDoctorFavorite(favoritePageViewModel.listDoctorFavorite);

                                    doctorDetailPageViewModel.checkFavorite();

                                    await doctorDetailPageViewModel.getHospitalById(doctorDetailPageViewModel.doctorDetail!.hospitalId);

                                    // ignore: use_build_context_synchronously
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => const DetailDoctor()));

                                  },
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: Image.network(
                                      searchPageViewModel.dataSearch!.doctors[index].imageUrl,
                                      fit: BoxFit.fitWidth,
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
                                  child: Text("Dr. ${searchPageViewModel.dataSearch.doctors[index].doctorName}",
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
                                    child: Text(searchPageViewModel.dataSearch.doctors[index].speciality,
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
                ),
              ),
            ) : Image.network(
              "https://store.vtctelecom.com.vn/Content/images/no-data.png",
              width: MediaQuery.of(context).size.width,
              fit: BoxFit.fill,
            ),
          ],
        ),
      ),
    );
  }

  Widget hospitalSearchTitle() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(35, 20, 0, 0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          //textBaseline: TextBaseline.alphabetic,
          children: [
            Container(
              padding: const EdgeInsets.only(top: 20),
              //color: Colors.grey,
              width: 200,
              height: 80,
              child: RichText(
                text: const TextSpan(children: [
                  TextSpan(
                    text: "Search",
                    style: TextStyle(
                        height: 1,
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w600,
                        fontSize: 35,
                        //textBaseline: TextBaseline.alphabetic,
                        color: Colors.orange,
                        letterSpacing: 1.5,
                        fontFamily: 'Poppins'),
                  ),
                  WidgetSpan(
                      child: Padding(
                        padding:
                        EdgeInsets.symmetric(vertical: 3.0, horizontal: 10.0),
                        child: Text(
                          "Clinics",
                          style: TextStyle(
                              height: 0.8,
                              fontStyle: FontStyle.italic,
                              fontWeight: FontWeight.w600,
                              fontSize: 32,
                              //textBaseline: TextBaseline.alphabetic,
                              color: Colors.blueAccent,
                              //letterSpacing: 1.5,
                              fontFamily: 'Poppins'),
                        ),
                      )),
                ]),
                //textScaleFactor: 0.8,
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0.0),
              child: SvgPicture.asset(
                'assets/images/schedule.svg',
                width: 80,
                height: 80,
                fit: BoxFit.fill,
              ),
            ),
          ],
        ));
  }

  Widget hospitalSearch() {

    final searchPageViewModel = Provider.of<SearchPageViewModel>(context,listen: false);

    return SizedBox(
      child: searchPageViewModel.dataSearch.hospitals.isNotEmpty ? Column(
        children: [
          ...searchPageViewModel.dataSearch.hospitals.map((hospital) => Padding(
            padding: const EdgeInsets.fromLTRB(30, 15, 10, 0),
            child: Container(
              margin: const EdgeInsets.fromLTRB(5, 5, 5, 10),
              height: 120,
              //width: 155,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(27),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                      color: Colors.grey.withOpacity(0.2),
                      spreadRadius: 0,
                      blurRadius: 7,
                      offset: const Offset(0, 10))
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(10, 10, 0, 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    GestureDetector(
                      onTap: () async{
                        final hospitalDetailPageProvider = Provider.of<HospitalDetailPageViewModel>(context,listen: false);

                        final schedulePageViewModel = Provider.of<SchedulePageViewModel>(context,listen: false);

                        final favoritePageViewModel = Provider.of<FavoritePageViewModel>(context,listen: false);

                        await hospitalDetailPageProvider.getHospitalById(hospital.hospitalId);

                        hospitalDetailPageProvider.setScheduleWithHospital(schedulePageViewModel.schedules);

                        hospitalDetailPageProvider.setHospitalFavorite(favoritePageViewModel.listHospitalFavorite);

                        hospitalDetailPageProvider.checkFavorite();

                        await hospitalDetailPageProvider.getAllDoctorByHospitalId(hospital.hospitalId);


                        // ignore: use_build_context_synchronously
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                const DetailClinic()));
                      },
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(30),
                        child: Image.network(
                          hospital.imageUrl,
                          fit: BoxFit.fill,
                          width: 100,
                          height: 100,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Stack(
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(15, 5, 0, 0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                    width: 190,
                                    //height: 40,
                                    //color: Colors.grey,
                                    child: Text(
                                        hospital.hospitalName,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(
                                            fontSize: 15,
                                            color: Color(0xff1c335b),
                                            fontWeight: FontWeight.w600,
                                            fontFamily:
                                            'Merriweather Sans '))),
                                const SizedBox(
                                  height: 3,
                                ),
                                Expanded(
                                  flex: 1,
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                            hospital.address,
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            style: const TextStyle(
                                                height: 0.9,
                                                fontSize: 13,
                                                color: ColorConstant.Grey01,
                                                fontWeight: FontWeight.w400,
                                                fontFamily:
                                                'Merriweather Sans')),
                                      ),
                                    ],
                                  ),
                                ),
                                Expanded(
                                  flex: 1,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0),
                                    width: 210,
                                    //color: Colors.black,
                                    child: Row(
                                      mainAxisAlignment:
                                      MainAxisAlignment.start,
                                      //textBaseline: TextBaseline.alphabetic,
                                      children: [
                                        const Icon(
                                          Icons.star,
                                          size: 19,
                                          color: Colors.amber,
                                        ),
                                        const SizedBox(
                                          width: 5,
                                        ),
                                        Text("${hospital.star}",
                                            style: const TextStyle(
                                                height: 0.9,
                                                fontSize: 15,
                                                color: ColorConstant.Grey01,
                                                fontWeight: FontWeight.w500,
                                                fontFamily:
                                                'Merriweather Sans')),
                                        RichText(
                                            text: const TextSpan(children: [
                                              WidgetSpan(
                                                  child: Padding(
                                                    padding:
                                                    EdgeInsets.only(left: 15),
                                                    child: Text("1.2 km ",
                                                        style: TextStyle(
                                                            letterSpacing: 0.2,
                                                            fontSize: 15,
                                                            color: ColorConstant
                                                                .Grey01,
                                                            fontWeight:
                                                            FontWeight.w500,
                                                            fontFamily:
                                                            'Merriweather Sans')),
                                                  )),
                                            ])),
                                        const Text("| ",
                                            style: TextStyle(
                                                height: 0.8,
                                                fontSize: 18,
                                                letterSpacing: 0.1,
                                                color: ColorConstant.Grey01,
                                                fontWeight: FontWeight.w500,
                                                fontFamily:
                                                'Merriweather Sans')),
                                        const Text("Chi tiết",
                                            style: TextStyle(
                                                fontSize: 15,
                                                letterSpacing: 0.1,
                                                color:
                                                ColorConstant.BLueText,
                                                fontWeight: FontWeight.w500,
                                                fontFamily:
                                                'Merriweather Sans'))
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          ))
        ],
      ) : Image.network(
        "https://store.vtctelecom.com.vn/Content/images/no-data.png",
        width: MediaQuery.of(context).size.width,
        fit: BoxFit.fill,
      ),
    );
  }

}
