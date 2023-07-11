function NV(_taiKhoan,_hoTen,_email,_matKhau,_ngayLam,_luongCB,_chucVu,_gioLam){
    this.taiKhoan=_taiKhoan;
    this.hoTen=_hoTen;
    this.email=_email;
    this.matKhau=_matKhau;
    this.ngayLam=_ngayLam;
    this.luongCB=_luongCB;
    this.chucVu=_chucVu;
    this.gioLam=_gioLam;
    this.tongLuong=0;
    this.xepLoai="";


    this.tinhTongLuong=function(){
        if(this.chucVu=="Sếp"){
            this.tongLuong=parseFloat(this.luongCB)*3;
        }else if(this.chucVu=="Trưởng phòng"){
            this.tongLuong=parseFloat(this.luongCB)*2;
        }else if(this.chucVu=="Nhân viên"){
            this.tongLuong=parseFloat(this.luongCB)*1;
        }
    }
    this.xepLoaiNV = function(){
        if(this.gioLam<160){
            this.xepLoai = "Trung Bình";
        }else if(this.gioLam>=160 && this.gioLam<176){
            this.xepLoai = "Khá";
        }else if(this.gioLam>=176 && this.gioLam<192){
            this.xepLoai = "Giỏi";
        }else if(this.gioLam>=192)
            this.xepLoai = "Xuất sắc";
    }

}