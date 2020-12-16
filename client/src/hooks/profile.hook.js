import {useCallback, useState, useEffect} from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const storageName = 'profileData';

  const signIn = useCallback((profile) => {
    setProfile(profile);

    localStorage.setItem(storageName, JSON.stringify(profile))
  }, []);

  const signOut = useCallback(() => {
    setProfile(null);
  },[])

  const subscribe = useCallback((id, currentProfile, follow = true) => {
    const { following, recommendations } = currentProfile;

    if(follow) {
      const index = recommendations.indexOf(id);
      recommendations.splice(index, 1);
      following.push(id);

    } else {
      const index = following.indexOf(id);
      following.splice(index, 1);
      recommendations.push(id);
    }

    const profileUpdated = {
      ...currentProfile,
      following,
      recommendations
    };

    localStorage.setItem(storageName, JSON.stringify(profileUpdated));
  },[]);

  const updatePosts = useCallback((post, currentProfile, remove = false) => {
    const { posts } = currentProfile;
    if(!remove) {
      posts.push(post);
      const profileUpdated = {
        ...currentProfile,
        posts
      };
      setProfile(profileUpdated);
      localStorage.setItem(storageName, JSON.stringify(profileUpdated));
    }
  }, [])

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem(storageName));
    if (profile) {
      signIn(profile);
    }
  }, []);

  return { profile, signIn, signOut, subscribe, updatePosts };
}