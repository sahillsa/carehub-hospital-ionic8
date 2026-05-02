import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonModal,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSplitPane,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  accessibilityOutline,
  addCircleOutline,
  alertCircleOutline,
  arrowDownOutline,
  arrowUpOutline,
  bagHandleOutline,
  bedOutline,
  bodyOutline,
  businessOutline,
  calendarOutline,
  callOutline,
  carOutline,
  cardOutline,
  cashOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  clipboardOutline,
  closeOutline,
  constructOutline,
  cubeOutline,
  documentOutline,
  documentTextOutline,
  exitOutline,
  flaskOutline,
  gridOutline,
  hardwareChipOutline,
  heartOutline,
  homeOutline,
  idCardOutline,
  keyOutline,
  layersOutline,
  lockClosedOutline,
  logInOutline,
  medicalOutline,
  medkitOutline,
  notificationsOutline,
  openOutline,
  peopleOutline,
  personCircleOutline,
  pulseOutline,
  readerOutline,
  shieldCheckmarkOutline,
  thermometerOutline,
  ticketOutline,
  timerOutline,
  walkOutline,
  warningOutline,
  waterOutline
} from 'ionicons/icons';

import { MENU_ITEMS, PERMISSIONS, ROLE_ORDER, ROLES } from './hospital.data';
import {
  MetricItem,
  PatientItem,
  ResourceItem,
  RoleKey,
  RoleWorkspace,
  ScheduleSlot,
  TaskItem,
  TrendKind,
  ViewKey
} from './hospital.models';

