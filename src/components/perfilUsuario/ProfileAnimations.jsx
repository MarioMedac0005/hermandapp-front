import React from "react";

const ProfileAnimations = () => {
    return (
        <style dangerouslySetInnerHTML={{
            __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}} />
    );
};

export default ProfileAnimations;
