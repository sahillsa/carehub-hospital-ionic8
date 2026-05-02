import {
  MenuItem,
  PatientItem,
  PermissionRow,
  ResourceItem,
  RoleKey,
  RoleWorkspace,
  ScheduleSlot,
  TaskItem
} from './hospital.models';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid-outline' },
  { id: 'patients', label: 'Patients', icon: 'people-outline' },
  { id: 'schedule', label: 'Schedule', icon: 'calendar-outline' },
  { id: 'operations', label: 'Operations', icon: 'business-outline' },
  { id: 'access', label: 'Access', icon: 'key-outline' }
];

export const ROLE_ORDER: RoleKey[] = [
  'admin',
  'doctor',
  'nursing',
  'allied',
  'support',
  'pharmacy',
  'lab',
  'frontdesk'
];

const patient = (
  name: string,
  bed: string,
  severity: string,
  note: string,
  owner: string,
  eta: string
): PatientItem => ({ name, bed, severity, note, owner, eta });

const task = (title: string, priority: string, area: string, due: string): TaskItem => ({
  title,
  priority,
  area,
  due
});

const slot = (time: string, title: string, note: string): ScheduleSlot => ({ time, title, note });

const resource = (
  label: string,
  value: string,
  percent: number,
  level: ResourceItem['level']
): ResourceItem => ({ label, value, percent, level });

