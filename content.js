MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var adsLabels = {
    en: [
        "Sponsored",
        "Suggested Post"
    ],
    fr: [
        "Sponsorisé",
        "Publication suggérée"
    ]
};
var facebookLang = document.getElementsByTagName("html")[0].getAttribute("lang");

if (adsLabels.hasOwnProperty(facebookLang) === true) {
    var observer = new MutationObserver(function (mutations, observer) {
        mutations.forEach(function (mutation) {
            var entry = {
                mutation: mutation,
                el: mutation.target,
                value: mutation.target.textContent,
                oldValue: mutation.oldValue
            };

            if (entry.value.indexOf(adsLabels[facebookLang][0]) !== -1 || entry.value.indexOf(adsLabels[facebookLang][1]) !== -1) {
                mutation.target.remove();
            }
        });
    });


    observer.observe(document.getElementById('stream_pagelet'), {
        childList: true,
        subtree: true,
        attributes: true
    });
}

