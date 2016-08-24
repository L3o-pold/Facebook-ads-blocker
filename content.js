/*
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This software consists of voluntary contributions made by many individuals
 * and is licensed under the MIT license. For more information, see
 * <https://github.com/L3o-pold/Facebook-ads-blocker>.
 */

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

/**
 * The Facebook sponsored post labels to looking for
 *
 * @type {{en: string[], fr: string[]}}
 */
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

/**
 * Facebook user language
 *
 * @type {string}
 */
var facebookLang = document.getElementsByTagName("html")[0].getAttribute("lang");

/**
 * Count the number of Facebook sponsored post on the page
 *
 * @type {number}
 */
var counterAdsPage = 0;

/**
 * The ads content.
 * Will prevent multiple deletion and counting
 *
 * @type {Array}
 */
var adsTextContent = [];

if (adsLabels.hasOwnProperty(facebookLang) === true) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (isFacebookAds(mutation) === 2) {
                removeFacebookAds(mutation);
            }
        });
    });

    observer.observe(document.getElementById('stream_pagelet'), {
        childList: true,
        subtree: true,
        attributes: true
    });
}

/**
 * Remove a Facebook sponsored post
 *
 * @param mutation
 */
function removeFacebookAds(mutation) {
    mutation.target.remove();
    adsTextContent.push(mutation.target.textContent);
    counterAdsPage++;
}

/**
 * Check if the post is a Facebook sponsored post
 *
 * @param mutation
 * @returns {int}
 */
function isFacebookAds(mutation) {
    var newsTextElement = mutation.target.textContent;

    var isAd = adsTextContent.indexOf(newsTextElement) !== -1;
    isAd += newsTextElement.indexOf(adsLabels[facebookLang][0]) !== -1;
    isAd += newsTextElement.indexOf(adsLabels[facebookLang][1]) !== -1;

    return parseInt(isAd);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == "getCurrentAds") {
        sendResponse(counterAdsPage);
    }
});