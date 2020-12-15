export default async function postComment(postID, userID, username, avatar, text, token) {
  try {
    const res = await fetch('/api/comments/post', {
      method: "POST",
      body: JSON.stringify({
        postID,
        userID,
        username,
        avatar,
        text,
        date: Date.now()
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      }
    });

    return res.json()
  } catch (e) {console.log(e)}
}