import { getData } from '../modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderEventList = (json) => {
  
  document.getElementById("content").innerHTML =
    `<ul id="events" class="columns is-multiline"></ul>`;

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
        <a href="venue/?id=${event.id}">${event.title}</a>
      </h3>
      <p class="eventVenue">${event.artist}</p>
      
      `;
  
      // 指定した要素の中の末尾に挿入
      container.appendChild(new_item);
    }
}

const renderEvent = (json) => {
  if (!id) {
    renderEventList(json);
    return;
  }
  console.log(id);
  const event = json.find((d) => d.id === id);
  console.log(event);
  if (event) {
    document.title = `${event.title} | tama.potari`;
    document.getElementById("title").textContent = event.title;
    document.getElementById("content").innerHTML = `
    ${event.venue}`;
  };
}

getData("events").then((json) => renderEvent(json));