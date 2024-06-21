import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleAddCategory = async (e) => {
    try {
      e.preventDefault();
      console.log(category);
      setLoading(true);
      const { data } = await axiosInstance.post("/api/recipe/add-category", {
        category,
      });
      if (data.success) {
        toast.success("category added successfully");
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to add category");
    }
  };

  return (
    <div className="flex justify-center">
      <form className="w-[500px]" onSubmit={handleAddCategory}>
        <Toaster />
        <h1 className="text-3xl font-semibold text-gray-500 my-10">
          Add Category
        </h1>
        <div className="my-4">
          <input
            className="w-full border outline-none p-3"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <button className="bg-blue-950 w-full text-white font-semibold p-3 rounded-md">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddCategory;
