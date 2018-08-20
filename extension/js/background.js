  chrome.runtime.onInstalled.addListener(function() {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                      pageUrl: {hostEquals: 'developer.chrome.com'}
                      }),
                    new chrome.declarativeContent.PageStateMatcher({
                      pageUrl: {hostEquals: 'www.netflix.com'}
                      })
                    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

  });
