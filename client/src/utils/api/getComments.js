export default async function getComments(postID, token) {

    try {
      const res = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify({postID}),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      return res.json();

    } catch (e) {console.log(e)}
}