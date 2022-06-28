import { EnvironmentId } from '@/portainer/environments/types';
import { TagId } from '@/portainer/tags/types';

export interface EdgeGroup {
  Id: number;
  Name: string;
  Dynamic: boolean;
  TagIDs: TagId[];
  Endpoints: EnvironmentId[];
  PartialMatch: boolean;
}
