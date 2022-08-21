import { EnvironmentId } from '@/portainer/environments/types';
import { UserId } from '@/portainer/users/types';
import { EdgeGroup } from '@/react/edge/edge-groups/types';

export enum Type {
  Upgrade = 1,
  Rollback,
}

export enum StatusType {
  Pending,
  Failed,
  Success,
}

interface Status {
  Type: StatusType;
  Error: string;
}

export type EdgeUpdateSchedule = {
  id: number;
  name: string;
  time: number;
  groups: EdgeGroup['Id'][];
  type: Type;
  status: { [key: EnvironmentId]: Status };
  created: number;
  createdBy: UserId;
  version: string;
};
