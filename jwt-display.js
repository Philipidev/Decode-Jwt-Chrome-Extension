chrome.storage.local.get('jwtDecoded', function(data) {
    document.getElementById('jwt-content').textContent = JSON.stringify(data.jwtDecoded, null, 2);
  });