export default async function getPostById(postID,token) {

  try {
    const response = await fetch(`/api/posts/${postID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    });
    return await response.json();

  } catch (err) {
    console.log(err);
  }
}