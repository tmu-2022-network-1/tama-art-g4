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
    document.getElementById("response").value = JSON.stringify(res, null, 2);
  
    document.getElementById("content").innerHTML = `<ul id="venues"></ul>`;
  
    const venues = document.getElementById("venues");
  
    for (const venue of res) {
      const venueNode = document.createElement("li");
      venueNode.innerHTML = `<h3><a href="venue/?id=${venue.id}">${venue.name}</a></h3>
      ${venue.address}`;
      venues.appendChild(venueNode);
    }
  };
  
  getData().then((json) => renderResponse(json));
  