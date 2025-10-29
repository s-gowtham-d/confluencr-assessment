import { useState, useEffect } from "react";
import { supabaseService } from "../services/supabase";
import { type ChartData } from "../types";

export const useUserData = () => {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [callVolumeData, setCallVolumeData] = useState<ChartData[]>([
    { name: "Mon", calls: 145 },
    { name: "Tue", calls: 189 },
    { name: "Wed", calls: 167 },
    { name: "Thu", calls: 201 },
    { name: "Fri", calls: 178 },
    { name: "Sat", calls: 134 },
    { name: "Sun", calls: 98 },
  ]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailSubmitted(true);
      loadUserData(savedEmail);
    }
  }, []);

  const loadUserData = async (userEmail: string) => {
    try {
      const data = await supabaseService.getUserData(userEmail);
      if (data.length > 0 && data[0].call_volume_data) {
        setCallVolumeData(data[0].call_volume_data);
      }
    } catch (error) {
      console.log("No previous data found:", error);
    }
  };

  const submitEmail = (newEmail: string) => {
    if (newEmail && newEmail.includes("@")) {
      localStorage.setItem("userEmail", newEmail);
      setEmail(newEmail);
      setIsEmailSubmitted(true);
      loadUserData(newEmail);
      return true;
    }
    return false;
  };

  return {
    email,
    setEmail,
    isEmailSubmitted,
    callVolumeData,
    setCallVolumeData,
    submitEmail,
    loadUserData,
  };
};
