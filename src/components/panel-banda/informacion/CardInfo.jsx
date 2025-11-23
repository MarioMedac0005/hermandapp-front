import React, { useState } from "react";
import Header from "./Header";
import CardInfoHeader from "./CardInfoHeader";
import CardContent from "./CardContent";

function CardInfo() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <div className="w-full">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <Header />

          {/* Card Principal */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header de la Card */}
            <CardInfoHeader isEditing={isEditing} setIsEditing={setIsEditing} />

            {/* Contenido */}
            <CardContent isEditing={isEditing} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CardInfo;
