import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const AddParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const servicesCenter = useLoaderData();

  //   unique region
  const uniqueRegions = [...new Set(servicesCenter.map((item) => item.region))];

  //   watch
  const parcelType = watch("parcelType");
  const weight = parseFloat(watch("parcelWeight"));
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  //   district by region
  const getDistrictsByRegion = (region) =>
    servicesCenter
      .filter((item) => item.region === region)
      .map((item) => item.district);

  const senderDistricts = senderRegion
    ? getDistrictsByRegion(senderRegion)
    : [];
  const receiverDistricts = receiverRegion
    ? getDistrictsByRegion(receiverRegion)
    : [];

  // delivery cost
  const calculateCost = () => {
    const isSameCity = senderRegion === receiverRegion;

    if (parcelType === "document") {
      return isSameCity ? 60 : 80;
    }

    if (weight <= 3) {
      return isSameCity ? 110 : 150;
    } else {
      const extraKg = Math.ceil(weight - 3);
      const extraCost = extraKg * 40;
      return isSameCity ? 110 + extraCost : 150 + extraCost + 40;
    }
  };

  // Submit handler
  const onSubmit = (data) => {
    const cost = calculateCost();

    toast.custom((t) => (
      <div className="bg-white border rounded-xl shadow-xl p-6 text-center space-y-4 w-[300px]">
        <h3 className="font-bold text-lg">Confirm Delivery</h3>
        <p className="text-sm">
          Total Delivery Cost: <strong>৳{cost}</strong>
        </p>
        <button
          className="btn btn-sm bg-[#0AB010] text-white rounded-full px-6"
          onClick={() => {
            const parcelData = {
              ...data,
              cost,
              created_by: user?.email,
              payment_status: "unpaid",
              delivery_status: "not_collected",
              creation_date: new Date().toISOString(),
              tracking_id: generateTrackingID(),
            };
            // Save to DB (replace this with actual call)
            console.log("Parcel Saved:", parcelData);
            toast.dismiss(t.id);
            toast.success("Parcel Confirmed & Saved!");
            // reset();
          }}
        >
          Confirm
        </button>
      </div>
    ));

    console.log("Form Data:", data);
  };

  return (
    <div className="px-6 md:px-28 py-20 bg-white rounded-[32px] border border-[#EAECED]">
      <h1 className="text-[40px] md:text-[56px] font-extrabold text-[#03373D] mb-12">
        Add Parcel
      </h1>

      <div className="divider my-0"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Type Toggle */}
        <div>
          <h2 className="text-[28px] font-extrabold my-[30px] text-[#03373D]">
            Enter your parcel details
          </h2>
          <div className="flex gap-12 items-center flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                {...register("parcelType")}
                defaultChecked
                className="appearance-none w-6 h-6 border border-[#0AB010] rounded-full checked:bg-[#0AB010] checked:ring-4 ring-[#D1FADF] transition-all"
              />
              <span className="text-[#03373D] font-semibold">Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
                className="appearance-none w-6 h-6 border border-[#0AB010] rounded-full checked:bg-[#0AB010] checked:ring-4 ring-[#D1FADF] transition-all"
              />
              <span className="text-[#03373D] font-semibold">Not-Document</span>
            </label>
          </div>
        </div>

        {/* Parcel Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">
              Parcel Name
            </label>
            <input
              {...register("parcelName", {
                required: "Parcel Name is required",
              })}
              type="text"
              placeholder="Parcel Name"
              className="input input-bordered w-full placeholder:text-[#94A3B8] rounded-md border-[#CBD5E1]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">
              Parcel Weight (KG)
            </label>
            <input
              {...register("parcelWeight", { required: "Weight is required" })}
              type="number"
              step="0.01"
              placeholder="Parcel Weight (KG)"
              className="input input-bordered w-full placeholder:text-[#94A3B8] rounded-md border-[#CBD5E1]"
            />
          </div>
        </div>

        <div className="divider my-8"></div>

        {/* Sender & Receiver Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <h3 className="text-[18px] font-extrabold text-[#03373D] mb-8">
              Sender Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  label: "Sender Name",
                  name: "senderName",
                  type: "text",
                  placeholder: "Sender Name",
                },
                {
                  label: "Sender Pickup Wire house",
                  name: "senderWarehouse",
                  type: "select",
                  options: senderDistricts, // dynamically populated
                  placeholder: "Select Wire house",
                },
                {
                  label: "Sender Address",
                  name: "senderAddress",
                  type: "text",
                  placeholder: "Address",
                },
                {
                  label: "Sender Contact No",
                  name: "senderContact",
                  type: "text",
                  placeholder: "Sender Contact No",
                },
              ].map(({ label, name, type, placeholder, options }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      {...register(name)}
                      className="select rounded-md border-[#CBD5E1]"
                    >
                      <option value="">{placeholder}</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...register(name)}
                      type={type}
                      placeholder={placeholder}
                      className="input input-bordered placeholder:text-[#94A3B8] rounded-md border-[#CBD5E1]"
                    />
                  )}
                </div>
              ))}

              {/* Region and Instruction (Full Width on desktop) */}
              <div className="md:col-span-2">
                <label className="label">
                  <span className="text-sm font-medium text-[#0F172A] mb-1.5">
                    Your Region
                  </span>
                </label>
                <select
                  {...register("senderRegion")}
                  className="select rounded-md border-[#CBD5E1] w-full"
                >
                  <option value="">Select your region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">
                  <span className="text-sm font-medium text-[#0F172A] mb-1.5">
                    Pickup Instruction
                  </span>
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Pickup Instruction"
                  className="textarea placeholder:text-[#94A3B8] rounded-md border-[#CBD5E1] w-full h-28"
                />
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="text-[18px] font-extrabold text-[#03373D] mb-8">
              Receiver Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  label: "Receiver Name",
                  name: "receiverName",
                  type: "text",
                  placeholder: "Receiver Name",
                },
                {
                  label: "Receiver Delivery Wire house",
                  name: "receiverWarehouse",
                  type: "select",
                  options: receiverDistricts, // dynamically populated
                  placeholder: "Select Wire house",
                },
                {
                  label: "Receiver Address",
                  name: "receiverAddress",
                  type: "text",
                  placeholder: "Receiver Address",
                },
                {
                  label: "Receiver Contact No",
                  name: "receiverContact",
                  type: "text",
                  placeholder: "Receiver Contact No",
                },
              ].map(({ label, name, type, placeholder, options }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      {...register(name)}
                      className="select rounded-md border-[#CBD5E1]"
                    >
                      <option value="">{placeholder}</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...register(name)}
                      type={type}
                      placeholder={placeholder}
                      className="input input-bordered placeholder:text-[#94A3B8] rounded-md border-[#CBD5E1]"
                    />
                  )}
                </div>
              ))}

              {/* Region and Instruction (Full Width on desktop) */}
              <div className="md:col-span-2">
                <label className="label">
                  <span className="text-sm font-medium text-[#0F172A] mb-1.5">
                    Receiver Region
                  </span>
                </label>
                <select
                  {...register("receiverRegion")}
                  className="select rounded-md border-[#CBD5E1] w-full"
                >
                  <option value="">Select your region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">
                  <span className="text-sm font-medium text-[#0F172A] mb-1.5">
                    Delivery Instruction
                  </span>
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Delivery Instruction"
                  className="textarea  placeholder:text-[#94A3B8] rounded-md border-[#CBD5E1] w-full h-28"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-black my-12">* PickUp Time 4pm-7pm Approx.</p>

        <div>
          <button type="submit" className="btn px-8 font-medium bg-[#CAEB66]">
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcel;
