var qlnv = new QLNV();
var validation = new Validation();
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  // Tạo đối tượng nhân viên
  var isValid = true;
  if(isAdd){
    isValid &=
    validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập 4-6 ký tự",
      4,
      6
    ) &&
    validation.kiemTraTKTonTai(
      taiKhoan,
      "tbTKNV",
      "(*) Tài khoản đã tồn tại",
      qlnv.arr
    );

  }
  
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập họ tên") &&
    validation.checkPattern(
      hoTen,
      "tbTen",
      "(*) Vui lòng nhập ký tự",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "tbEmail",
      "(*) Vui lòng nhập đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu"
    ) &&
    validation.checkPattern(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập đúng định dạng",
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập 6-10 ký tự",
      6,
      10
    );

  isValid &=
    validation.kiemTraRong(ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm") &&
    validation.checkPattern(
      ngayLam,
      "tbNgay",
      "(*) Vui lòng nhập đúng định dạng",
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
    );

  isValid &=
    validation.kiemTraRong(
      luongCB,
      "tbLuongCB",
      "(*) Vui lòng nhập lương cơ bản"
    ) &&
    validation.checkAbout(
      luongCB,
      "tbLuongCB",
      "(*) Vui lòng nhập đúng số lương cơ bản",
      /^[0-9]+$/,
      1000000,
      20000000
    );

  isValid &=
    validation.kiemTraRong(chucVu, "tbChucVu", "(*) Vui lòng nhập chức vụ") &&
    validation.kiemTraCV("chucvu", "tbChucVu", "(*) Vui lòng nhập chức vụ");

  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập số giờ làm"
    ) &&
    validation.checkAbout(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập đúng số giờ làm",
      /^[0-9]+$/,
      80,
      200
    );

  if (isValid) {
    var nv = new NV(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    );
    nv.tinhTongLuong();
    nv.xepLoaiNV();
    return nv;
  }
  return null;
}

function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];

    content += `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
             <td>
                 <button onclick="xoaNV('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
                 <button onclick="suaNV('${nv.taiKhoan}')" class="btn btn-primary">Sửa</button>
             </td>
        </tr>
        `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

// Sửa NV
function suaNV(taiKhoan) {
  var nv = qlnv.layThongTinChiTietNV(taiKhoan);

  // DOM tới các thẻ input => show info nv
  getEle("tknv").value = nv.taiKhoan;
  getEle("tknv").disabled = true;

  getEle("name").value = nv.hoTen;
  getEle("email").value = nv.email;
  getEle("password").value = nv.matKhau;
  getEle("datepicker").value = nv.ngayLam;
  getEle("luongCB").value = nv.luongCB;
  getEle("chucvu").value = nv.chucVu;
  getEle("gioLam").value = nv.gioLam;
}

// Tìm nhân viên theo loại
function timLoaiNV() {
  var searchName = getEle("searchName").value;
  var mangTimKiem = qlnv.timKiemNV(searchName);
  console.log(mangTimKiem);
  renderTable(mangTimKiem);
}
getEle("searchName").addEventListener("keyup", timLoaiNV);

// Cập nhật NV
function btnCapNhat() {
  var nv = layThongTinNV(false);

  qlnv.capNhatNV(nv);
  renderTable(qlnv.arr);
  setLocalStorage();
}

// Xóa NV
function xoaNV(taiKhoan) {
  qlnv._xoaNV(taiKhoan);
  renderTable(qlnv.arr);
  setLocalStorage();
}

// Thêm nhân viên
function btnthemNV() {
  var nv = layThongTinNV(true);

  if (nv) {
    qlnv.themNV(nv);

    renderTable(qlnv.arr);

    setLocalStorage();
  }
}

function getLocalStorage() {
  if (localStorage.getItem("QLNV")) {
    var dataString = localStorage.getItem("QLNV");
    // convert string => JSON
    var dataJson = JSON.parse(dataString);
    // nạp dữ liệu lại cho dssv
    qlnv.arr = dataJson;
    // render lại table
    renderTable(qlnv.arr);
  }
}

function setLocalStorage() {
  var dataString = JSON.stringify(qlnv.arr);
  localStorage.setItem("QLNV", dataString);
}
