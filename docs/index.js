import { getData } from './modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const items = [];

const renderResponse = (json) => {

  const firstId = json[0].find((d) => d.id === "1");
  document.querySelector('.thumbnail-container').src = firstId.thumbnail;
  document.getElementById("thumbnail-title").innerHTML=`${firstId.title}`;
  document.getElementById("thumbnail-comment").innerHTML=`${firstId.comment}`;

  for (const event of json[0].filter(d => d.title !== '')) {

    items[event.id-1] = document.createElement("div");
    items[event.id-1].classList.add("item");
    
    const group4Js = json[2].find((d) => d.id === event.id);
    if(group4Js.tag_js !== ''){
      items[event.id-1].classList.add(group4Js.tag_js);
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
    <figure class="eventImage" id="${event.id}">
      <img src="${event.thumbnail}" class="image">
    </figure>
    <div class="eventName">
      ${event.title}
    </div>
    

    `;
  }
  makeLayout(items);

};

$(".radio-inline__input").click(function () {//ラジオボタンがクリックされたら
  
  let elements = document.getElementsByName('accessible-radio');
  // console.log(elements);
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


  var id =  $('[name="accessible-radio"]:checked').attr('id');
  var JanText = $('label[for="' + id + '"]').text();

  const pageTitle = document.getElementById("pageTitle");
  pageTitle.innerHTML = `${JanText}`;

  const leftText = document.getElementById("leftText");
  leftText.innerHTML = `- ${checkValue} -`;
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
  console.log(json[0]);
  console.log(json[1]);
  
  if (!id) {
    renderResponse(json);
    const eventLinks = document.querySelectorAll('.eventImage');

    for (const eventLink of eventLinks) {
      eventLink.onmouseover = (e) => {
        
        const eventId = json[0].find((d) => d.id === e.currentTarget.id);
        const commentId =json[2].find((d) => d.id === e.currentTarget.id);
        document.querySelector('.thumbnail-container').src = e.target.src;
        document.getElementById("thumbnail-title").innerHTML=`${eventId.title}`;
        document.getElementById("thumbnail-comment").innerHTML=`${commentId.comment}`;

      };

      eventLink.onmousedown = (e) => {
        
        const eventId = json[0].find((d) => d.id === e.currentTarget.id);
        const venue = json[1].find((d) => d.id === eventId.venueId);
        $("#event-detail").addClass('windowactive');
        $("#close-button").addClass('windowactive');

        document.getElementById("artist").innerHTML=`
        ${eventId.artist}
        `;

        var startYear = new Date(eventId.startDate).getFullYear();
        var startMonth = new Date(eventId.startDate).getMonth();
        var startDate = new Date(eventId.startDate).getDate();
        var endYear = new Date(eventId.endDate).getFullYear();
        var endMonth = new Date(eventId.endDate).getMonth();
        var endDate = new Date(eventId.endDate).getDate();

        document.getElementById("schedule").innerHTML=`
        ${startYear}年${startMonth+1}月${startDate}日〜${endYear}年${endMonth+1}月${endDate}日
        `;
        document.getElementById("opening-time").innerHTML=`
        開館時間：${venue.openingTime}
        `;
        document.getElementById("closing-day").innerHTML=`
        閉館日：${venue.closingDay}
        `;
        

        document.getElementById("admission").innerHTML=`
        ${eventId.admission}
        `;
        document.getElementById("eventurl").innerHTML=`
        ${eventId.url}
        `;
        document.getElementById("eventurl").href=eventId.url;

        document.getElementById("venue").innerHTML=`
        <div>${venue.name}</div>
        <a href="${venue.url}" id="venueurl">${venue.url}</a>
        `;

        document.getElementById("address").innerHTML=`
        ${venue.address}
        <div class="gmap">
          <iframe src="http://maps.google.co.jp/maps?q=${venue.name}&output=embed&t=m&z=16&hl=ja" frameborder="0" scrolling="no" margin="0" width="100%" height="100%"></iframe>
        </div>
        `;
        
        document.getElementById("station").innerHTML=`
        ${venue.station}
        `;
        document.getElementById("phone").innerHTML=`
        ${venue.telephone}
        `;
      }


    }
    return;
  }
};
  

getData("events","venues","group4").then((json) => renderEvent(json));
  