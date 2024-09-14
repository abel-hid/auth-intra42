import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function user_data() {
  const session = await getSession();

  if (!session?.accessToken) {
    return null;
  }

  console.log("session.accessToken", session.accessToken);

    const response = await fetch("https://api.intra.42.fr/v2/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await response.json();
    return data;
}



