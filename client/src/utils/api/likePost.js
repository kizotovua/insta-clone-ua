export default async function likePost(postID, userID, dislike = false,token) {
  try {
    const res = await fetch(`/api/posts/${postID}/likes`, {
      method: 'PUT',
      body: JSON.stringify({
        userID,
        dislike
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