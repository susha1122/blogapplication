import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function DebugToken() {
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchToken() {
      const token = await getToken();
      console.log("Your Clerk JWT token:", token);
      alert("Check console for your token");
    }
    fetchToken();
  }, [getToken]);

  return null; // no UI needed
}

export default DebugToken;
