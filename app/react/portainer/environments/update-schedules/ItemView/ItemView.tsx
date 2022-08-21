import { Settings } from 'react-feather';
import { Formik, Form as FormikForm } from 'formik';
import { useCurrentStateAndParams, useRouter } from '@uirouter/react';

import { notifySuccess } from '@/portainer/services/notifications';
import {
  useRedirectFeatureFlag,
  FeatureFlag,
} from '@/portainer/feature-flags/useRedirectFeatureFlag';

import { PageHeader } from '@@/PageHeader';
import { Widget } from '@@/Widget';
import { LoadingButton } from '@@/buttons';

import { FormFields } from '../common/FormFields';
import { useItem } from '../queries/useItem';
import { validation } from '../common/validation';
import { useUpdateMutation } from '../queries/useUpdateMutation';

export function ItemView() {
  useRedirectFeatureFlag(FeatureFlag.EdgeRemoteUpdate);

  const {
    params: { id },
  } = useCurrentStateAndParams();

  const updateMutation = useUpdateMutation();
  const router = useRouter();
  const itemQuery = useItem(id);

  if (!itemQuery.data) {
    return null;
  }

  const item = itemQuery.data;

  return (
    <>
      <PageHeader
        title="Upgrade & Rollback"
        breadcrumbs={['Edge agent upgrade and rollback', item.name]}
      />

      <div className="row">
        <div className="col-sm-12">
          <Widget>
            <Widget.Title
              title="Upgrade & Rollback Scheduler"
              icon={Settings}
            />
            <Widget.Body>
              <Formik
                initialValues={item}
                onSubmit={(values) => {
                  updateMutation.mutate(
                    { id, values },
                    {
                      onSuccess() {
                        notifySuccess(
                          'Success',
                          'Updated schedule successfully'
                        );
                        router.stateService.go('^');
                      },
                    }
                  );
                }}
                validateOnMount
                validationSchema={validation}
              >
                {({ isValid }) => (
                  <FormikForm className="form-horizontal">
                    <FormFields />
                    <div className="form-group">
                      <div className="col-sm-12">
                        <LoadingButton
                          disabled={!isValid}
                          isLoading={updateMutation.isLoading}
                          loadingText="Updating..."
                        >
                          Update Schedule
                        </LoadingButton>
                      </div>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </Widget.Body>
          </Widget>
        </div>
      </div>
    </>
  );
}
