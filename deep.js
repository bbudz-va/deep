"use strict";

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var socialNetworks = {
    facebook: {
       app: "fb://profile/",
       page: "https://facebook.com/"
    },
    google_plus: {
        app: "gplus://plus.google.com/",
        page: "http://plus.google.com/"
    }
};

function getQueryStringValue (key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}


function handlePage() {
    var socialNetwork = getQueryStringValue("sn");
    var id = getQueryStringValue("id");

    if (socialNetwork === '' || id === '') {
        return;
    }

    var href = socialNetworks[socialNetwork].page + id;    
    var element = document.getElementById('status');
    element.innerHTML = "<a href=\"" + href +"\">Redirect</a>";
    openSocialNetwork(socialNetwork, id);
}

function openSocialNetwork(socialNetwork, id) {
    if (socialNetwork === null || id === null) {
        return;
    }
    var uri = socialNetworks[socialNetwork].app + id;
    var href = socialNetworks[socialNetwork].page + id;

    if (!isMobile) {
        window.location.href = href;
        return;
    }
    setTimeout(function(){
        window.location.href = href;
    }, 2000);

    if (!window.open(uri, "_self")) {
        console.log("failed to open app");
        window.location.href = href;        
    }
}

handlePage();