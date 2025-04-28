import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { housewareService } from "../../../services";
import { AuthContext } from "../../../contexts/AuthContext";
import Select from "react-select";

type Inputs = {
  name: string,
  address: string,
  city: { value: string, label: string } | null
}

const CreateStock: React.FC = () => {
  const { control, register, handleSubmit, reset } = useForm<Inputs>();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data: Inputs) => {
    if (!data.name || !data.city || !data.address) {
      alert("Chưa điền đủ thông tin");
      return;
    }

    try {
      const payload = {
        name: data.name,
        city: data.city.value,
        address: data.address,
        userId: user?._id
      };
      const result = await housewareService.create(payload);
      if (result) {
        toast.success('Created successfully!');
        reset();
      } else {
        toast.warning('Created failed!');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const cityOptions = [
    { value: "Hanoi", label: "Hà Nội" },
    { value: "HCM", label: "TP. Hồ Chí Minh" },
    { value: "DaNang", label: "Đà Nẵng" },
    { value: "CanTho", label: "Cần Thơ" },
    { value: "HaGiang", label: "Hà Giang" },
    { value: "CaoBang", label: "Cao Bằng" },
    { value: "BacKan", label: "Bắc Kạn" },
    { value: "TuyenQuang", label: "Tuyên Quang" },
    { value: "LaoCai", label: "Lào Cai" },
    { value: "DienBien", label: "Điện Biên" },
    { value: "LaiChau", label: "Lai Châu" },
    { value: "SonLa", label: "Sơn La" },
    { value: "YenBai", label: "Yên Bái" },
    { value: "HoaBinh", label: "Hòa Bình" },
    { value: "ThaiNguyen", label: "Thái Nguyên" },
    { value: "LangSon", label: "Lạng Sơn" },
    { value: "QuangNinh", label: "Quảng Ninh" },
    { value: "BacGiang", label: "Bắc Giang" },
    { value: "PhuTho", label: "Phú Thọ" },
    { value: "VinhPhuc", label: "Vĩnh Phúc" },
    { value: "BacNinh", label: "Bắc Ninh" },
    { value: "HaiDuong", label: "Hải Dương" },
    { value: "HaiPhong", label: "Hải Phòng" },
    { value: "HungYen", label: "Hưng Yên" },
    { value: "ThaiBinh", label: "Thái Bình" },
    { value: "HaNam", label: "Hà Nam" },
    { value: "NamDinh", label: "Nam Định" },
    { value: "NinhBinh", label: "Ninh Bình" },
    { value: "ThanhHoa", label: "Thanh Hóa" },
    { value: "NgheAn", label: "Nghệ An" },
    { value: "HaTinh", label: "Hà Tĩnh" },
    { value: "QuangBinh", label: "Quảng Bình" },
    { value: "QuangTri", label: "Quảng Trị" },
    { value: "ThuaThienHue", label: "Thừa Thiên Huế" },
    { value: "QuangNam", label: "Quảng Nam" },
    { value: "QuangNgai", label: "Quảng Ngãi" },
    { value: "BinhDinh", label: "Bình Định" },
    { value: "PhuYen", label: "Phú Yên" },
    { value: "KhanhHoa", label: "Khánh Hòa" },
    { value: "NinhThuan", label: "Ninh Thuận" },
    { value: "BinhThuan", label: "Bình Thuận" },
    { value: "KonTum", label: "Kon Tum" },
    { value: "GiaLai", label: "Gia Lai" },
    { value: "DakLak", label: "Đắk Lắk" },
    { value: "DakNong", label: "Đắk Nông" },
    { value: "LamDong", label: "Lâm Đồng" },
    { value: "BinhPhuoc", label: "Bình Phước" },
    { value: "TayNinh", label: "Tây Ninh" },
    { value: "BinhDuong", label: "Bình Dương" },
    { value: "DongNai", label: "Đồng Nai" },
    { value: "BaRiaVungTau", label: "Bà Rịa - Vũng Tàu" },
    { value: "LongAn", label: "Long An" },
    { value: "TienGiang", label: "Tiền Giang" },
    { value: "BenTre", label: "Bến Tre" },
    { value: "TraVinh", label: "Trà Vinh" },
    { value: "VinhLong", label: "Vĩnh Long" },
    { value: "DongThap", label: "Đồng Tháp" },
    { value: "AnGiang", label: "An Giang" },
    { value: "KienGiang", label: "Kiên Giang" },
    { value: "HauGiang", label: "Hậu Giang" },
    { value: "SocTrang", label: "Sóc Trăng" },
    { value: "BacLieu", label: "Bạc Liêu" },
    { value: "CaMau", label: "Cà Mau" },
  ];

  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5">
      <div className="w-full rounded-md bg-white p-5">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <h2 className="text-black text-xl font-semibold mb-6">Add New Houseware</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-black mb-1">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter houseware name"
                className="w-full rounded-md border px-4 py-2"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-black mb-1">City</label>
              <Controller
  name="city"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Select
      {...field}
      options={cityOptions}
      placeholder="Select a city"
      styles={{
        menu: (provided) => ({
          ...provided,
          maxHeight: 150,
          overflowY: "auto",
          overflowX: "hidden",   // ✨ Không bị scroll ngang
        }),
        menuList: (provided) => ({
          ...provided,
          maxHeight: 150,
          overflowY: "auto",
        }),
      }}
    />
  )} 
/> 


            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-black mb-2">Address</label>
            <textarea
              id="address"
              placeholder="Enter houseware address"
              rows={3}
              className="w-full rounded-md border px-4 py-2"
              {...register("address", { required: true })}
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-[#0a162c] text-white py-3 rounded-md">
              Add Houseware
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStock;
