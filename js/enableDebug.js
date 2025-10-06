if (window.location.hash === "#BPLREnableDebug" || window.location.hash === "#BridEnableDebug") {
    window.location.hash = "";
} else {
    if (typeof BPLR !== "undefined") {
        window.location.hash = "BPLREnableDebug"; 
    }
    
    else if (typeof Brid !== "undefined") {
        window.location.hash = "BridEnableDebug"; 
    }
}

window.location.reload();