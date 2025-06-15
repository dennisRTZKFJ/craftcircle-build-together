
import React from "react";
import { useNavigate } from "react-router-dom";

interface LoadingStateProps {
  loading: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="text-center">
        <p className="text-gray-600">Tutorial wird geladen...</p>
      </div>
    </div>
  );
};

interface NotFoundStateProps {
  id: string | undefined;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({ id }) => {
  const navigate = useNavigate();

  if (id) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="text-center">
        <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
          Tutorial nicht gefunden
        </h2>
        <p className="text-gray-600 mb-6">Das angeforderte Tutorial konnte nicht gefunden werden.</p>
        <button
          onClick={() => navigate("/creator-dashboard")}
          className="bg-craft-wood hover:bg-craft-dark-wood text-white px-6 py-2 rounded-lg"
        >
          Zurück zum Dashboard
        </button>
      </div>
    </div>
  );
};
