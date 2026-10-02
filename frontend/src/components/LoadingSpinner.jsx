// src/components/LoadingSpinner.jsx

const LoadingSpinner = () => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        py-16
      "
      role="status"
    >
      {/* Tailwind animated spinner */}
      <div
        className="
          h-10
          w-10
          animate-spin
          rounded-full
          border-4
          border-slate-200
          border-t-blue-600
        "
      ></div>

      <p
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        Loading books...
      </p>
    </div>
  );
};

export default LoadingSpinner;