import { getServerSession } from 'next-auth';
import { authOptions } from '../libs/authOptions';

export default async function getSession() {
  return await getServerSession(authOptions);
}
