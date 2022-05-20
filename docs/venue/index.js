const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getData = async () => {
  const endpoint =
    "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec";
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderResponse = (res) => {
  const venue = res.find((d) => d.id === id);
  if (venue) {
    document.getElementById("title").textContent = venue.name;
  }
  document.getElementById("response").value = JSON.stringify(venue, null, 2);

  document.getElementById("content").innerHTML = `
  ${venue.address}`;
};

getData().then((json) => renderResponse(json));
