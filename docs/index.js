const getData = async (endpoint) => {
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

    const container = document.getElementById("container");
    for (const event of res) {
      // 新しいHTML要素を作成
      const new_item = document.createElement("div");
      new_item.classList.add("item");
      new_item.innerHTML = `
      
      <div class="eventImage">
        <img src="${event.thumbnail}">
      </div>
      <p class="eventTag">#${event.tag}</p>
      <h3 class="eventName">${event.title}</h3>
      <p class="eventVenue">${event.artist}</p>
      
      `;

      // 指定した要素の中の末尾に挿入
      container.appendChild(new_item);
    }
  };
  
  const endpoint = "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec?sheet=events";
  getData(endpoint).then((json) => renderResponse(json));
  