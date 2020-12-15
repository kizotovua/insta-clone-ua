export default async function deleteComment(commentID, token) {
  try {

    const res = await fetch('/api/comments/remove', {
      method: 'DELETE',
      body: JSON.stringify({commentID}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      }
    });
    return res.json();

  } catch (e) {
    console.log(e);}
}