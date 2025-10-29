const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseService = {
  async getUserData(email: string) {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/analytics_data?email=eq.${email}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Failed to load user data");
  },

  async saveUserData(email: string, callVolumeData, isUpdate: boolean) {
    const dataToSave = {
      email,
      call_volume_data: callVolumeData,
      updated_at: new Date().toISOString(),
    };

    const method = isUpdate ? "PATCH" : "POST";
    const url = isUpdate
      ? `${SUPABASE_URL}/rest/v1/analytics_data?email=eq.${email}`
      : `${SUPABASE_URL}/rest/v1/analytics_data`;

    const response = await fetch(url, {
      method,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(dataToSave),
    });

    if (!response.ok) {
      throw new Error("Failed to save data");
    }
    return await response.json();
  },
};
