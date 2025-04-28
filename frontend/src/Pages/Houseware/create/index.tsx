import React, { useState, useRef, useEffect, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { housewareService } from "../../../services";
import { AuthContext } from "../../../contexts/AuthContext";

type Inputs = {
  name: string,
  address: string,
  city: string
};

const CreateStock: React.FC = () => {
  const cities = [
    "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "An Giang", "Bà Rịa - Vũng Tàu",
    "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương",
    "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
    "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang",
    "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
    "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên",
    "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
    "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh",
    "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch
  } = useForm<Inputs>();
  const { user } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleCities, setVisibleCities] = useState<string[]>([]);
  const [cityPage, setCityPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cityInput = watch("city");

  const citiesPerPage = 5;

  const loadMoreCities = () => {
    const nextCities = cities.slice(0, (cityPage + 1) * citiesPerPage);
    setVisibleCities(nextCities);
    setCityPage(prev => prev + 1);
  };

  const handleScroll = () => {
    if (!dropdownRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreCities();
    }
  };

  useEffect(() => {
    if (showDropdown) {
      setVisibleCities(cities.slice(0, citiesPerPage));
      setCityPage(1);
    }
  }, [showDropdown]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.name || !data.city || !data.address) {
      alert("Chưa điền đủ thông tin");
      return;
    }

    try {
      const payload = {
        ...data,
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

  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5">
      <div className="w-full rounded-md bg-white p-5">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <h2 className="text-black text-xl font-semibold mb-6">
            Add New Houseware
          </h2>

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

            <div className="relative">
              <label htmlFor="city" className="block text-sm font-semibold text-black mb-1">City</label>
              <input
                id="city"
                type="text"
                placeholder="Select a city"
                className="w-full rounded-md border px-4 py-2"
                onFocus={() => setShowDropdown(true)}
                value={cityInput}
                readOnly
              />
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  onScroll={handleScroll}
                  className="absolute mt-1 max-h-48 w-full overflow-y-auto rounded-md border bg-white shadow-lg z-10"
                >
                  {visibleCities.map((city) => (
                    <div
                      key={city}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setValue("city", city);
                        setShowDropdown(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
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
