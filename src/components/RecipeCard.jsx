import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ id, item, recipe, image, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-4">
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{item}</h1>
        <p className="text-gray-600">{recipe}</p>
      </div>
      <div className="flex-1">
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${image}`}
          alt={item}
          className="h-24 w-36"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/edit-recipe/${id}`)}
          className="px-3 py-2 text-white font-semibold rounded bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="px-3 py-2 text-white font-semibold rounded bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
