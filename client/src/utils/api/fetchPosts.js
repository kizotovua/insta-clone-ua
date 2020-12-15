export default async function fetchPosts(idsArray,token, start= 0,quantity = 0) {
  try {
    let response;

    if(quantity) {
      response = await fetch('/api/posts/queryByAuthorsID/partial', {
        method: 'POST',
        body: JSON.stringify({
          query: idsArray,
          start,
          quantity
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      });

    } else {
      response = await fetch('/api/posts/queryByAuthorsID', {
        method: 'POST',
        body: JSON.stringify({
          query: idsArray
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      });
    }
    return await response.json();

  } catch (err) {
    console.log(err);
  }
}