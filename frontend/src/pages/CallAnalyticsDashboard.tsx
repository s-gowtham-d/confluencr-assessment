import React, { useState } from "react";
import { Phone, Clock, TrendingUp } from "lucide-react";
import { type ChartData, type OutcomeData, type UserData } from "../types";
import { Header } from "../components/Header";
import { StatsCard } from "../components/StatCard";
import { EditableChart } from "../components/EditableChart";
import { DurationChart } from "../components/DurationChart";
import { OutcomeChart } from "../components/OutcomeChart";
import { PeakHoursChart } from "../components/PeakHoursChart";
import { EmailModal } from "../components/EmailModal";
import { OverwriteModal } from "../components/OverwriteModal";
import { useUserData } from "../hooks/useUserData";
import { supabaseService } from "../services/supabase";
import DotGrid from "../components/background/DotGrid";
import GlitchText from "../components/GlitchText";

const Dashboard: React.FC = () => {
  const { email, isEmailSubmitted, callVolumeData, setCallVolumeData, submitEmail } =
    useUserData();

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showOverwriteModal, setShowOverwriteModal] = useState(false);
  const [previousData, setPreviousData] = useState<UserData | null>(null);
  const [pendingData, setPendingData] = useState<ChartData[]>([]);

  // Static data
  const durationData: ChartData[] = [
    { name: "Mon", duration: 4.2 },
    { name: "Tue", duration: 5.1 },
    { name: "Wed", duration: 3.8 },
    { name: "Thu", duration: 6.2 },
    { name: "Fri", duration: 4.9 },
    { name: "Sat", duration: 3.5 },
    { name: "Sun", duration: 2.8 },
  ];

  const outcomeData: OutcomeData[] = [
    { name: "Successful", value: 620, color: "#10b981" },
    { name: "Failed", value: 89, color: "#ef4444" },
    { name: "Abandoned", value: 43, color: "#f59e0b" },
  ];

  const peakHoursData: ChartData[] = [
    { hour: "9 AM", calls: 45 },
    { hour: "11 AM", calls: 78 },
    { hour: "1 PM", calls: 92 },
    { hour: "3 PM", calls: 67 },
    { hour: "5 PM", calls: 53 },
  ];

  const totalCalls = callVolumeData.reduce((sum, d) => sum + (d.calls || 0), 0);
  const avgDuration = (
    durationData.reduce((sum, d) => sum + (d.duration || 0), 0) / durationData.length
  ).toFixed(1);
  const successRate = (
    (outcomeData[0].value / outcomeData.reduce((sum, d) => sum + d.value, 0)) *
    100
  ).toFixed(1);

  const handleEditRequest = () => setShowEmailModal(true);

  const checkAndSaveData = async (newData: ChartData[]) => {
    setPendingData(newData);
    try {
      const data = await supabaseService.getUserData(email);
      if (data.length > 0) {
        setPreviousData(data[0]);
        setShowOverwriteModal(true);
      } else {
        await saveDataToSupabase(newData, false);
      }
    } catch {
      await saveDataToSupabase(newData, false);
    }
  };

  const saveDataToSupabase = async (data: ChartData[], isUpdate: boolean) => {
    try {
      await supabaseService.saveUserData(email, data, isUpdate);
      setCallVolumeData(data);
      setShowOverwriteModal(false);
      setPreviousData(null);
      setPendingData([]);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving to Supabase. Data saved locally only.");
      setCallVolumeData(data);
      setShowOverwriteModal(false);
    }
  };

  const handleOverwriteConfirm = () => saveDataToSupabase(pendingData, true);
  const handleOverwriteCancel = () => {
    setShowOverwriteModal(false);
    setPreviousData(null);
    setPendingData([]);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900  to-slate-900 overflow-hidden">
      {/* Background PixelBlast — fixed behind everything */}
      <div className="absolute inset-0 ">
        <Header email={email} isEmailSubmitted={isEmailSubmitted} />

        <DotGrid
          dotSize={3}
          gap={15}
          baseColor="#5227FF"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center pointer-events-none select-none">
        <GlitchText
          speed={1}
          enableShadows
          enableOnHover
          className="text-6xl md:text-7xl font-extrabold text-white mb-4"
        >
          Call Analytics Dashboard
        </GlitchText>

        {/* Subtitle */}
        <p className="text-slate-300 text-lg md:text-xl max-w-xl">
          Track, visualize, and optimize your call performance metrics with real-time data.
        </p>

        {/* Scroll hint */}
        <div className="absolute bottom-10 flex flex-col items-center animate-bounce">
          <span className="text-slate-400 mb-2">Scroll Down to Edit Charts</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>



      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative ">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={Phone}
            label="Total Calls"
            value={totalCalls}
            iconColor="text-purple-400"
            bgColor="bg-purple-500/20"
          />
          <StatsCard
            icon={Clock}
            label="Avg Duration"
            value={`${avgDuration} min`}
            iconColor="text-blue-400"
            bgColor="bg-blue-500/20"
          />
          <StatsCard
            icon={TrendingUp}
            label="Success Rate"
            value={`${successRate}%`}
            iconColor="text-green-400"
            bgColor="bg-green-500/20"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditableChart
            data={callVolumeData}
            onSave={checkAndSaveData}
            onEdit={handleEditRequest}
            isEmailSubmitted={isEmailSubmitted}
          />
          <DurationChart data={durationData} />
          <OutcomeChart data={outcomeData} />
          <PeakHoursChart data={peakHoursData} />
        </div>
      </div>

      {/* Modals */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={submitEmail}
      />
      <OverwriteModal
        isOpen={showOverwriteModal}
        previousData={previousData}
        onConfirm={handleOverwriteConfirm}
        onCancel={handleOverwriteCancel}
      />
    </div>
  );
};

export default Dashboard;
