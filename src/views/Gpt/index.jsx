import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Layout, Avatar, Button, Input, Skeleton } from '@arco-design/web-react';
import { IconRobot, IconUser } from '@arco-design/web-react/icon';

import ConversationItem from './ConversationItem';

const vscode = acquireVsCodeApi();

const View = () => {
  const [text, setText] = useState('');
  const [pending, setPending] = useState(false);
  const [conversation, setConversation] = useState(vscode.getState() || []);
  const contentRef = useRef();

  useEffect(() => {
    const handleMessage = (e) => {
      const message = e.data;
      if (message.response === 'conversation') {
        setPending(false);
        setConversation((conversation) => [
          ...conversation,
          {
            id: Math.random(),
            text: message.data.response,
          },
        ]);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
    vscode.setState(conversation);
  }, [conversation]);

  const handleSend = () => {
    if (!text) {
      return;
    }
    setConversation([
      ...conversation,
      {
        id: Math.random(),
        text,
        self: true,
      },
    ]);
    setPending(true);
    setText('');
    vscode.postMessage({ command: 'conversation', text });
  };

  const handleEnter = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <Layout style={{height: '100%', boxSizing: 'border-box'}}>
      <Layout.Content ref={contentRef} style={{overflow: 'scroll', padding: '0 16px 0 16px'}}>
        {conversation.map(d => (
          <ConversationItem
            key={d.id}
            self={d.self}
            name={d.self ? 'you' : 'gpt'}
            avatar={<Avatar>{d.self ? <IconUser /> : <IconRobot />}</Avatar>}
            content={d.text}
          />
        ))}
        {pending && (
          <ConversationItem
            key="pending"
            name="gpt"
            avatar={<Avatar><IconRobot /></Avatar>}
            content={<Skeleton animation />}
          />
        )}
      </Layout.Content>
      <Layout.Footer style={{padding: 16}}>
        <Input.TextArea
          resize="none"
          style={{width: '100%', marginBottom: 16}}
          autoSize={{
            minRows: 3,
            maxRows: 3,
          }}
          placeholder="Say something ..."
          disabled={pending}
          value={text}
          onChange={(val) => setText(val)}
          onPressEnter={handleEnter}
        />
        <div style={{textAlign: 'right'}}>
          <Button disabled={pending} onClick={handleSend}>发送</Button>
        </div>
      </Layout.Footer>
    </Layout>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<View />);
