import angular from 'angular';

import { r2a } from '@/react-tools/react2angular';
import { CreateAccessToken } from '@/react/portainer/account/CreateAccessTokenView';
import { EdgeComputeSettingsView } from '@/react/portainer/settings/EdgeComputeView/EdgeComputeSettingsView';

import { wizardModule } from './wizard';
import { teamsModule } from './teams';

export const viewsModule = angular
  .module('portainer.app.react.views', [wizardModule, teamsModule])
  .component(
    'createAccessToken',
    r2a(CreateAccessToken, ['onSubmit', 'onError'])
  )
  .component(
    'settingsEdgeCompute',
    r2a(EdgeComputeSettingsView, ['onSubmit', 'settings'])
  ).name;
