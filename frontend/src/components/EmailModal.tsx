import React, { useState } from "react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => boolean;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validateEmail = (value: string) => {
    // Simple but effective regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      const success = onSubmit(email);
      if (success) {
        setEmail("");
        setError("");
        onClose();
      }
    } else {
      setError("Please enter a valid email address");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (error && validateEmail(newEmail)) {
      setError("");
    }
  };

  const isValid = validateEmail(email);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-800 to-purple-900 p-8 rounded-2xl border border-purple-500/30 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Enter Your Email</h3>
        <p className="text-purple-300 mb-6">
          We'll save your custom chart data for next time
        </p>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 bg-white/10 border ${
              error ? "border-red-500/70" : "border-purple-500/30"
            } rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 ${
              error
                ? "focus:ring-red-500/70"
                : "focus:ring-purple-500/70"
            }`}
          />
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex-1 px-4 py-3 font-medium rounded-lg transition-colors ${
              isValid
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600/40 text-white/60 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
