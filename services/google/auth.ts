import { Account } from 'next-auth';

const api = process.env.BASE_URL;

export const authorize = async (acc: Account): Promise<Account | undefined> => {
  try {
    const response = await fetch(`${api}/api/auth/signin/google`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${acc?.id_token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error();
  } catch (error) {
    return undefined;
  }
};
