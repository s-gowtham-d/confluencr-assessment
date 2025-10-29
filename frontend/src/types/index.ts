export interface ChartData {
  name?: string;
  calls?: number;
  duration?: number;
  hour?: string;
}

export interface OutcomeData {
  name: string;
  value: number;
  color: string;
}

export interface UserData {
  id?: number;
  email: string;
  call_volume_data: ChartData[];
  updated_at: string;
}
