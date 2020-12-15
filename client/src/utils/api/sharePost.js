export default async function sharePost({ authorID, authorName, imgURL, caption }, token) {
  try {

    const data = {
      url: '/api/posts/create',
      body: JSON.stringify({
        authorID,
        authorName,
        imgURL,
        caption,
        date: Date.now()
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      }
    }

    const res = await fetch(data.url, {
      method: 'POST',
      body: data.body,
      headers: data.headers
    });
    return res.json();

  } catch (e) {
    console.log(e);}
}