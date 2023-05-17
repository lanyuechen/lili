import axios from 'axios';

const chatbotId = '00fba361-dbf3-461f-a445-2be6c7c66eaf';
const conversationId = '369dd433-30c5-4519-8b37-7ff46386cf06';
const userId = 'auto:7d5b9438-0a49-4a20-ba1a-0f474d3b5bb0';

export const conversation = async (input: string) => {
  const res = await axios({
    method: 'post',
    url: 'https://ora.ai/api/conversation',
    headers: {
      referer: 'https://ora.ai/lanyuechen',
    },
    data: {
      chatbotId,
      input,
      conversationId,
      userId,
      provider: 'OPEN_AI',
      config: false,
      includeHistory: true
    }
  });
  if (res.status !== 200) {
    return Promise.resolve(res.statusText);
  }
  return res.data;
};