export const ROLES: Record<RoleKey, RoleWorkspace> = {
  admin: {
    label: 'Admin',
    icon: 'shield-checkmark-outline',
    summary: 'Hospital-wide census, staffing, risk, finance, admissions, and compliance control.',
    status: 'Operational',
    metrics: [
      { label: 'Bed occupancy', value: '86%', note: 'Surgical ward is tight', icon: 'business-outline', trend: 'alert' },
      { label: 'Open admissions', value: '42', note: '12 waiting for bed allocation', icon: 'log-in-outline', trend: 'down' },
      { label: 'Staff gaps', value: '7', note: 'Nursing and transport highest', icon: 'people-outline', trend: 'alert' },
      { label: 'Discharge target', value: '31', note: '18 complete before noon', icon: 'checkmark-done-outline', trend: 'up' }
    ],
    patients: [
      patient('Aarav Mehta', 'ICU 4', 'Critical', 'Sepsis watch', 'Dr. Rao', '15 min'),
      patient('Maya Kapoor', 'Ward B 218', 'High', 'Post-op review', 'Dr. Nair', '25 min'),
      patient('Kabir Singh', 'ED Bay 7', 'Moderate', 'Bed pending', 'Admin Desk', '40 min'),
      patient('Riya Shah', 'Peds 104', 'Stable', 'Discharge files', 'Nursing Lead', 'Today')
    ],
    tasks: [
      task('Approve ICU overflow plan', 'Critical', 'Capacity desk', '10:30'),
      task('Confirm night shift roster', 'High', 'Nursing office', '11:00'),
      task('Review pharmacy stock variance', 'Moderate', 'Procurement', '14:00'),
      task('Sign monthly safety audit', 'Low', 'Quality office', '17:00')
    ],
    schedule: [
      slot('09:00', 'Bed huddle', 'Admin, nursing, ED, support leads'),
      slot('10:30', 'Incident review', 'Clinical governance room'),
      slot('13:00', 'Vendor and stock check', 'Pharmacy store'),
      slot('16:00', 'Discharge acceleration', 'Ward managers')
    ],
    resources: [
      resource('ICU beds', '3 free', 72, 'warning'),
      resource('General beds', '38 free', 64, 'good'),
      resource('Ambulances', '5 active', 83, 'warning'),
      resource('Ventilators', '11 ready', 58, 'good'),
      resource('Housekeeping tickets', '18 open', 76, 'warning'),
      resource('Billing holds', '9 cases', 44, 'good')
    ],
    handover: [
      'North wing elevator service window at 14:30.',
      'Two agency nurses confirmed for night ICU cover.',
      'Insurance desk flagged 5 high value pre-authorizations.'
    ]
  },
  doctor: {
    label: 'Doctor',
    icon: 'medical-outline',
    summary: 'Clinical rounds, patient review, orders, diagnostics, consults, and escalation notes.',
    status: 'Rounding',
    metrics: [
      { label: 'Active patients', value: '28', note: '6 need consultant review', icon: 'people-outline', trend: 'up' },
      { label: 'Critical alerts', value: '4', note: 'Vitals and lab triggers', icon: 'pulse-outline', trend: 'alert' },
      { label: 'Orders pending', value: '13', note: 'Imaging and medication', icon: 'document-text-outline', trend: 'down' },
      { label: 'Discharges', value: '5', note: '2 summaries left', icon: 'exit-outline', trend: 'up' }
    ],
    patients: [
      patient('Aarav Mehta', 'ICU 4', 'Critical', 'Culture results in', 'Dr. Rao', 'Now'),
      patient('Maya Kapoor', 'Ward B 218', 'High', 'Pain score 8', 'Dr. Nair', '15 min'),
      patient('Dev Iyer', 'Cardio 302', 'High', 'Troponin repeat', 'Dr. Thomas', '30 min'),
      patient('Fatima Ali', 'Ward A 112', 'Stable', 'Discharge summary', 'Dr. Rao', 'Today')
    ],
    tasks: [
      task('Review ABG for Aarav Mehta', 'Critical', 'ICU 4', '09:45'),
      task('Sign antibiotic order set', 'High', 'Ward B', '10:15'),
      task('Call cardiology consult', 'High', 'Cardio 302', '11:00'),
      task('Complete discharge summaries', 'Moderate', 'Desk', '15:30')
    ],
    schedule: [
      slot('08:30', 'ICU rounds', 'ICU 1-8'),
      slot('10:00', 'Ward B rounds', 'Post-op patients'),
      slot('12:30', 'Multidisciplinary review', 'Conference 2'),
      slot('15:00', 'Family counselling', 'Patient lounge')
    ],
    resources: [
      resource('Lab results', '21 new', 69, 'warning'),
      resource('Imaging queue', '8 pending', 58, 'good'),
      resource('Consult requests', '6 open', 74, 'warning'),
      resource('E-prescriptions', '16 drafts', 62, 'good'),
      resource('Procedure rooms', '2 free', 45, 'good'),
      resource('Clinical alerts', '4 active', 82, 'critical')
    ],
    handover: [
      'Aarav Mehta: monitor lactate trend after fluids.',
      'Maya Kapoor: pain team consult requested.',
      'Fatima Ali: family wants discharge after 17:00.'
    ]
  },
  nursing: {
    label: 'Nursing Staff',
    icon: 'heart-outline',
    summary: 'Bedside care, medication rounds, vitals, intake-output, handovers, and care plans.',
    status: 'Medication round',
    metrics: [
      { label: 'Medication due', value: '19', note: '5 in next 20 minutes', icon: 'medkit-outline', trend: 'alert' },
      { label: 'Vitals overdue', value: '8', note: 'Ward B and ICU stepdown', icon: 'thermometer-outline', trend: 'down' },
      { label: 'Care plans', value: '36', note: '31 updated this shift', icon: 'clipboard-outline', trend: 'up' },
      { label: 'Patient calls', value: '12', note: '3 repeated calls', icon: 'call-outline', trend: 'alert' }
    ],
    patients: [
      patient('Maya Kapoor', 'Ward B 218', 'High', 'Pain reassessment', 'Nurse Jaya', '10 min'),
      patient('Riya Shah', 'Peds 104', 'Stable', 'Oral meds due', 'Nurse Elena', '15 min'),
      patient('Imran Khan', 'Ward C 330', 'Moderate', 'Fall risk check', 'Nurse Amir', '25 min'),
      patient('Neha Bose', 'Ward B 221', 'Stable', 'IV site review', 'Nurse Jaya', '45 min')
    ],
    tasks: [
      task('Administer 10:00 medications', 'Critical', 'Ward B', '10:00'),
      task('Record ICU stepdown vitals', 'High', 'Stepdown', '10:20'),
      task('Update fluid balance chart', 'Moderate', 'Ward C', '12:00'),
      task('Prepare shift handover notes', 'Moderate', 'Nursing station', '18:00')
    ],
    schedule: [
      slot('07:45', 'Shift handover', 'Nursing station'),
      slot('09:30', 'Medication round', 'Ward B'),
      slot('12:00', 'Wound dressing block', 'Treatment room'),
      slot('17:30', 'Evening vitals sweep', 'Assigned beds')
    ],
    resources: [
      resource('Medication carts', '4 ready', 63, 'good'),
      resource('IV pumps', '9 free', 52, 'good'),
      resource('Fall-risk beds', '7 active', 70, 'warning'),
      resource('Call bells', '12 open', 81, 'critical'),
      resource('Isolation rooms', '2 ready', 66, 'warning'),
      resource('Dressings stock', 'Low', 84, 'critical')
    ],
    handover: [
      'Ward B 218: pain score must be reassessed after medication.',
      'Ward C 330: high fall risk, bed alarm active.',
      'Peds 104: parent education pending before discharge.'
    ]
  },
  allied: {
    label: 'Allied Health',
    icon: 'body-outline',
    summary: 'Physiotherapy, radiology coordination, nutrition, occupational therapy, and rehab plans.',
    status: 'Therapy block',
    metrics: [
      { label: 'Therapy sessions', value: '24', note: '7 high priority', icon: 'walk-outline', trend: 'up' },
      { label: 'Assessments', value: '11', note: 'Diet and rehab mixed', icon: 'accessibility-outline', trend: 'alert' },
      { label: 'Reports pending', value: '6', note: 'Imaging and functional notes', icon: 'document-outline', trend: 'down' },
      { label: 'Discharge readiness', value: '15', note: 'Mobility clearance needed', icon: 'home-outline', trend: 'up' }
    ],
    patients: [
      patient('Kabir Singh', 'ED Bay 7', 'Moderate', 'Mobility screen', 'Physio Team', '20 min'),
      patient('Fatima Ali', 'Ward A 112', 'Stable', 'Discharge diet plan', 'Dietitian', 'Today'),
      patient('Maya Kapoor', 'Ward B 218', 'High', 'Post-op ambulation', 'Physio Team', '35 min'),
      patient("Luis D'Souza", 'Neuro 410', 'High', 'Swallow assessment', 'Speech Team', '50 min')
    ],
    tasks: [
      task('Complete post-op mobility review', 'High', 'Ward B 218', '10:30'),
      task('Nutrition review for Fatima Ali', 'Moderate', 'Ward A 112', '12:00'),
      task("Speech assessment for Luis D'Souza", 'High', 'Neuro 410', '13:15'),
      task('Upload rehab progress notes', 'Moderate', 'Allied desk', '16:00')
    ],
    schedule: [
      slot('09:00', 'Physio ward round', 'Ward B'),
      slot('11:00', 'Swallow assessment', 'Neuro 410'),
      slot('13:30', 'Nutrition counselling', 'Diet clinic'),
      slot('15:30', 'Rehab board review', 'Allied hub')
    ],
    resources: [
      resource('Therapy rooms', '3 free', 47, 'good'),
      resource('Wheelchairs', '12 ready', 64, 'good'),
      resource('Diet reviews', '8 open', 73, 'warning'),
      resource('Imaging escorts', '5 needed', 78, 'warning'),
      resource('Speech evals', '3 urgent', 82, 'critical'),
      resource('Rehab notes', '6 drafts', 55, 'good')
    ],
    handover: [
      'Maya Kapoor needs first walk with nursing present.',
      "Luis D'Souza requires aspiration precautions until speech review.",
      'Diet clinic has two renal plan updates pending.'
    ]
  },
  support: {
    label: 'Support & Facility',
    icon: 'construct-outline',
    summary: 'Housekeeping, transport, biomedical equipment, security, maintenance, linen, and facilities.',
    status: 'Ticket response',
    metrics: [
      { label: 'Open tickets', value: '32', note: '8 marked urgent', icon: 'ticket-outline', trend: 'alert' },
      { label: 'Room turns', value: '14', note: 'ED and Ward A priority', icon: 'bed-outline', trend: 'down' },
      { label: 'Equipment checks', value: '18', note: '3 biomedical escalations', icon: 'hardware-chip-outline', trend: 'down' },
      { label: 'Transport jobs', value: '11', note: 'Imaging escorts highest', icon: 'car-outline', trend: 'up' }
    ],
    patients: [
      patient('Room A118', 'Ward A', 'High', 'Isolation clean', 'Housekeeping', 'Now'),
      patient('MRI Escort', 'Radiology', 'Moderate', 'Patient transfer', 'Transport', '20 min'),
      patient('Pump 44', 'Ward B', 'High', 'Biomedical check', 'BioMed', '30 min'),
      patient('Linen Batch 7', 'Laundry', 'Stable', 'Restock Ward C', 'Facilities', 'Today')
    ],
    tasks: [
      task('Turn over ED isolation bay', 'Critical', 'ED Bay 3', '09:40'),
      task('Escort patient to MRI', 'High', 'Ward A to Radiology', '10:10'),
      task('Inspect infusion pump 44', 'High', 'Ward B', '11:00'),
      task('Replenish sterile linen', 'Moderate', 'Ward C', '13:00')
    ],
    schedule: [
      slot('08:45', 'ED room turn queue', 'Emergency department'),
      slot('10:30', 'Biomedical checks', 'Ward B equipment'),
      slot('13:00', 'Linen restock', 'Ward C and ICU'),
      slot('16:30', 'Security briefing', 'Main entrance')
    ],
    resources: [
      resource('Clean rooms', '18 ready', 59, 'good'),
      resource('Pending cleans', '14 open', 80, 'critical'),
      resource('Transport staff', '6 active', 72, 'warning'),
      resource('Equipment tickets', '8 open', 67, 'warning'),
      resource('Security posts', '9 staffed', 54, 'good'),
      resource('Linen stock', '61%', 61, 'good')
    ],
    handover: [
      'ED Bay 3 needs terminal clean before next patient.',
      'Main entrance scanner intermittent, biomedical notified.',
      'Two transporters assigned to radiology peak window.'
    ]
  },
  pharmacy: {
    label: 'Pharmacy',
    icon: 'flask-outline',
    summary: 'Medication verification, formulary control, stock, controlled drugs, and discharge dispensing.',
    status: 'Verification',
    metrics: [
      { label: 'Orders to verify', value: '27', note: '4 stat medications', icon: 'checkmark-circle-outline', trend: 'alert' },
      { label: 'Discharge meds', value: '12', note: '5 waiting pickup', icon: 'bag-handle-outline', trend: 'down' },
      { label: 'Stock alerts', value: '9', note: 'Antibiotics and dressings', icon: 'cube-outline', trend: 'down' },
      { label: 'Controlled logs', value: '3', note: 'End of shift reconciliation', icon: 'lock-closed-outline', trend: 'up' }
    ],
    patients: [
      patient('Aarav Mehta', 'ICU 4', 'Critical', 'Meropenem verify', 'Pharmacist Lee', 'Now'),
      patient('Fatima Ali', 'Ward A 112', 'Stable', 'Discharge meds', 'Pharmacy Desk', 'Today'),
      patient('Maya Kapoor', 'Ward B 218', 'High', 'Analgesia review', 'Pharmacist Lee', '20 min'),
      patient('Riya Shah', 'Peds 104', 'Stable', 'Dose check', 'Peds Pharmacy', '35 min')
    ],
    tasks: [
      task('Verify stat antibiotic', 'Critical', 'ICU 4', '09:35'),
      task('Resolve analgesia duplicate', 'High', 'Ward B 218', '10:20'),
      task('Prepare discharge packs', 'Moderate', 'Dispensing bay', '12:30'),
      task('Reconcile controlled register', 'High', 'Pharmacy store', '18:00')
    ],
    schedule: [
      slot('09:15', 'Critical order verification', 'Clinical pharmacy queue'),
      slot('11:30', 'Ward B medication review', 'Ward B'),
      slot('14:00', 'Stock count', 'Central pharmacy'),
      slot('17:30', 'Controlled drug reconciliation', 'Secure store')
    ],
    resources: [
      resource('Verified orders', '68 today', 68, 'good'),
      resource('Stat orders', '4 active', 86, 'critical'),
      resource('Discharge packs', '12 open', 71, 'warning'),
      resource('Antibiotic stock', 'Low', 82, 'critical'),
      resource('Cold chain', 'Normal', 41, 'good'),
      resource('Returns', '16 pending', 52, 'good')
    ],
    handover: [
      'Meropenem stock below reorder threshold.',
      'Ward B has duplicate opioid order under review.',
      'Cold chain probe calibrated at 08:00.'
    ]
  },
  lab: {
    label: 'Lab',
    icon: 'flask-outline',
    summary: 'Specimen collection, processing, critical results, blood bank, and reporting turnaround.',
    status: 'Processing',
    metrics: [
      { label: 'Samples queued', value: '63', note: '12 urgent', icon: 'layers-outline', trend: 'down' },
      { label: 'Critical results', value: '5', note: 'Doctor acknowledgement needed', icon: 'warning-outline', trend: 'alert' },
      { label: 'Turnaround', value: '42m', note: 'Chemistry running above target', icon: 'timer-outline', trend: 'down' },
      { label: 'Blood units', value: '28', note: 'O negative watched', icon: 'water-outline', trend: 'up' }
    ],
    patients: [
      patient('Aarav Mehta', 'ICU 4', 'Critical', 'Blood culture', 'Microbiology', 'Now'),
      patient('Dev Iyer', 'Cardio 302', 'High', 'Troponin repeat', 'Chemistry', '10 min'),
      patient('Neha Bose', 'Ward B 221', 'Moderate', 'CBC redraw', 'Phlebotomy', '25 min'),
      patient('Sana Qureshi', 'OB 205', 'Stable', 'Crossmatch', 'Blood Bank', '45 min')
    ],
    tasks: [
      task('Release critical potassium result', 'Critical', 'Chemistry', '09:50'),
      task('Process ICU blood cultures', 'High', 'Microbiology', '10:20'),
      task('Dispatch phlebotomy redraw', 'Moderate', 'Ward B 221', '11:15'),
      task('Confirm crossmatch', 'High', 'Blood bank', '13:00')
    ],
    schedule: [
      slot('08:30', 'Morning specimen pickup', 'All wards'),
      slot('10:00', 'Critical result calls', 'Lab desk'),
      slot('13:00', 'Blood bank stock check', 'Blood bank'),
      slot('16:00', 'Machine maintenance', 'Chemistry bay')
    ],
    resources: [
      resource('Chemistry queue', '31 samples', 75, 'warning'),
      resource('Microbiology queue', '18 samples', 66, 'good'),
      resource('Blood bank', '28 units', 57, 'good'),
      resource('Critical calls', '5 active', 84, 'critical'),
      resource('Collection rounds', '4 left', 61, 'good'),
      resource('Analyzer status', '1 warning', 70, 'warning')
    ],
    handover: [
      'Critical potassium result awaiting doctor acknowledgement.',
      'Analyzer B needs maintenance block at 16:00.',
      'OB 205 crossmatch marked high priority.'
    ]
  },
  frontdesk: {
    label: 'Front Desk',
    icon: 'card-outline',
    summary: 'Registration, appointments, billing, insurance, visitor flow, and patient communication.',
    status: 'Check-in peak',
    metrics: [
      { label: 'Check-ins', value: '73', note: '18 appointments due this hour', icon: 'reader-outline', trend: 'up' },
      { label: 'Billing holds', value: '9', note: 'Insurance desk owns 5', icon: 'cash-outline', trend: 'down' },
      { label: 'Calls waiting', value: '14', note: 'Average wait 3m', icon: 'call-outline', trend: 'down' },
      { label: 'Visitor passes', value: '41', note: 'ICU restrictions active', icon: 'id-card-outline', trend: 'up' }
    ],
    patients: [
      patient('Kabir Singh', 'ED Bay 7', 'Moderate', 'Admission deposit', 'Billing', '20 min'),
      patient('Fatima Ali', 'Ward A 112', 'Stable', 'Discharge billing', 'Cashier', 'Today'),
      patient('OPD Slot 34', 'Clinic 2', 'Stable', 'Late check-in', 'Reception', '10 min'),
      patient('Visitor Desk', 'Main Lobby', 'Moderate', 'ICU pass request', 'Security', '15 min')
    ],
    tasks: [
      task('Clear ED admission deposit', 'High', 'Billing', '10:00'),
      task('Call late OPD patients', 'Moderate', 'Reception', '10:45'),
      task('Submit insurance query replies', 'High', 'Insurance', '12:00'),
      task('Close discharge billing batch', 'Moderate', 'Cashier', '16:30')
    ],
    schedule: [
      slot('09:00', 'OPD check-in rush', 'Main reception'),
      slot('11:00', 'Insurance query review', 'Billing office'),
      slot('14:00', 'Discharge billing', 'Cashier counter'),
      slot('17:00', 'Visitor pass audit', 'Front desk')
    ],
    resources: [
      resource('OPD counters', '6 open', 65, 'good'),
      resource('Insurance cases', '17 open', 74, 'warning'),
      resource('Billing holds', '9 cases', 69, 'warning'),
      resource('Call center', '14 waiting', 82, 'critical'),
      resource('Visitor queue', '21 active', 57, 'good'),
      resource('Discharge files', '11 open', 62, 'good')
    ],
    handover: [
      'ICU visitor restrictions stay active until 18:00.',
      'Five insurance pre-authorizations need updated clinical notes.',
      'Cashier counter 2 closes early for reconciliation.'
    ]
  }
};

