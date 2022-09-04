import { Column } from 'react-table';
import { useMutation, useQueryClient } from 'react-query';
import { Trash2, Users } from 'react-feather';

import { notifySuccess } from '@/portainer/services/notifications';
import { promiseSequence } from '@/portainer/helpers/promise-utils';
import { Team, TeamId } from '@/react/portainer/users/teams/types';
import { deleteTeam } from '@/react/portainer/users/teams/teams.service';
import { confirmDeletionAsync } from '@/portainer/services/modal.service/confirm';

import { Datatable } from '@@/datatables';
import { Button } from '@@/buttons';
import { buildNameColumn } from '@@/datatables/NameCell';
import { createPersistedStore } from '@@/datatables/types';

const tableKey = 'teams';

const columns: readonly Column<Team>[] = [
  buildNameColumn('Name', 'Id', 'portainer.teams.team'),
] as const;

interface Props {
  teams: Team[];
  isAdmin: boolean;
}

const store = createPersistedStore(tableKey);

export function TeamsDatatable({ teams, isAdmin }: Props) {
  const { handleRemove } = useRemoveMutation();

  return (
    <Datatable
      dataset={teams}
      columns={columns}
      storageKey={tableKey}
      settingsStore={store}
      titleOptions={{ title: 'Teams', icon: Users }}
      renderTableActions={(selectedRows) =>
        isAdmin && (
          <Button
            color="dangerlight"
            onClick={() => handleRemoveClick(selectedRows)}
            disabled={selectedRows.length === 0}
            icon={Trash2}
          >
            Remove
          </Button>
        )
      }
      emptyContentLabel="No teams found"
    />
  );

  function handleRemoveClick(selectedRows: Team[]) {
    const ids = selectedRows.map((row) => row.Id);
    handleRemove(ids);
  }
}

function useRemoveMutation() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (ids: TeamId[]) =>
      promiseSequence(ids.map((id) => () => deleteTeam(id))),
    {
      meta: {
        error: { title: 'Failure', message: 'Unable to remove team' },
      },
      onSuccess() {
        return queryClient.invalidateQueries(['teams']);
      },
    }
  );

  return { handleRemove };

  async function handleRemove(teams: TeamId[]) {
    const confirmed = await confirmDeletionAsync(
      'Are you sure you want to remove the selected teams?'
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(teams, {
      onSuccess: () => {
        notifySuccess('Teams successfully removed', '');
      },
    });
  }
}
