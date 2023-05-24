  import 'package:care_bookie_app/view/pages/layouts_page/navbar_layout.dart';
import 'package:care_bookie_app/view/pages/login_signup_page/login.dart';
import 'package:care_bookie_app/view_model/bottom_navbar_view_model.dart';
import 'package:care_bookie_app/view_model/change_password_view_model.dart';
import 'package:care_bookie_app/view_model/doctor_detail_view_model.dart';
import 'package:care_bookie_app/view_model/favorite_page_view_model.dart';
import 'package:care_bookie_app/view_model/history_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/history_page_view_model.dart';
import 'package:care_bookie_app/view_model/home_page_view_model.dart';
import 'package:care_bookie_app/view_model/hospital_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/login_page_view_model.dart';
import 'package:care_bookie_app/view_model/order_hospital_data_view_model.dart';
import 'package:care_bookie_app/view_model/reset_password_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_cancel_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_doctor_info_page_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_info_page_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_page_view_model.dart';
import 'package:care_bookie_app/view_model/search_page_view_model.dart';
import 'package:care_bookie_app/view_model/signup_page_view_model.dart';
import 'package:care_bookie_app/view_model/update_user_page_view_model.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final LoginPageViewModel _loginViewModel = LoginPageViewModel();
  late bool isCheckLogin = false;

  @override
  void initState() {
    super.initState();

    _loginViewModel.isLoggedIn().then((value) {
      if (value.phone != '' && value.password != '') {
        print('Login roi');
        _loginViewModel.signIn(value.phone, value.password!);
        setState(() {
          isCheckLogin = true;
        });
      } else {
        print('Chua login');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => _loginViewModel,
        ),
        ChangeNotifierProvider(create: (context) => BottomNavBarViewModel()),
        ChangeNotifierProvider(create: (context) => HomePageViewModel()),
        ChangeNotifierProvider(
            create: (context) => DoctorDetailPageViewModel()),
        ChangeNotifierProvider(
            create: (context) => HospitalDetailPageViewModel()),
        ChangeNotifierProvider(
            create: (context) => ScheduleInfoPageViewModel()),
        ChangeNotifierProvider(
            create: (context) => ScheduleDoctorInfoPageViewModel()),
        ChangeNotifierProvider(create: (context) => HistoryPageViewModel()),
        ChangeNotifierProvider(
            create: (context) => HistoryDetailPageViewModel()),
        ChangeNotifierProvider(
            create: (context) => OrderHospitalDataViewModel()),
        ChangeNotifierProvider(create: (context) => SchedulePageViewModel()),
        ChangeNotifierProvider(
            create: (context) => ScheduleDetailPageViewModel()),
        ChangeNotifierProvider(create: (context) => ScheduleCancelViewModel()),
        ChangeNotifierProvider(create: (context) => FavoritePageViewModel()),
        ChangeNotifierProvider(create: (context) => SearchPageViewModel()),
        ChangeNotifierProvider(create: (context) => SignupPageViewModel()),
        ChangeNotifierProvider(
          create: (context) => UpdateUserPageViewModel(),
        ),
        ChangeNotifierProvider(
          create: (context) => ResetPasswordViewModel(),
        ),
        ChangeNotifierProvider(
          create: (context) => ChangePasswordViewModel(),
        )
      ],
      child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Flutter Demo',
          theme: ThemeData(
            fontFamily: 'Golos' 'Arimo' 'Poppins' 'Merienda',
          ),
          home: isCheckLogin ? const NavbarLayout(index: 0) : const Login()),
    );
  }
}
