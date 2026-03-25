const USE_SUPABASE = false; // Byt bara till true här när du kopplar!!!

export const saveDiploma = async (userId, data) => {
  if (USE_SUPABASE) {
    // return await supabase.from('diplomas').upsert({ user_id: userId, ...data })
  }
  localStorage.setItem(`diploma_${userId}`, JSON.stringify(data));
};

export const getDiploma = async (userId) => {
  if (USE_SUPABASE) {
    // const { data } = await supabase.from('diplomas').select().eq('user_id', userId).single()
    // return data
  }
  const raw = localStorage.getItem(`diploma_${userId}`);
  return raw ? JSON.parse(raw) : null;
};