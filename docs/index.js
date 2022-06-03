import { getData } from './modules/getdata.js';

const renderResponse = (json) => {

  const container = document.getElementById("container");
  for (const event of json) {
    // 新しいHTML要素を作成
    const new_item = document.createElement("div");
    new_item.classList.add("item");
    new_item.innerHTML = `
    
    <div class="eventImage">
      <img src="${event.thumbnail}">
    </div>
    <p class="eventTag">#${event.tag}</p>
    <h3 class="eventName">
      <a href="event/?id=${event.id}">${event.title}</a>
    </h3>
    <p class="eventVenue">${event.artist}</p>
    
    `;

    // 指定した要素の中の末尾に挿入
    container.appendChild(new_item);
  }
};
  
getData("events").then((json) => renderResponse(json));
  