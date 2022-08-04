import { message } from 'antd';

export const MessageError = (content: string, key?: string) =>
  message.error({ key: key || 'error', content });
export const MessageSuccess = (content: string, key?: string) =>
  message.success({ key: key || 'success', content });
