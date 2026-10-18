document.addEventListener('DOMContentLoaded', function() {
  const highlightBtn = document.getElementById('highlightBtn');
  const statusDiv = document.getElementById('status');

  highlightBtn.addEventListener('click', async function() {
    try {
      // Get the current active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Execute the script on the current tab
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: highlightHeadings
      });

      // Show success message
      statusDiv.textContent = 'Headings highlighted successfully!';
      statusDiv.className = 'status success';
      
      // Close popup after a short delay
      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error) {
      // Show error message
      statusDiv.textContent = 'Error: ' + error.message;
      statusDiv.className = 'status error';
      console.error('Error executing script:', error);
    }
  });
});

// This function will be injected into the page
function highlightHeadings() {
  var a, b, c, d, e, f;
  f = new Array('pink', 'orange', 'yellow', 'aquamarine', 'lightskyblue', 'plum');
  
  for (a = 1; a <= 6; a++) {
    b = document.getElementsByTagName('h' + a);
    for (c = 0; c < b.length; c++) {
      d = b[c];
      e = d.style;
      e.backgroundColor = f[a - 1];
      e.border = 'solid';
      e.padding = '2px';
      e.color = 'black';
      d.innerHTML = 'H' + a + '-' + d.innerHTML;
    }
  }
}
