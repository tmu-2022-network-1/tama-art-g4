import { getData } from './modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const items = [];

const renderResponse = (json) => {

  for (const event of json.filter(d => d.title !== '')) {

    items[event.id-1] = document.createElement("div");

    items[event.id-1].classList.add("item");
    if(event.tag_js !== ''){
      items[event.id-1].classList.add(event.tag_js);
    }else{
      items[event.id-1].classList.add('other');
    }

    if((event.id-1)%2 !== 0){
      items[event.id-1].classList.add("left-item");
    }
    if(event.thumbnail == ''){
      event.thumbnail = 'images/dummy.jpg';
    }
    items[event.id-1].innerHTML = `
    <a href="event/?id=${event.id}">
      <figure class="eventImage" id="${event.id}">
        <img src="${event.thumbnail}" class="image">
      </figure>
    </a>
    <div class="eventName">
      ${event.title}
    </div>
    

    `;
  }
  makeLayout(items);

};

$(".radio-inline__input").click(function () {//ラジオボタンがクリックされたら
  console.log("hello");
  
  let elements = document.getElementsByName('accessible-radio');
  let len = elements.length;
  console.log(len);
  let checkValue = '';

  for (let i = 0; i < len; i++){
      if (elements.item(i).checked){
          //どうして（）だと動作したのか分かってない
          checkValue = elements.item(i).value;
      }
  }
  console.log(checkValue);

  if(checkValue == 'all'){
    var newArray = items;
  }else{
    var newArray = items.filter(function(item) {
      return item.classList.contains(checkValue) == true;
    });
  }
  for(var i = 0; i < newArray.length; i++){
    newArray[i].classList.remove("left-item");
    if(i%2 !== 0){
      newArray[i].classList.add("left-item");
    }
  }
  makeLayout(newArray);

  const pageTitle = document.getElementById("pageTitle");
  pageTitle.innerHTML = `${checkValue}`;

  
});


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
    const eventLinks = document.querySelectorAll('.eventImage');
    for (const eventLink of eventLinks) {
      eventLink.onmouseover = (e) => {
        console.log("生きてます！");
        document.querySelector('.thumbnail-container').src = e.target.src;
        
        const eventId = json.find((d) => d.id === e.currentTarget.id);
        console.log(eventId);
        document.getElementById("thumbnail-title").innerHTML=`${eventId.title}`;
        document.getElementById("thumbnail-comment").innerHTML=`${eventId.comment}`;

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
  
getData("group4").then((json) => renderEvent(json));
  