import { getData } from '../modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderEventList = (json) => {
  
  
}

const renderEvent = (json) => {
  //このifは通らない
  if (!id) {
    renderEventList(json);
    return;
  }

  //実際の実行はここから
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