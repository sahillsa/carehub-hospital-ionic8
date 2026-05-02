export type RoleKey =
  | 'admin'
  | 'doctor'
  | 'nursing'
  | 'allied'
  | 'support'
  | 'pharmacy'
  | 'lab'
  | 'frontdesk';

export type ViewKey = 'dashboard' | 'patients' | 'schedule' | 'operations' | 'access';

export type TrendKind = 'up' | 'down' | 'alert';

export type ResourceLevel = 'good' | 'warning' | 'critical';

export interface MenuItem {
  id: ViewKey;
  label: string;
  icon: string;
}

export interface MetricItem {
  label: string;
  value: string;
  note: string;
  icon: string;
  trend: TrendKind;
}

export interface PatientItem {
  name: string;
  bed: string;
  severity: string;
  note: string;
  owner: string;
  eta: string;
}

export interface TaskItem {
  title: string;
  priority: string;
  area: string;
  due: string;
}

export interface ScheduleSlot {
  time: string;
  title: string;
  note: string;
}

export interface ResourceItem {
  label: string;
  value: string;
  percent: number;
  level: ResourceLevel;
}

export interface RoleWorkspace {
  label: string;
  icon: string;
  summary: string;
  status: string;
  metrics: MetricItem[];
  patients: PatientItem[];
  tasks: TaskItem[];
  schedule: ScheduleSlot[];
  resources: ResourceItem[];
  handover: string[];
}

export type PermissionRow = {
  area: string;
} & Record<RoleKey, string>;