type ModalMode = 'patient' | 'resource' | 'newPatient' | 'handover' | 'escalation' | 'notices' | 'profile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IonApp,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonModal,
    IonNote,
    IonPage,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSplitPane,
    IonTextarea,
    IonTitle,
    IonToolbar
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly menuItems = MENU_ITEMS;
  readonly permissions = PERMISSIONS;
  readonly roleKeys = ROLE_ORDER;
  readonly roles = ROLES;

  roleKey: RoleKey = 'admin';
  viewKey: ViewKey = 'dashboard';
  query = '';
  modalOpen = false;
  modalMode: ModalMode = 'notices';
  selectedPatient?: PatientItem;
  selectedResource?: ResourceItem;

  private readonly completedTasks = new Set<string>();

  constructor() {
    addIcons({
      'accessibility-outline': accessibilityOutline,
      'add-circle-outline': addCircleOutline,
      'alert-circle-outline': alertCircleOutline,
      'arrow-down-outline': arrowDownOutline,
      'arrow-up-outline': arrowUpOutline,
      'bag-handle-outline': bagHandleOutline,
      'bed-outline': bedOutline,
      'body-outline': bodyOutline,
      'business-outline': businessOutline,
      'calendar-outline': calendarOutline,
      'call-outline': callOutline,
      'car-outline': carOutline,
      'card-outline': cardOutline,
      'cash-outline': cashOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'clipboard-outline': clipboardOutline,
      'close-outline': closeOutline,
      'construct-outline': constructOutline,
      'cube-outline': cubeOutline,
      'document-outline': documentOutline,
      'document-text-outline': documentTextOutline,
      'exit-outline': exitOutline,
      'flask-outline': flaskOutline,
      'grid-outline': gridOutline,
      'hardware-chip-outline': hardwareChipOutline,
      'heart-outline': heartOutline,
      'home-outline': homeOutline,
      'id-card-outline': idCardOutline,
      'key-outline': keyOutline,
      'layers-outline': layersOutline,
      'lock-closed-outline': lockClosedOutline,
      'log-in-outline': logInOutline,
      'medical-outline': medicalOutline,
      'medkit-outline': medkitOutline,
      'notifications-outline': notificationsOutline,
      'open-outline': openOutline,
      'people-outline': peopleOutline,
      'person-circle-outline': personCircleOutline,
      'pulse-outline': pulseOutline,
      'reader-outline': readerOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'thermometer-outline': thermometerOutline,
      'ticket-outline': ticketOutline,
      'timer-outline': timerOutline,
      'walk-outline': walkOutline,
      'warning-outline': warningOutline,
      'water-outline': waterOutline
    });
  }

  get activeRole(): RoleWorkspace {
    return this.roles[this.roleKey];
  }

  get filteredPatients(): PatientItem[] {
    return this.filterItems(this.activeRole.patients, ['name', 'bed', 'severity', 'note', 'owner']);
  }

  get filteredTasks(): TaskItem[] {
    return this.filterItems(this.activeRole.tasks, ['title', 'priority', 'area', 'due']);
  }

  get filteredSchedule(): ScheduleSlot[] {
    return this.filterItems(this.activeRole.schedule, ['time', 'title', 'note']);
  }

  get filteredResources(): ResourceItem[] {
    return this.filterItems(this.activeRole.resources, ['label', 'value', 'level']);
  }

  get secondaryRoleKeys(): RoleKey[] {
    return this.roleKeys.filter((key) => key !== this.roleKey).slice(0, 4);
  }

  get modalTitle(): string {
    if (this.modalMode === 'patient') {
      return this.selectedPatient?.name ?? 'Patient';
    }

    if (this.modalMode === 'resource') {
      return this.selectedResource?.label ?? 'Resource';
    }

    if (this.modalMode === 'newPatient') {
      return 'New patient';
    }

    if (this.modalMode === 'handover') {
      return 'Shift handover';
    }

    if (this.modalMode === 'escalation') {
      return 'Escalation';
    }

    if (this.modalMode === 'profile') {
      return 'Current user';
    }

    return 'Notifications';
  }

  setRole(value: unknown): void {
    if (typeof value !== 'string' || !this.roleKeys.includes(value as RoleKey)) {
      return;
    }

    this.roleKey = value as RoleKey;
    this.query = '';
  }

  setView(view: ViewKey): void {
    this.viewKey = view;
  }

  setQuery(value: string | null | undefined): void {
    this.query = value ?? '';
  }

  openPatient(patient: PatientItem): void {
    this.selectedPatient = patient;
    this.selectedResource = undefined;
    this.modalMode = 'patient';
    this.modalOpen = true;
  }

  openResource(resource: ResourceItem): void {
    this.selectedResource = resource;
    this.selectedPatient = undefined;
    this.modalMode = 'resource';
    this.modalOpen = true;
  }

  openModal(mode: ModalMode): void {
    this.selectedPatient = undefined;
    this.selectedResource = undefined;
    this.modalMode = mode;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  toggleTask(taskItem: TaskItem): void {
    const key = this.taskKey(taskItem);

    if (this.completedTasks.has(key)) {
      this.completedTasks.delete(key);
      return;
    }

    this.completedTasks.add(key);
  }

  isTaskDone(taskItem: TaskItem): boolean {
    return this.completedTasks.has(this.taskKey(taskItem));
  }

  taskKey(taskItem: TaskItem): string {
    return `${this.roleKey}-${taskItem.title}`;
  }

  trendIcon(trend: TrendKind): string {
    if (trend === 'up') {
      return 'arrow-up-outline';
    }

    if (trend === 'down') {
      return 'arrow-down-outline';
    }

    return 'warning-outline';
  }

  trendLabel(trend: TrendKind): string {
    if (trend === 'up') {
      return 'On track';
    }

    if (trend === 'down') {
      return 'Watch';
    }

    return 'Needs attention';
  }

  severityClass(value: string): string {
    const normalized = value.toLowerCase();

    if (normalized === 'critical') {
      return 'critical';
    }

    if (normalized === 'high') {
      return 'warning';
    }

    if (normalized === 'stable' || normalized === 'low') {
      return 'good';
    }

    if (normalized === 'moderate') {
      return 'violet';
    }

    return 'info';
  }

  currentShiftLabel(): string {
    const now = new Date();
    const hour = now.getHours();
    const date = new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric'
    }).format(now);

    if (hour < 12) {
      return `Morning, ${date}`;
    }

    if (hour < 18) {
      return `Afternoon, ${date}`;
    }

    return `Night, ${date}`;
  }

  trackByRole(_: number, key: RoleKey): RoleKey {
    return key;
  }

  trackByView(_: number, item: { id: ViewKey }): ViewKey {
    return item.id;
  }

  trackByMetric(_: number, item: MetricItem): string {
    return item.label;
  }

  trackByPatient(_: number, item: PatientItem): string {
    return item.name;
  }

  trackByTask(_: number, item: TaskItem): string {
    return item.title;
  }

  trackBySchedule(_: number, item: ScheduleSlot): string {
    return item.time + item.title;
  }

  trackByResource(_: number, item: ResourceItem): string {
    return item.label;
  }

  private filterItems<T>(items: T[], fields: Array<keyof T>): T[] {
    const query = this.query.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter((item) =>
      fields.some((field) => String(item[field]).toLowerCase().includes(query))
    );
  }
}
