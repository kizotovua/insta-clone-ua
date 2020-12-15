import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AuthPage from "../pages/AuthPage/AuthPage";

export const useRouter = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <ProtectedRoute exact path="/feed" authenticated={isAuth}>
          <MainPage/>
        </ProtectedRoute>

        <ProtectedRoute exact
                        path="/profiles/:id"
                        authenticated={isAuth}
                        component={ProfilePage}/>

        <ProtectedRoute path="*" authenticated={isAuth}>
          <Redirect to="/feed"/>
        </ProtectedRoute>
      </Switch>
    );

  } else {
    return (
      <Switch>
        <Route exact path='/login' component={AuthPage}/>
        <Route path="*" render={() => <Redirect to='/login'/>}/>
      </Switch>
    )
  }
}

const ProtectedRoute = ({authenticated, ...props}) => (
  authenticated
  ? <Route {...props}/>
  : <Route path="*" render={() => <Redirect to='/login'/>}/>

);

export default useRouter;