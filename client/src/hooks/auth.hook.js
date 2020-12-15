import {useCallback, useState, useEffect} from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const localAuthData = 'userData';
  const localProfileData = 'profileData';

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserID(id);

    localStorage.setItem(localAuthData, JSON.stringify({userID: id, token: jwtToken}))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserID(null);

    localStorage.removeItem(localAuthData);
    localStorage.removeItem(localProfileData);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localAuthData));

    if (data && data.token) {
      login(data.token, data.userID);
    }
  }, []);

  return { login, logout, token, userID }
}

