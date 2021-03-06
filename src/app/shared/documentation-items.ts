const HOME = 'home';
const STATUS = 'status';
const HISTORY = 'history';
export const SECTIONS = {
  [HOME]: 'Home',
  [STATUS]: 'Status',
  [HISTORY]: 'History',
};

export interface User {
  username: string;
  email: string;
}

export interface DeviceData {
  id: number;
  time: Date;
  data: object;
}

export interface DeviceSchema {
  name: string;
  displayName: string;
  dataType: number;
  show: boolean;
  allowControl: boolean;
}

export interface Device {
  id: number;
  name: string;
  displayName: string;
  schema: DeviceSchema[];
  display: object;
  createOn: Date;
  lastConnectOn: Date;
  offlineOn: Date;
  onlineStatus: Date;
}

export enum DeviceDataType {
  integer = 1,
  float,
  boolean,
  string,
}
