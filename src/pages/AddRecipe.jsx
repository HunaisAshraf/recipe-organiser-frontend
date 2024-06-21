import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [recipe, setRecipe] = useState("");
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleAddRecipe = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const newRecipe = {
        item: item,
        ingredient: recipe,
        category,
        image,
      };

      const { data } = await axiosInstance.post(
        "/api/recipe/add-recipe",
        newRecipe,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success("recipe added successfully");
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to add recipe");
      setLoading(false);
    }
  };

  const getCategroy = async () => {
    try {
      const { data } = await axiosInstance.get("/api/recipe/get-all-category");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategroy();
  }, []);

  return (
    <div className="flex justify-center">
      <form className="w-[500px]" onSubmit={handleAddRecipe}>
        <Toaster />
        <h1 className="text-3xl font-semibold text-gray-500 my-10">
          Add Recipe
        </h1>
        <div className="my-4">
          <input
            className="w-full border outline-none p-3"
            type="text"
            placeholder="Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="my-4">
          <input
            className="w-full border outline-none p-3"
            type="text"
            placeholder="Recipe"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
        </div>
        <select
          name=""
          id=""
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 outline-none rounded-md bg-white border w-full"
        >
          <option value="">select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        <div className="my-4">
          <input
            className="w-full border outline-none p-3"
            type="file"
            placeholder="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && <img src={URL.createObjectURL(image)} alt="" />}
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

export default AddRecipe;
