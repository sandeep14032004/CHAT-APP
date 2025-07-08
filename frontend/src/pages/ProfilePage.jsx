import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  User,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [tempImg, setTempImg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.profilePic) {
      setSelectedImg(authUser.profilePic);
    }
  }, [authUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setTempImg(reader.result);
  };

  const handleSave = async () => {
    if (!tempImg) return;
    await updateProfile({ profilePic: tempImg });
    setSelectedImg(tempImg);
    setTempImg(null);
  };

  const handleCancel = () => {
    setTempImg(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-base-100 text-base-content"
    >
      <div className=" mx-auto px-2 py-8 max-w-6xl">
        <motion.div className="bg-base-200 backdrop-blur-xl border border-primary/10 rounded-3xl p-10 shadow-lg space-y-10">
          {/* 🔙 Back Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-base-content bg-base-100 hover:bg-base-200 hover:text-primary px-5 py-2.5 rounded-lg transition-all duration-200 border border-primary/30 hover:border-primary shadow-glass hover:shadow-md"
            >
              <ArrowLeftCircle className="w-5 h-5 transition-colors duration-200" />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm font-medium text-base-content bg-base-100 hover:bg-base-200 hover:text-secondary px-5 py-2.5 rounded-lg transition-all duration-200 border border-secondary/30 hover:border-secondary shadow-glass hover:shadow-md"
            >
              <ArrowRightCircle className="w-5 h-5 transition-colors duration-200" />
              Chat
            </motion.button>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-wide text-primary">
              My Profile
            </h1>
            <p className="text-sm text-base-content/60 mt-2">
              Update your avatar
            </p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group transition-all duration-300"
            >
              <img
                src={tempImg || selectedImg || "/avatar.png"}
                alt="Avatar"
                className="size-36 rounded-full border-4 border-primary/30 shadow-md object-cover transition-all duration-300 group-hover:shadow-primary"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </motion.div>

            {tempImg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 mt-3"
              >
                <button
                  onClick={handleSave}
                  disabled={isUpdatingProfile}
                  className="btn btn-sm px-6 btn-primary text-primary-content"
                >
                  {isUpdatingProfile ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUpdatingProfile}
                  className="btn btn-sm px-6 btn-neutral"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {!tempImg && (
              <p className="text-sm text-base-content/60 mt-2">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera to change image"}
              </p>
            )}
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="transition-all duration-200"
            >
              <p className="text-xs text-base-content/60 mb-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </p>
              <div className="px-4 py-3 rounded-xl bg-base-300 border border-base-300">
                {authUser?.fullName}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="transition-all duration-200"
            >
              <p className="text-xs text-base-content/60 mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </p>
              <div className="px-4 py-3 rounded-xl bg-base-300 border border-base-300">
                {authUser?.email}
              </div>
            </motion.div>
          </div>

          {/* Account Info */}
          <div className="bg-base-200 border border-primary/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Account Details
            </h2>
            <div className="text-sm space-y-4">
              <div className="flex justify-between border-b border-base-300 pb-2">
                <span className="text-base-content/60">Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Status</span>
                <span className="text-success font-semibold">Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
