import { TrackingCategory } from '@coinbase/cookie-manager';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import useMessages from '../hooks/useMessages';
import Spacer from './Spacer';
import Text from './Text';
import Tooltip from './Tooltip';

type Props = { name: TrackingCategory };

function CategoryLabel({ name }: Props) {
  const { formatMessage } = useIntl();
  const messages = useMessages();

  // Primarily here to satisfy the type system -- we will never surface the
  // deletable cookies to users, we'll just always delete them
  if (name === 'delete-if-seen') {
    return null;
  }

  const labelId = messages.labelIds[name];
  const contentId = messages.contentIds[name];

  if (!labelId || !contentId) return null;
  return (
    <>
      <Text>{formatMessage(labelId)}</Text>
      <Spacer size="sm" vertical />
      <Tooltip content={formatMessage(contentId)} />
      <Spacer size="xs" vertical />
    </>
  );
}

export default memo(CategoryLabel);
