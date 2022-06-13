import { getData } from './modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderResponse = (json) => {

  
};

const renderEvent = (json) => {
    if (!id) {
      renderResponse(json);
      return;
    }
};

getData("group4").then((json) => renderEvent(json));