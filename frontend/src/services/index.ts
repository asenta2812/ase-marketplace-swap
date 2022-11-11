import { requestAsync } from '@/utils';
export * from './auth';
export * from './pets';

export function uploadImage(data: FormData) {
  return requestAsync({
    method: 'POST',
    url: '/upload-aws',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
