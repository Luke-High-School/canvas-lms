/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {useScope as useI18nScope} from '@canvas/i18n'
import userSettings from '@canvas/user-settings'
import doFetchApi from '@canvas/do-fetch-api-effect'
import {HandleCheckboxChange} from '../../../types'
import {View} from '@instructure/ui-view'
import {ApplyTheme} from '@instructure/ui-themeable'
// @ts-expect-error TODO: fix in instui 8
import {Checkbox, CheckboxFacade} from '@instructure/ui-checkbox'

const I18n = useI18nScope('enhanced_individual_gradebook')

type Props = {
  saveViewUngradedAsZeroToServer?: boolean | null
  contextId?: string | null
  handleCheckboxChange: HandleCheckboxChange
  includeUngradedAssignments: boolean
}
export default function IncludeUngradedAssignmentsCheckbox({
  saveViewUngradedAsZeroToServer,
  contextId,
  handleCheckboxChange,
  includeUngradedAssignments,
}: Props) {
  const handleViewUngradedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    handleCheckboxChange('includeUngradedAssignments', checked)
    userSettings.contextSet('include_ungraded_assignments', checked)
    if (!saveViewUngradedAsZeroToServer) {
      return
    }
    doFetchApi({
      method: 'PUT',
      path: `/api/v1/courses/${contextId}/gradebook_settings`,
      body: {
        gradebook_settings: {
          view_ungraded_as_zero: checked ? 'true' : 'false',
        },
      },
    })
  }

  return (
    <ApplyTheme
      theme={{
        [CheckboxFacade.theme]: {
          checkedBackground: '#0375ff',
          borderColor: '#777777',
          labelFontSizeSmall: '1rem',
        },
        [View.theme]: {
          paddingMedium: '16px',
        },
      }}
    >
      <View
        as="div"
        className="checkbox"
        margin="x-small 0"
        borderRadius="medium"
        background="primary"
        padding="medium"
        theme={{backgroundPrimary: '#eee'}}
      >
        <Checkbox
          size="small"
          label={I18n.t('View Ungraded as 0')}
          checked={includeUngradedAssignments}
          onChange={handleViewUngradedChange}
        />
      </View>
    </ApplyTheme>
  )
}
