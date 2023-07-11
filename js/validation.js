function Validation() {
  this.kiemTraRong = function (value, errorID, mess) {
    if (value === "") {
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";

      return false;
    }
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";

    return true;
  };
  this.kiemTraCV = function (chucVu, errorID, mess) {
    var slcChucVu = document.getElementById(chucVu);
    if (slcChucVu.selectedIndex !== 0) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";

      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";

    return false;
  };
  this.kiemTraDoDaiKyTu = function (value, errorID, mess, min, max) {
    if (min <= value.length && value.length <= max) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";

      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";

    return false;
  };
  this.checkPattern = function (value, errorID, mess, letter) {
    if (value.match(letter)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";

      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";

    return false;
  };
  this.checkAbout = function (value, errorID, mess, letter, min, max) {
    if (min <= value.match(letter) && max >= value.match(letter)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";

      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";

    return false;
  };
  this.kiemTraTKTonTai = function (value, errorID, mess, listNV) {
    var isExist = false;
    for (var i = 0; i < listNV.length; i++) {
      var nv = listNV[i];
      if (nv.taiKhoan === value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";

      return false;
    }
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";

    return true;
  };
}
