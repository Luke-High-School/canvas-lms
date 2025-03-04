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
import type {
  AssignmentGroupCriteriaMap,
  AssignmentGroupGradeMap,
  GradingStandard,
} from '@canvas/grading/grading'
import RowScore from './RowScore'

type Props = {
  assignmentGroupId: string
  assignmentGroupMap: AssignmentGroupCriteriaMap
  assignmentGroups: AssignmentGroupGradeMap
  includeUngradedAssignments: boolean
  gradingStandard?: GradingStandard[] | null
}
export function AssignmentGroupScores({
  assignmentGroupId,
  assignmentGroupMap,
  assignmentGroups,
  gradingStandard,
  includeUngradedAssignments,
}: Props) {
  const {name: groupName, group_weight} = assignmentGroupMap[assignmentGroupId]
  const {final: groupFinal, current: groupCurrent} = assignmentGroups[assignmentGroupId] ?? {}
  const groupGradeToDisplay = includeUngradedAssignments ? groupFinal : groupCurrent
  const {score, possible} = groupGradeToDisplay || {}

  return (
    <RowScore
      gradingStandard={gradingStandard}
      name={groupName}
      possible={possible}
      score={score}
      weight={group_weight}
    />
  )
}
