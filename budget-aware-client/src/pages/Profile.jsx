import Swal from "sweetalert2";
import CustomButton from "../components/ui/Button";
import { getProfile, logoutUser } from "../redux/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { error, loading,profile } = useSelector((state) => state.auth);
  
  useEffect(() => {
   dispatch(getProfile());
  }, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg",
      },
    });

    if (!result.isConfirmed) return;

    const res = await dispatch(logoutUser());

    if (res.payload?.success) {
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
          JD
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{profile&&profile.email.split("@")[0].toUpperCase()}</h2>
        <p className="text-sm text-gray-500">johndoe@example.com</p>
      </div>

      <div className="my-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Account Details
        </h3>
        <p className="text-gray-600">
          <span className="font-medium">Joined:</span> {profile?.createdAt.split("T")[0]}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Status:</span> Active
        </p>
      </div>

      <CustomButton
        label="Logout"
        variant="destructive"
        className="w-full mt-4"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Profile;
