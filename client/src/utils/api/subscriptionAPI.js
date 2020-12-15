export default async function subscriptionAPI({ userID, token }, followingID, unsubscribe = false) {
  let method, url;

  if (unsubscribe) {
    method = "DELETE";
    url    = `/api/profiles/${userID}/unsubscribe`

  } else {
    method = "PUT";
    url    = `/api/profiles/${userID}/subscribe`
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ followingID })
    });

    return await res.json();

  } catch (err) {
    console.log(err);
  }}
