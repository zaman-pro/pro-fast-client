import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FiEdit, FiEye, FiTrash2, FiX, FiCheck } from "react-icons/fi";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // console.log(parcels);

  const handleView = (id) => {
    console.log("View parcel", id);
    // You could open a modal or navigate to a detail page
  };

  const handlePay = (id) => {
    console.log("Proceed to payment for", id);
    // Implement your payment logic
  };

  const handleDelete = (id) => {
    toast.dismiss();
    toast(
      (t) => (
        <div className="text-sm max-w-xs">
          <div className="flex items-center gap-3 mb-2">
            <FiTrash2 className="text-2xl text-error" />
            <p>
              Are you sure you want to <b>delete</b> this parcel?
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm btn-outline btn-secondary"
              onClick={() => toast.dismiss(t.id)}
            >
              <FiX size={16} /> Cancel
            </button>
            <button
              className="btn btn-sm btn-error text-white"
              onClick={async () => {
                toast.dismiss(t.id);

                toast.promise(
                  axiosSecure.delete(`/parcels/${id}`),
                  {
                    loading: "Deleting parcel...",
                    success: () => {
                      refetch();
                      return "Parcel deleted successfully!";
                    },
                    error: "Failed to delete parcel.",
                  },
                  {
                    id: `delete-progress-${id}`,
                  }
                );
              }}
            >
              <FiCheck size={16} /> Confirm
            </button>
          </div>
        </div>
      ),
      {
        id: `delete-confirm-${id}`,
        duration: 4000,
      }
    );
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString();
  };

  return (
    <div>
      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="max-w-[180px] truncate">{parcel.parcelName}</td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td>{formatDate(parcel.creation_date)}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleView(parcel._id)}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </button>
                  {parcel.payment_status === "unpaid" && (
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-xs btn-primary text-black"
                    >
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
