import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function user_data() {
  const session = await getSession();

  if (!session?.accessToken) 
  {
    return null;
  }
  try
  {
    const response = await axios.get("https://api.intra.42.fr/v2/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    console.log("accessToken", session.accessToken);
    console.log("response.data", response.data);
    return response.data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}



