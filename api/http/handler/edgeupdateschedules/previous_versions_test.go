package edgeupdateschedules

import (
	"testing"

	portainer "github.com/portainer/portainer/api"
	"github.com/stretchr/testify/assert"
)

func TestPreviousVersions(t *testing.T) {

	schedules := []portainer.EdgeUpdateSchedule{
		{
			ID:   1,
			Type: portainer.EdgeUpdateScheduleUpdate,
			Status: map[portainer.EndpointID]portainer.EdgeUpdateScheduleStatus{
				1: {
					TargetVersion:  "2.14.0",
					CurrentVersion: "2.11.0",
					Status:         portainer.EdgeUpdateScheduleStatusSuccess,
				},
				2: {
					TargetVersion:  "2.13.0",
					CurrentVersion: "2.12.0",
					Status:         portainer.EdgeUpdateScheduleStatusSuccess,
				},
			},
			Created: 1500000000,
		},
		{
			ID:   2,
			Type: portainer.EdgeUpdateScheduleRollback,
			Status: map[portainer.EndpointID]portainer.EdgeUpdateScheduleStatus{
				1: {
					TargetVersion:  "2.11.0",
					CurrentVersion: "2.14.0",
					Status:         portainer.EdgeUpdateScheduleStatusSuccess,
				},
			},
			Created: 1500000001,
		},
		{
			ID:   3,
			Type: portainer.EdgeUpdateScheduleUpdate,
			Status: map[portainer.EndpointID]portainer.EdgeUpdateScheduleStatus{
				2: {
					TargetVersion:  "2.14.0",
					CurrentVersion: "2.13.0",
					Status:         portainer.EdgeUpdateScheduleStatusSuccess,
				},
			},
			Created: 1500000002,
		},
	}

	actual := previousVersions(schedules)

	assert.Equal(t, map[portainer.EndpointID]string{
		2: "2.13.0",
	}, actual)

}
