import jwt_decode from  './jwt-decode.js';

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log("inputChanged: " + text);

  let jwtToken = text;
  let decoded="";
  try{
    if (jwtToken) {
      decoded = jwt_decode(jwtToken);
      chrome.storage.local.set({jwtDecoded: decoded});
      console.log(decoded);
      suggest([{ content: decoded.iss, description: decoded.iss }]);
    }
  }
  catch(ex){
    try {
      let url = new URL(text);
      let jwtToken = url.searchParams.get("code");
      if (jwtToken) {
        decoded = jwt_decode(jwtToken);
        console.log(decoded);
        chrome.storage.local.set({jwtDecoded: decoded});
        suggest([{ content: decoded.iss, description: decoded.iss }]);
      }
    } catch (ex) {
      
    }
  }
});

chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Navigate to the JWT decoded page
    chrome.tabs.update(tabs[0].id, {url: chrome.runtime.getURL('jwt-decoded.html')});
  });
});