import React from 'react';
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AuthContext} from "../context/AuthContext";
import {useAuth} from "../hooks/auth.hook";
import {BrowserRouter as Router} from 'react-router-dom';
import {useRouter} from "./router";
import Navbar from "../components/shared/Navbar/Navbar";
import {useProfile} from "../hooks/profile.hook";
import {ProfileContext} from "../context/ProfileContext";
import theme from './theme'

function App() {
  const { token, login, logout, userID } = useAuth();
  const { profile,signIn, signOut, subscribe, updatePosts } = useProfile();
  const isAuthenticated = !!profile;

  const routes = useRouter(isAuthenticated);
  return (
    <AuthContext.Provider value={{ token, login, logout, userID }}>
      <ProfileContext.Provider value={{ profile, signIn, signOut, subscribe, updatePosts }}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Router>
            {
              isAuthenticated && <Navbar />
            }
            {routes}
          </Router>
        </ThemeProvider>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
