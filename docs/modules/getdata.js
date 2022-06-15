export async function getData(sheetName1 = '', sheetName2 = '', sheetName3) {
    const endpoint =
      "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec";
      console.log(endpoint + "?sheet=" + sheetName1);
    try {
      const response1 = await fetch(`${endpoint}?sheet=${sheetName1}`);
      const response2 = await fetch(`${endpoint}?sheet=${sheetName2}`);
      const response3 = await fetch(`${endpoint}?sheet=${sheetName3}`);
      if (response1.ok && response2.ok && response3.ok) {
        const eventJson = await response1.json();
        const venueJson = await response2.json();
        const group4Json = await response3.json();
        // console.log(eventJson);
        return [eventJson,venueJson,group4Json];
      }
    } catch (error) {
      console.log(error);
    }
  }
  