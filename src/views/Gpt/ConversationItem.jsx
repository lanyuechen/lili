import React from 'react';

import { Grid } from '@arco-design/web-react';
import Markdown from './Markdown';

export default (props) => {
  const { self, name, avatar, content } = props;
 
  return (
    <Grid.Row
      gutter={8}
      style={{
        marginBottom: 16,
        flexWrap: 'nowrap',
        flexDirection: self ? 'row-reverse' : 'row',
      }}
    >
      <Grid.Col flex="40px">
        {avatar}
      </Grid.Col>
      <Grid.Col flex="auto" style={{textAlign: self ? 'right' : 'left'}}>
        {typeof content === 'string' ? (
          <div
            style={{
              display: 'inline-block',
              textAlign: 'justify',
              border: '1px solid var(--color-neutral-4)',
              borderRadius: 12,
              padding: '4px 8px',
            }}
          >
            <Markdown>{content}</Markdown>
          </div>
        ) : content}
      </Grid.Col>
    </Grid.Row>
  );
};
