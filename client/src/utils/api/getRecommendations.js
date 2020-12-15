export default async function getRecommendations(subscriptions, ownID, token) {

  try {
    const response = await fetch('/api/profiles', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    });
    const profiles = await response.json();

    return {
      recommendations: profiles.data.filter(id => !subscriptions.includes(id) && id !== ownID)
    }
  } catch (err) {
    console.error(err);
  }
}
