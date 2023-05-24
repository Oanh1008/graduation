import 'package:care_bookie_app/models/user_login.dart';
import 'package:care_bookie_app/view/pages/account_page/change_password_user.dart';
import 'package:care_bookie_app/view/pages/layouts_page/navbar_layout.dart';
import 'package:care_bookie_app/view_model/login_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../../res/constants/colors.dart';
import '../../../utils/enums.dart';
import '../../../view_model/update_user_page_view_model.dart';

class PersonalInformation extends StatefulWidget {
  const PersonalInformation({Key? key}) : super(key: key);

  @override
  State<PersonalInformation> createState() => _PersonalInformationState();
}

class _PersonalInformationState extends State<PersonalInformation> {
  final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey =
  GlobalKey<ScaffoldMessengerState>();
  final TextEditingController _textEditingController = TextEditingController();

  @override
  void dispose() {
    _textEditingController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    var updateUserPageViewModel =
        Provider.of<UpdateUserPageViewModel>(context, listen: false);
    var loginPageViewModel =
        Provider.of<LoginPageViewModel>(context, listen: false);
    updateUserPageViewModel.images = [];
    updateUserPageViewModel.setUserLogin(loginPageViewModel.userLogin);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorConstant.BackGroundColor,
        appBar: AppBar(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(10),
            ),
          ),
          backgroundColor: ColorConstant.BackGroundColor,
          title: const Center(
            child: Text(
              "Thông tin cá nhân",
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.w500,
                fontSize: 18,
                fontFamily: 'Poppins',
              ),
            ),
          ),
          leading: IconButton(
            icon: const Icon(
              IconlyBroken.arrowLeft,
              color: Colors.black,
              size: 25,
            ),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context)=> const NavbarLayout(index: 4)));
            },
          ),
          bottomOpacity: 0.0,
          elevation: 0.0,
        ),
        body: SingleChildScrollView(
            scrollDirection: Axis.vertical, child: content()));
  }

  Widget content() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(15, 0, 15, 8.0),
      child: Column(
        children: [
          lastName(),
          firstName(),
          email(),
          phone(),
          gender(),
          birthDay(),
          address(),
          changePassword(),
          saveAccount(),
        ],
      ),
    );
  }

  Widget avatar() {
    return Consumer<UpdateUserPageViewModel>(
        builder: (context, updateUserPageViewModel, child) => Padding(
            padding: const EdgeInsets.fromLTRB(20, 20, 0, 0),
            child: Center(
              child: Stack(
                children: [
                  Container(
                    width: 135,
                    height: 135,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(100),
                      boxShadow: [
                        BoxShadow(
                            color: Colors.grey.withOpacity(0.1),
                            spreadRadius: 0.1,
                            blurRadius: 2,
                            offset: const Offset(0, 5))
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(13),
                    child: Container(
                      width: 110,
                      height: 110,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        boxShadow: [
                          BoxShadow(
                              color: Colors.grey.withOpacity(0.2),
                              spreadRadius: 1,
                              blurRadius: 2,
                              offset: const Offset(0, 5))
                        ],
                      ),
                      child: InkWell(
                        onTap: () {
                          updateUserPageViewModel.selectImages(context);
                        },
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(60),
                          child: updateUserPageViewModel.images.isEmpty
                              ? Image.network(
                                  updateUserPageViewModel.userUpdate!.imageUrl,
                                  width: double.infinity,
                                  height: double.infinity,
                                  fit: BoxFit.cover,
                                )
                              : FutureBuilder(
                                  future:
                                      updateUserPageViewModel.images[0].file,
                                  builder: (context, snapshot) {
                                    if (snapshot.hasData) {
                                      return Image.file(
                                        snapshot.data!,
                                        fit: BoxFit.cover,
                                      );
                                    } else {
                                      return const CircularProgressIndicator();
                                    }
                                  },
                                ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            )));
  }

  Widget lastName() {
    return Consumer<UpdateUserPageViewModel>(
      builder: (context, updateUserPageViewModel, child) => Column(
        children: [
          avatar(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Họ",
                    style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 15,
                        fontWeight: FontWeight.w500,
                        color: ColorConstant.Grey01),
                  ),
                  Text(
                    updateUserPageViewModel.userUpdate!.lastName,
                    style: const TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                        color: Colors.black),
                  ),
                ],
              ),
              IconButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      _textEditingController.text =
                          updateUserPageViewModel.userUpdate!.lastName;
                      return AlertDialog(
                        title: const Text("Sửa đổi họ"),
                        content: TextField(
                          controller: _textEditingController,
                          decoration: const InputDecoration(
                            labelText: 'họ',
                          ),
                        ),
                        actions: <Widget>[
                          TextButton(
                            child: const Text('Hủy'),
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                          ),
                          TextButton(
                            child: const Text('Lưu'),
                            onPressed: () {
                              updateUserPageViewModel
                                  .setLastName(_textEditingController.text);
                              Navigator.of(context).pop();
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
                icon: const Icon(
                  IconlyBold.edit,
                  size: 30,
                  color: ColorConstant.Grey01,
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Color(0xFFF3EFEF),
            thickness: 1.5,
          ),
        ],
      ),
    );
  }

  Widget firstName() {
    return Consumer<UpdateUserPageViewModel>(
      builder: (context, updateUserPageViewModel, child) => Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Tên",
                    style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 15,
                        fontWeight: FontWeight.w500,
                        color: ColorConstant.Grey01),
                  ),
                  Text(
                    updateUserPageViewModel.userUpdate!.firstName,
                    style: const TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                        color: Colors.black),
                  ),
                ],
              ),
              IconButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      _textEditingController.text =
                          updateUserPageViewModel.userUpdate!.firstName;
                      return AlertDialog(
                        title: const Text("Sửa đổi tên"),
                        content: TextField(
                          controller: _textEditingController,
                          decoration: const InputDecoration(
                            labelText: 'Tên',
                          ),
                        ),
                        actions: <Widget>[
                          TextButton(
                            child: const Text('Hủy'),
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                          ),
                          TextButton(
                            child: const Text('Lưu'),
                            onPressed: () {
                              updateUserPageViewModel
                                  .setFirstName(_textEditingController.text);
                              Navigator.of(context).pop();
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
                icon: const Icon(
                  IconlyBold.edit,
                  size: 30,
                  color: ColorConstant.Grey01,
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Color(0xFFF3EFEF),
            thickness: 1.5,
          ),
        ],
      ),
    );
  }

  Widget email() {
    return Consumer<UpdateUserPageViewModel>(
        builder: (context, updateUserPageViewModel, child) => Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Địa chỉ Email",
                          style: TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 15,
                              fontWeight: FontWeight.w500,
                              color: ColorConstant.Grey01),
                        ),
                        Text(
                          updateUserPageViewModel.userUpdate!.email,
                          style: const TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 16,
                              fontWeight: FontWeight.w400,
                              color: Colors.black),
                        ),
                      ],
                    ),
                    IconButton(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            _textEditingController.text =
                                updateUserPageViewModel.userUpdate!.email;
                            return AlertDialog(
                              title: const Text("Thay đổi email"),
                              content: TextField(
                                controller: _textEditingController,
                                decoration: const InputDecoration(
                                  labelText: 'Tên',
                                ),
                              ),
                              actions: <Widget>[
                                TextButton(
                                  child: const Text('Hủy'),
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                ),
                                TextButton(
                                  child: const Text('Lưu'),
                                  onPressed: () {
                                    updateUserPageViewModel
                                        .setEmail(_textEditingController.text);

                                    Navigator.of(context).pop();
                                  },
                                ),
                              ],
                            );
                          },
                        );
                      },
                      icon: const Icon(
                        IconlyBold.edit,
                        size: 30,
                        color: ColorConstant.Grey01,
                      ),
                    ),
                  ],
                ),
                const Divider(
                  height: 30,
                  color: Color(0xFFF3EFEF),
                  thickness: 1.5,
                ),
              ],
            ));
  }

  Widget phone() {
    return Consumer<UpdateUserPageViewModel>(
        builder: (context, updateUserPageViewModel, child) => Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Số điện thoại",
                          style: TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 15,
                              fontWeight: FontWeight.w500,
                              color: ColorConstant.Grey01),
                        ),
                        Text(
                          updateUserPageViewModel.userUpdate!.phone,
                          style: const TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 16,
                              fontWeight: FontWeight.w400,
                              color: Colors.black),
                        ),
                      ],
                    ),
                    IconButton(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            _textEditingController.text =
                                updateUserPageViewModel.userUpdate!.phone;
                            return AlertDialog(
                              title: const Text("Thay đổi số điện thoại"),
                              content: TextField(
                                controller: _textEditingController,
                                decoration: const InputDecoration(
                                  labelText: 'Tên',
                                ),
                              ),
                              actions: <Widget>[
                                TextButton(
                                  child: const Text('Hủy'),
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                ),
                                TextButton(
                                  child: const Text('Lưu'),
                                  onPressed: () {
                                    updateUserPageViewModel
                                        .setPhone(_textEditingController.text);
                                    Navigator.of(context).pop();
                                  },
                                ),
                              ],
                            );
                          },
                        );
                      },
                      icon: const Icon(
                        IconlyBold.edit,
                        size: 30,
                        color: ColorConstant.Grey01,
                      ),
                    ),
                  ],
                ),
                const Divider(
                  height: 30,
                  color: Color(0xFFF3EFEF),
                  thickness: 1.5,
                ),
              ],
            ));
  }

  Widget gender() {
    return Consumer<UpdateUserPageViewModel>(
      builder: (context, updateUserPageViewModel, child) => Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Giới tính",
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 15,
                      fontWeight: FontWeight.w500,
                      color: ColorConstant.Grey01,
                    ),
                  ),
                  Text(
                    updateUserPageViewModel.userUpdate!.gender == 1
                        ? 'Nam'
                        : 'Nữ',
                    style: const TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      fontWeight: FontWeight.w400,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
              IconButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text("Chọn giới tính"),
                        content: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            ListTile(
                              title: const Text('Nam'),
                              leading: Radio<Gender>(
                                value: Gender.male,
                                groupValue: updateUserPageViewModel
                                            .userUpdate!.gender ==
                                        1
                                    ? Gender.male
                                    : Gender.female,
                                onChanged: (Gender? newValue) {
                                  newValue! == Gender.male
                                      ? updateUserPageViewModel.setGender(1)
                                      : updateUserPageViewModel.setGender(0);
                                  Navigator.of(context).pop();
                                },
                              ),
                            ),
                            ListTile(
                              title: const Text('Nữ'),
                              leading: Radio<Gender>(
                                value: Gender.female,
                                groupValue: updateUserPageViewModel
                                            .userUpdate!.gender ==
                                        1
                                    ? Gender.male
                                    : Gender.female,
                                onChanged: (Gender? newValue) {
                                  newValue! == Gender.male
                                      ? updateUserPageViewModel.setGender(1)
                                      : updateUserPageViewModel.setGender(0);
                                  Navigator.of(context).pop();
                                },
                              ),
                            ),
                          ],
                        ),
                        actions: <Widget>[
                          TextButton(
                            child: const Text('Hủy'),
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
                icon: const Icon(
                  IconlyBold.edit,
                  size: 30,
                  color: ColorConstant.Grey01,
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Color(0xFFF3EFEF),
            thickness: 1.5,
          ),
        ],
      ),
    );
  }

  Widget birthDay() {
    return Consumer<UpdateUserPageViewModel>(
      builder: (context, updateUserPageViewModel, child) => Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Ngày sinh",
                    style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 15,
                        fontWeight: FontWeight.w500,
                        color: ColorConstant.Grey01),
                  ),
                  Text(
                    updateUserPageViewModel.userUpdate!.birthDay,
                    style: const TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                        color: Colors.black),
                  ),
                ],
              ),
              IconButton(
                onPressed: () async {
                  final DateTime? picked = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(1900),
                    lastDate: DateTime(2025),
                  );
                  if (picked != null && picked != DateTime.now()) {
                    updateUserPageViewModel
                        .setBirthDay(DateFormat('dd-MM-yyyy').format(picked));
                  }
                },
                icon: const Icon(
                  IconlyBold.edit,
                  size: 30,
                  color: ColorConstant.Grey01,
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Color(0xFFF3EFEF),
            thickness: 1.5,
          ),
        ],
      ),
    );
  }

  Widget address() {
    return Consumer<UpdateUserPageViewModel>(
        builder: (context, updateUserPageViewModel, child) => Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Địa chỉ",
                          style: TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 15,
                              fontWeight: FontWeight.w500,
                              color: ColorConstant.Grey01),
                        ),
                        SizedBox(
                          width: 280,
                          child: Text(
                            overflow: TextOverflow.ellipsis,
                            maxLines: 3,
                            updateUserPageViewModel.userUpdate!.address,
                            style: const TextStyle(
                                fontFamily: 'Poppins',
                                fontSize: 16,
                                overflow: TextOverflow.ellipsis,
                                fontWeight: FontWeight.w400,
                                color: Colors.black),
                          ),
                        ),
                      ],
                    ),
                    IconButton(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            _textEditingController.text =
                                updateUserPageViewModel.userUpdate!.address;
                            return AlertDialog(
                              title: const Text("Thay đổi địa chỉ"),
                              content: TextField(
                                controller: _textEditingController,
                                decoration: const InputDecoration(
                                  labelText: 'Địa chỉ',
                                ),
                              ),
                              actions: <Widget>[
                                TextButton(
                                  child: const Text('Hủy'),
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                ),
                                TextButton(
                                  child: const Text('Lưu'),
                                  onPressed: () {
                                    updateUserPageViewModel.setAddress(
                                        _textEditingController.text);
                                    Navigator.of(context).pop();
                                  },
                                ),
                              ],
                            );
                          },
                        );
                      },
                      icon: const Icon(
                        IconlyBold.edit,
                        size: 30,
                        color: ColorConstant.Grey01,
                      ),
                    ),
                  ],
                ),
                const Divider(
                  height: 30,
                  color: Color(0xFFF3EFEF),
                  thickness: 1.5,
                ),
              ],
            ));
  }

  Widget changePassword() {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      width: double.maxFinite,
      height: 50,
      decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(10)),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: Colors.white,
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        onPressed: () {
          showModalBottomSheet(
            context: context,
            isScrollControlled: true,
            isDismissible: true,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              ),
            ),
            builder: (context) {
              return const FractionallySizedBox(
                heightFactor: 0.43,
                child: ClipRRect(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                      topRight: Radius.circular(30),
                    ),
                    child: ChangePasswordUser()),
              );
            },
          );
        },
        child: const Text(
          "Đổi mật khẩu",
          style: TextStyle(
              fontFamily: 'Montserrat',
              fontSize: 18,
              fontWeight: FontWeight.w500,
              color: Colors.black),
        ),
      ),
    );
  }

  Widget saveAccount() {
    return Consumer2<UpdateUserPageViewModel, LoginPageViewModel>(
      builder: (context, updateUserPageViewModel, loginPageViewModel, child) =>
          Container(
        width: double.maxFinite,
        height: 50,
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(10)),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            primary: Colors.blueAccent,
            elevation: 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
          onPressed: () async {
            if (updateUserPageViewModel.images.isNotEmpty) {
              UserLogin userLogin = await updateUserPageViewModel.saveAccount();
              loginPageViewModel.setUserLogin(userLogin);
              Fluttertoast.showToast(
                  msg: "Chỉnh sửa thông tin thành công",
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.CENTER,
                  timeInSecForIosWeb: 1,
                  backgroundColor: Colors.red,
                  textColor: Colors.white,
                  fontSize: 16.0
              );
              

              loginPageViewModel.userLogin = UserLogin(
                  id: updateUserPageViewModel.userUpdate!.userId,
                  lastName: updateUserPageViewModel.userUpdate!.lastName,
                  firstName: updateUserPageViewModel.userUpdate!.firstName,
                  birthDay: updateUserPageViewModel.userUpdate!.birthDay,
                  email: updateUserPageViewModel.userUpdate!.email,
                  gender: updateUserPageViewModel.userUpdate!.gender,
                  phone: updateUserPageViewModel.userUpdate!.phone,
                  address: updateUserPageViewModel.userUpdate!.address,
                  image: updateUserPageViewModel.userUpdate!.imageUrl);

            } else {
              Fluttertoast.showToast(
                  msg: "Chưa chỉnh sửa thông tin",
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.CENTER,
                  timeInSecForIosWeb: 1,
                  backgroundColor: Colors.red,
                  textColor: Colors.white,
                  fontSize: 16.0
              );
            }
          },
          child: const Text(
            "Lưu chỉnh sửa",
            style: TextStyle(
                fontFamily: 'Montserrat',
                fontSize: 18,
                fontWeight: FontWeight.w500,
                color: Colors.white),
          ),
        ),
      ),
    );
  }
}
