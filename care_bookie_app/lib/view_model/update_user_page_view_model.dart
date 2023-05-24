import 'dart:io';
import 'package:care_bookie_app/models/user_login.dart';
import 'package:care_bookie_app/models/user_update.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/cupertino.dart';
import 'package:wechat_assets_picker/wechat_assets_picker.dart';
import '../api_services/update_user_api.dart';

class UpdateUserPageViewModel extends ChangeNotifier{

  UserUpdate?  userUpdate;

  void setUserLogin(UserLogin user) {
    UserUpdate update = UserUpdate(
        address: user.address,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        birthDay: user.birthDay,
        imageUrl: user.image,
        userId: user.id
    );
    userUpdate = update;
  }

  void setFirstName(String value) {
    userUpdate!.firstName = value;
    notifyListeners();
  }

  void setLastName(String value) {
    userUpdate!.lastName = value;
    notifyListeners();
  }

  void setEmail(String value) {
    userUpdate!.email = value;
    notifyListeners();
  }

  void setPhone(String value) {
    userUpdate!.phone = value;
    notifyListeners();
  }

  void setBirthDay(String value) {
    userUpdate!.birthDay = value;
    notifyListeners();
  }

  void setAddress(String value) {
    userUpdate!.address = value;
    notifyListeners();
  }

  void setGender(int value){
    userUpdate!.gender = value;
    notifyListeners();
  }
  void setImage(String value){
    userUpdate!.imageUrl = value;
    notifyListeners();
  }



  List<AssetEntity> images=[];
  Future<void> selectImages(BuildContext context) async {
    images = [];
    List<AssetEntity>? result = await AssetPicker.pickAssets(context,
        pickerConfig: const AssetPickerConfig(
          maxAssets: 1,
          requestType: RequestType.image,
          selectedAssets: [],
        ));
      images = result!;
      notifyListeners();
  }
  List<String> listImageUrl = [];
  Future<void> uploadImages(List<AssetEntity> images) async {
    listImageUrl = [];
    final storage = FirebaseStorage.instance;
    for (var asset in images) {
      String fileName = DateTime.now().millisecondsSinceEpoch.toString();
      Reference reference = storage.ref().child('images').child(fileName);
      final File? file = await asset.file;
      if (file != null) {
        UploadTask task = reference.putFile(file);
        await task.whenComplete(() => null);
        String imageUrl = await reference.getDownloadURL();
        listImageUrl.add(imageUrl);
        // rest of the code here
      } else {
        // handle error, e.g. file is null
      }
    }
  }


  Future<UserLogin> saveAccount()async{
    await uploadImages(images);
    setImage(listImageUrl[0]);
    return UpdateUserApi.updateAccountUser(userUpdate!);
  }
}