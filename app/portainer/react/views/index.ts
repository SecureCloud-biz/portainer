import angular from 'angular';

import { HomeView } from '@/portainer/home';
import { withCurrentUser } from '@/react-tools/withCurrentUser';
import { r2a } from '@/react-tools/react2angular';
import { withReactQuery } from '@/react-tools/withReactQuery';
import { withUIRouter } from '@/react-tools/withUIRouter';

import { wizardModule } from './wizard';
import { teamsModule } from './teams';

export const viewsModule = angular
  .module('portainer.app.react.views', [wizardModule, teamsModule])
  .component(
    'homeView',
    r2a(withUIRouter(withReactQuery(withCurrentUser(HomeView))), [])
  ).name;
