"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import haha from "./api/user-data";

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const generateState = () => {
  const state = Math.random().toString(36).substring(2);
  return state;
};

const handleSignUp = () => {
  const state = generateState();
  const authUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&state=${state}`;
  window.location.href = authUrl;
};

const clearCookies = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
};

export default function Home() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated") {
      haha().then((data) => {
        setUserData(data);
        console.log(data);
        setLoadingUserData(false);
      });
    }
  }, [status]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the home page or a custom URL after signout
    clearCookies(); // Clear all cookies
    setUserData(null); // Clear user data
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      {!session ? (
        <button onClick={handleSignUp}>Sign Up with Intra 42</button>
      ) : (
        <div>
          {userData && (
            <div>
              Welcome {userData.login}! You are now signed in.
              <p>
                <strong>Email Address:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {userData.phone}
              </p>
              <p>
                <strong>Location:</strong> {userData.location}
              </p>
              <p>
                <img src={userData.image.link} alt="Profile" />
              </p>
            </div>
          )}
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}

