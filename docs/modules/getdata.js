export async function getData(sheetName1 = '', sheetName2 = '') {
    const endpoint =
      "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec";
      console.log(endpoint + "?sheet=" + sheetName1);
    try {
      const response1 = await fetch(`${endpoint}?sheet=${sheetName1}`);
      const response2 = await fetch(`${endpoint}?sheet=${sheetName2}`);
      if (response1.ok && response2.ok) {
        const eventJson = await response1.json();
        const venueJson = await response2.json();
        // console.log(eventJson);
        return [eventJson,venueJson];
      }
    } catch (error) {
      console.log(error);
    }
  }
  