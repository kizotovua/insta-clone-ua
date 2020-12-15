import React, {useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import {useHTTP} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import fetchProfiles from "../../utils/api/fetchProfiles";
import {ProfileContext} from "../../context/ProfileContext";
import Feed from "../../components/Feed/Feed";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Loader from "../../components/shared/Loader/Loader";

const MainPage = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext),
    { profile } = useContext(ProfileContext),
    { loading, setLoading } = useHTTP(),
    { following, recommendations } = profile,
    [recommendedProfiles, setRecommendedProfiles] = useState([]),
    [followingProfiles, setFollowingProfiles] = useState(following);

    useEffect(() => {

      async function getProfiles(idsArray,stateSetter) {
        setLoading(true);
        const emptyData = !idsArray.length;
        !emptyData && stateSetter(await fetchProfiles(idsArray, auth.token));
        emptyData && stateSetter([]);
        setLoading(false);
      }

      getProfiles(recommendations,setRecommendedProfiles);
      getProfiles(following,setFollowingProfiles);

    },[profile, auth.token]);

  return (
      <Container component="main" className={classes.page} maxWidth="lg">
        { loading && <Loader /> }

        <Feed
          className={classes.feed}
          subscriptions={{ recommendations,following }}
        />
          <div className={classes.subscriptions}>
            <Subscriptions profiles={recommendedProfiles} suggestionMode={true}/>
            <Subscriptions profiles={followingProfiles} />
          </div>

      </Container>
  );
};

export default MainPage;