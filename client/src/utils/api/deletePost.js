export default async function deletePost (postID, cloudinaryPublicId, token) {
  try {

    const res = await fetch('/api/posts/remove', {
      method: 'DELETE',
      body: JSON.stringify({
        postID,
        cloudinaryPublicId
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      }
    });
    return res.json();

  } catch (e) {
    console.log(e);}
}