MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    mutations.forEach(function (mutation) {
      var entry = {
        mutation: mutation,
        el: mutation.target,
        value: mutation.target.textContent,
        oldValue: mutation.oldValue
      };

      if (entry.value.indexOf('Sponsored') !== -1 || entry.value.indexOf('Suggested Post') !== -1) {
      	console.log('FOUND ADS:', entry);
      	mutation.target.remove();
      }
    });
});


observer.observe(document.getElementById('stream_pagelet'), {
  childList:true,
  subtree: true,
  attributes: true
});