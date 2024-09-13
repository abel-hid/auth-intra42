"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Success from "./pages/success";
import haha from "./api/user-data";

import NextAuth from "next-auth";declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const generateState = () => {
  const state = Math.random().toString(36).substring(2);
  localStorage.setItem('auth_state', state); 
  return state;
};

const handleSignUp = () => {
  const state = generateState();
  const authUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&state=${state}`;
  window.location.href = authUrl;
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
       
        {userData && <div>
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
          <img src={userData.image.link} alt="" />
          </p>
          
        </div>}
    
          <a href="/api/auth/signout">Sign out</a>
        
        </div>
      )}
    </div>
  );
}