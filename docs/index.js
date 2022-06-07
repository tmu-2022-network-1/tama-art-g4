import { getData } from './modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderResponse = (json) => {
  const items = [];


  for (const event of json.filter(d => d.title !== '')) {

    items[event.id-1] = document.createElement("div");

    items[event.id-1].classList.add("item");

    if((event.id-1)%2 == 0){
      items[event.id-1].classList.add("left-item");
    }
    if(event.thumbnail == ''){
      event.thumbnail = 'images/dummy.jpg';
    }
    items[event.id-1].innerHTML = `
    <a href="event/?id=${event.id}">
      <figure class="eventImage">
        <img src="${event.thumbnail}">
      </figure>
      <div class="eventName">
        ${event.title}
      </div>
    </a>

    `;
  }
  makeLayout(items);
};


const makeLayout = (array) => {
  const container = document.getElementById("container");

  while(container.firstChild){
    container.removeChild(container.firstChild);
  }

  for(let i = 0; i < array.length; i++){
    container.appendChild(array[i]);

  }
}

const renderEvent = (json) => {
  if (!id) {
    renderResponse(json);
    const eventLinks = document.querySelectorAll('.item');
    for (const eventLink of eventLinks) {
      eventLink.onmouseover = (e) => {
        console.log("生きてます！");

        document.querySelector('.thumbnail-container').style.backgroundImage = e.target.style.backgroundImage;

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
  