export const PERMISSIONS: PermissionRow[] = [
  {
    area: 'Patient chart',
    admin: 'Audit',
    doctor: 'Full clinical',
    nursing: 'Care notes',
    allied: 'Discipline notes',
    support: 'Location only',
    pharmacy: 'Medication profile',
    lab: 'Test profile',
    frontdesk: 'Demographics'
  },
  {
    area: 'Orders',
    admin: 'Review',
    doctor: 'Create and sign',
    nursing: 'Administer',
    allied: 'Request therapy',
    support: 'Service tickets',
    pharmacy: 'Verify meds',
    lab: 'Process tests',
    frontdesk: 'Appointment orders'
  },
  {
    area: 'Scheduling',
    admin: 'All rosters',
    doctor: 'Clinical diary',
    nursing: 'Ward shifts',
    allied: 'Therapy slots',
    support: 'Facility jobs',
    pharmacy: 'Dispensing roster',
    lab: 'Collection rounds',
    frontdesk: 'OPD and billing'
  },
  {
    area: 'Reports',
    admin: 'Full dashboards',
    doctor: 'Clinical outcomes',
    nursing: 'Care quality',
    allied: 'Rehab progress',
    support: 'SLA reports',
    pharmacy: 'Stock and safety',
    lab: 'Turnaround',
    frontdesk: 'Revenue cycle'
  }
];
