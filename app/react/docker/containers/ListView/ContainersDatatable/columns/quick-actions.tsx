import { CellProps, Column } from 'react-table';

import { useAuthorizations } from '@/portainer/hooks/useUser';
import { isOfflineEndpoint } from '@/portainer/helpers/endpointHelper';
import { ContainerQuickActions } from '@/react/docker/containers/components/ContainerQuickActions';
import { DockerContainer } from '@/react/docker/containers/types';

import { useTableSettings } from '@@/datatables/useTableSettings';

import { TableSettings } from '../types';
import { useRowContext } from '../RowContext';

export const quickActions: Column<DockerContainer> = {
  Header: 'Quick Actions',
  id: 'actions',
  Cell: QuickActionsCell,
  disableFilters: true,
  disableSortBy: true,
  canHide: true,
  sortType: 'string',
  Filter: () => null,
};

function QuickActionsCell({
  row: { original: container },
}: CellProps<DockerContainer>) {
  const { environment } = useRowContext();

  const offlineMode = isOfflineEndpoint(environment);

  const { settings } = useTableSettings<TableSettings>();

  const { hiddenQuickActions = [] } = settings;

  const wrapperState = {
    showQuickActionAttach: !hiddenQuickActions.includes('attach'),
    showQuickActionExec: !hiddenQuickActions.includes('exec'),
    showQuickActionInspect: !hiddenQuickActions.includes('inspect'),
    showQuickActionLogs: !hiddenQuickActions.includes('logs'),
    showQuickActionStats: !hiddenQuickActions.includes('stats'),
  };

  const someOn =
    wrapperState.showQuickActionAttach ||
    wrapperState.showQuickActionExec ||
    wrapperState.showQuickActionInspect ||
    wrapperState.showQuickActionLogs ||
    wrapperState.showQuickActionStats;

  const isAuthorized = useAuthorizations([
    'DockerContainerStats',
    'DockerContainerLogs',
    'DockerExecStart',
    'DockerContainerInspect',
    'DockerTaskInspect',
    'DockerTaskLogs',
  ]);

  if (offlineMode || !someOn || !isAuthorized) {
    return null;
  }

  return (
    <ContainerQuickActions
      containerId={container.Id}
      nodeName={container.NodeName}
      status={container.Status}
      state={wrapperState}
    />
  );
}
