window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#page-ads-title')['innerText'] = chrome.i18n.getMessage('pageAdsTitle');
    document.querySelector('#page-ads-label')['innerText'] = chrome.i18n.getMessage('pageAdsLabel');
});

chrome.tabs.query({'active': true, 'currentWindow': true}, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, "getCurrentAds", function (response) {
        if (isNaN(response) == false) {
            document.querySelector('#page-ads-counters')['innerText'] = response;
        }
    });
});