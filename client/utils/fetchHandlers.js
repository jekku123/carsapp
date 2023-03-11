export async function fetchPostRequest(url, obj) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    console.log(response.status + ": " + data.message);
  } catch (err) {
    console.error(err);
  }
}

export async function fetchGetRequest(url) {
  let data = [];
  try {
    const response = await fetch(url);
    data = await response.json();
    if (!response.ok) throw new Error(data.error);
  } catch (err) {
    console.error(err);
  }
  return data;
}
