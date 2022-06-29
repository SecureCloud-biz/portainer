import angular from 'angular';
import { react2angular } from 'react2angular';

import { r2a } from '@/react-tools/react2angular';
import { Icon } from '@/react/components/Icon';
import { ReactQueryDevtoolsWrapper } from '@/react/components/ReactQueryDevtoolsWrapper';
import { AccessControlPanel } from '@/react/portainer/access-control';
import { PorAccessControlFormTeamSelector } from '@/react/portainer/access-control/PorAccessControlForm/TeamsSelector';
import { PorAccessControlFormUserSelector } from '@/react/portainer/access-control/PorAccessControlForm/UsersSelector';

import { PageHeader } from '@@/PageHeader';
import { TagSelector } from '@@/TagSelector';
import { Loading } from '@@/Widget/Loading';
import { PasswordCheckHint } from '@@/PasswordCheckHint';
import { ViewLoading } from '@@/ViewLoading';
import { Tooltip } from '@@/Tip/Tooltip';
import { TableColumnHeaderAngular } from '@@/datatables/TableHeaderCell';
import { DashboardItem } from '@@/DashboardItem';
import { SearchBar } from '@@/datatables/SearchBar';
import { FallbackImage } from '@@/FallbackImage';
import { BadgeIcon } from '@@/BoxSelector/BadgeIcon';
import { TeamsSelector } from '@@/TeamsSelector';

import { fileUploadField } from './file-upload-field';
import { switchField } from './switch-field';
import { customTemplatesModule } from './custom-templates';

export const componentsModule = angular
  .module('portainer.app.react.components', [customTemplatesModule])
  .component(
    'tagSelector',
    r2a(TagSelector, ['allowCreate', 'onChange', 'value'])
  )
  .component(
    'portainerTooltip',
    react2angular(Tooltip, ['message', 'position', 'className'])
  )
  .component('fileUploadField', fileUploadField)
  .component('porSwitchField', switchField)
  .component(
    'passwordCheckHint',
    r2a(PasswordCheckHint, ['forceChangePassword', 'passwordValid'])
  )
  .component('rdLoading', r2a(Loading, []))
  .component(
    'tableColumnHeader',
    react2angular(TableColumnHeaderAngular, [
      'colTitle',
      'canSort',
      'isSorted',
      'isSortedDesc',
    ])
  )
  .component('viewLoading', r2a(ViewLoading, ['message']))
  .component(
    'pageHeader',
    r2a(PageHeader, [
      'id',
      'title',
      'breadcrumbs',
      'loading',
      'onReload',
      'reload',
    ])
  )
  .component(
    'fallbackImage',
    r2a(FallbackImage, [
      'src',
      'fallbackIcon',
      'alt',
      'size',
      'className',
      'fallbackMode',
      'fallbackClassName',
      'feather',
    ])
  )
  .component(
    'prIcon',
    react2angular(Icon, ['className', 'feather', 'icon', 'mode', 'size'])
  )
  .component('reactQueryDevTools', r2a(ReactQueryDevtoolsWrapper, []))
  .component(
    'dashboardItem',
    r2a(DashboardItem, ['featherIcon', 'icon', 'type', 'value', 'children'])
  )
  .component(
    'datatableSearchbar',
    r2a(SearchBar, ['data-cy', 'onChange', 'value', 'placeholder'])
  )
  .component(
    'boxSelectorBadgeIcon',
    react2angular(BadgeIcon, ['featherIcon', 'icon'])
  )
  .component(
    'accessControlPanel',
    r2a(AccessControlPanel, [
      'disableOwnershipChange',
      'onUpdateSuccess',
      'resourceControl',
      'resourceId',
      'resourceType',
    ])
  )
  .component(
    'teamsSelector',
    r2a(TeamsSelector, [
      'onChange',
      'value',
      'dataCy',
      'inputId',
      'name',
      'placeholder',
      'teams',
    ])
  )
  .component(
    'porAccessControlFormTeamSelector',
    r2a(PorAccessControlFormTeamSelector, [
      'inputId',
      'onChange',
      'options',
      'value',
    ])
  )
  .component(
    'porAccessControlFormUserSelector',
    r2a(PorAccessControlFormUserSelector, [
      'inputId',
      'onChange',
      'options',
      'value',
    ])
  ).name;
