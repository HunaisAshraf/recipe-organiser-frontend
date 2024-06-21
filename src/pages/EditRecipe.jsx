import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [recipe, setRecipe] = useState("");
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
    const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const getRecipeData = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/recipe/get-recipe/${id}`);

      if (data.success) {
        setItem(data.recipe.item);
        setRecipe(data.recipe.ingredient);
        setImage(data.recipe.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditRecipe = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const newRecipe = {
        item: item,
        ingredient: recipe,
        image: newImage || image,
      };

      const { data } = await axiosInstance.put(
        `/api/recipe/edit-recipe/${id}`,
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

  useEffect(() => {
    getRecipeData();
  }, []);

  return (
    <div className="flex justify-center">
      <form className="w-[500px]" onSubmit={handleEditRecipe}>
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
        <div className="my-4">
          <input
            className="w-full border outline-none p-3"
            type="file"
            placeholder="image"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
          {newImage ? (
            <img src={URL.createObjectURL(newImage)} alt={item} />
          ) : (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/${image}`}
              alt={item}
            />
          )}
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

export default EditRecipe;
