export default async function deletePost (postID, token) {
  try {

    const res = await fetch('/api/posts/remove', {
      method: 'DELETE',
      body: JSON.stringify({postID}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      }
    });
    return res.json();

  } catch (e) {
    console.log(e);}
}