import { getData } from './modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderResponse = (json) => {

  // const container = document.getElementById("container");
  const items = [];

  for (const event of json) {
    // 新しいHTML要素を作成
    // const new_item = document.createElement("div");

    items[event.id-1] = document.createElement("div");

    items[event.id-1].classList.add("item");
    // new_item.classList.add("item");
    items[event.id-1].innerHTML = `
    
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
    // container.appendChild(items[event.id-1]);
  }
  makeLayout(items);
};

const makeLayout = (array) => {
  const leftContainer = document.getElementById("left-container");
  const rightContainer = document.getElementById("right-container");

  while(leftContainer.firstChild){
    leftContainer.removeChild(leftContainer.firstChild);
  }
  while(rightContainer.firstChild){
    rightContainer.removeChild(rightContainer.firstChild);
  }

  for(let i = 0; i < array.length; i++){
    if(i%2 == 0){
      leftContainer.appendChild(array[i]);
    }else{
      rightContainer.appendChild(array[i]);
    }
  }
}

const renderEvent = (json) => {
  if (!id) {
    renderResponse(json);
    const eventLinks = document.querySelectorAll('.item');
    for (const eventLink of eventLinks) {
      eventLink.onmouseover = (e) => {
        console.log("生きてます！");
        document.querySelector('.thumbnailContainer').style.backgroundImage = e.target.style.backgroundImage;
      };
    }
    return;
  }
  const event = json.find((d) => d.id === id);
  if (event) {
    document.title = `${event.title} | tama.potari`;
    document.getElementById("content").innerHTML = `
      <h1>${event.title}</h1>
      <a href="../venue/?id=${event.venueId}">${event.venue}</a>
      <figure>
        <img src="${event.thumbnail}" alt="${event.title}">
      </figure>`;
  }
};
  
getData("events").then((json) => renderEvent(json));
  