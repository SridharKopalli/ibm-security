/**
 * @file Pagination stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { array, boolean, number, text } from '@storybook/addon-knobs';

import { Pagination } from '../..';

import { carbon } from '../../../.storybook';

const props = () => ({
  disabled: boolean('Disable backward/forward buttons (disabled)', false),
  page: number('The current page (page)', 1),
  totalItems: number('Total number of items (totalItems)', 103),
  pagesUnknown: boolean('Total number of items unknown (pagesUnknown)', false),
  pageInputDisabled: boolean('Disable page input (pageInputDisabled)', false),
  backwardText: text(
    'The description for the backward icon (backwardText)',
    'Previous page'
  ),
  forwardText: text(
    'The description for the backward icon (forwardText)',
    'Next page'
  ),
  pageSize: number('Number of items per page (pageSize)', 10),
  pageSizes: array('Choices of `pageSize` (pageSizes)', [10, 20, 30, 40, 50]),
  itemsPerPageText: text(
    'Label for `pageSizes` select UI (itemsPerPageText)',
    'Items per page:'
  ),
  onChange: action('onChange'),
});

storiesOf(carbon('Pagination'), module)
  .addDecorator(story => <div style={{ width: '800px' }}>{story()}</div>)
  .add('Pagination', () => <Pagination {...props()} />, {
    info: {
      text: `
            The pagination component is used to switch through multiple pages of items, when only a maxium number of items can be displayed per page. Can be used in combination with other components like DataTable.
          `,
    },
  })
  .add(
    '↪︎ multiple Pagination components',
    () => {
      return (
        <div>
          <Pagination {...props()} />
          <Pagination {...props()} />
        </div>
      );
    },
    {
      info: {
        text: `Showcasing unique ids for each pagination component`,
      },
    }
  );
