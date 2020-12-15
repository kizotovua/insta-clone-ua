export default async function fetchProfiles(idsArray,token) {
  if(idsArray.length && token) {

    try {
      const response = await fetch('/api/profiles/queryById', {
        method: 'POST',
        body: JSON.stringify({
          query: idsArray.join()
        }),
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
}