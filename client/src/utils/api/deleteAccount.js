export default async function deleteAccount(userId, cloudinaryIDs, token) {
  try {

    const res = await fetch('/api/profiles/removeAccount', {
      method: 'DELETE',
      body: JSON.stringify({ profileID: userId, cloudinaryIDs }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      }
    });
    return res.json();

  } catch (e) {
    console.log(e);}
}