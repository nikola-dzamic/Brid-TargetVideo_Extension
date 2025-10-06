if (typeof BPLR === "undefined" && typeof Brid === "undefined") {
    console.log("No BPLR or Brid players found on page. If the BPLR or Brid player is in an iframe, this debug script will not be able to give you debug data for the player.");
} else {
    if (typeof playerDivs === "undefined" || document.querySelector('table.infoTable') === null) {
        playerDivs = [];
        
        if ($bp().config.mode === "widget") {
            playerDivs = document.querySelectorAll('div[class$=-playlist-widget], div[class$=-mid-article-widget], div[class$=-native-widget], div[class$=-simple-widget-wrapper-main]');
        } else {
            playerDivs = document.querySelectorAll('div[id^=TargetVideo_].bplr, div[id^=Brid_].bplr, div[id^=TargetVideo_].brid, div[id^=Brid_].brid');
        }
        
        playerDivs.forEach(playerDivs => {
            let playerDivsParent = playerDivs.parentElement;
            
            playerDivsParent.insertBefore(createTable(playerDivs), playerDivs);
            playerDivsParent.insertBefore(document.createElement('br'), playerDivs);
        });
    } else {
        console.log("Script already run! Exiting gracefully.");
    }
}

function createTable(playerDivs) {
    let table = Object.assign(document.createElement('table'), {
        className: "infoTable",
        width: `${playerDivs.clientWidth}`
    });
    
    function createRow(cell1, cell2) {
        let td = document.createElement('td');
        let tr = document.createElement('tr');
        
        tr.appendChild(Object.assign(document.createElement('td'), {
            innerText: cell1,
            width: `${$bp(playerDivs.id).width()/4}`
        }));
        
        switch (cell1) {
            case "JSON:":
                td.appendChild(Object.assign(document.createElement('a'), {
                    href: cell2,
                    target: "_blank",
                    innerText: cell2
                }));
                
                tr.appendChild(td);
                break;
            case "Renditions:":
                if (cell2 === "/") {
                    tr.appendChild(Object.assign(document.createElement('td'), {
                        innerText: cell2
                    }));
                } else {
                    let renditions = cell2
                    
                    renditions.forEach(rendition => {
                        td.appendChild(Object.assign(document.createElement('span'), {
                            innerText: rendition
                        }));
                    });
                    
                    tr.appendChild(td);
                }
                break;
            case "Tags:":
                if (cell2 === "/") {
                    tr.appendChild(Object.assign(document.createElement('td'), {
                        innerText: cell2
                    }));
                } else {
                    let tags = cell2.split(",");
                    
                    tags.forEach(tag => {
                        td.appendChild(Object.assign(document.createElement('span'), {
                            innerText: tag
                        }));
                    });
                    
                    tr.appendChild(td);
                }
                break;
            case "IAB categories:":
                if (cell2 === "/") {
                    tr.appendChild(Object.assign(document.createElement('td'), {
                        innerText: cell2
                    }));
                } else {
                    let categories = cell2.split(",");
                    
                    for (let i = 0; i < categories.length; i++) {
                        if (i % 2 === 0) {
                            td.appendChild(Object.assign(document.createElement('span'), {
                                innerText: `${categories[i]}, ${categories[i+1]}`
                            }));
                        }
                    }
                    
                    tr.appendChild(td);
                }
                break;
            default:
                tr.appendChild(Object.assign(document.createElement('td'), {
                    innerText: cell2
                }));
                break;
        }
        
        table.appendChild(tr);
    }
    
    createRow(`Partner domain:`, $bp(playerDivs.id).config.Partner.domain_short);
    createRow(`Video origin:`, $bp(playerDivs.id).currentSource.origin_video || "/");
    createRow(`Partner ID:`, $bp(playerDivs.id).config.partner_id);
    createRow(`User ID:`, $bp(playerDivs.id).config.Partner.user_id);
    createRow(`Player ID:`, $bp(playerDivs.id).config.id);
    createRow(`Player template ID:`, $bp(playerDivs.id).config.player_template_id);
    createRow(`Video ID:`, $bp(playerDivs.id).currentSource.id);
    createRow(`Playlist ID:`, $bp(playerDivs.id).config.Playlist?.id || $bp(playerDivs.id).config.playlist || "/");
    createRow(`Ad schedule ID:`, $bp(playerDivs.id).config.ad_schedule_id || "/");
    createRow(`Div ID:`, $bp(playerDivs.id).id);
    createRow(`Start volume:`, `${$bp(playerDivs.id).config.start_volume}%`);
    createRow(`Mime type:`, $bp(playerDivs.id).currentSource.mimeType);
    createRow(`Renditions:`, Object.keys($bp().currentSource.source));
    createRow(`Mode:`, $bp(playerDivs.id).config.mode);
    createRow(`Tags:`, $bp(playerDivs.id).currentSource.tags || "/");
    createRow(`IAB categories:`, $bp(playerDivs.id).currentSource.iab_categories || "/");
    createRow(`Player size:`, `${$bp(playerDivs.id).config.width} x ${$bp(playerDivs.id).config.height}`);
    createRow(`JSON:`, getJsonUrl(playerDivs));
    
    return table;
}

function getJsonUrl (playerDivs) {
    let urlEnv = `${$bp(playerDivs.id).assets.URLconfig.service}/${$bp(playerDivs.id).assets.URLconfig.dynamic}`;
    
    switch ($bp(playerDivs.id).config.mode) {
        case "video":
            return `${urlEnv}${$bp(playerDivs.id).config.mode}/${$bp(playerDivs.id).config.id}/${$bp(playerDivs.id).currentSource.id}.json`
        case "playlist":
            return `${urlEnv}${$bp(playerDivs.id).config.mode}/${$bp(playerDivs.id).config.id}/${$bp(playerDivs.id).config.playlist}.json`
        case "latest":
            return `${urlEnv}${$bp(playerDivs.id).config.mode}/${$bp(playerDivs.id).config.id}/0/1/25/0.json`
        case "widget":
            return `${urlEnv}${$bp(playerDivs.id).config.mode}/${$bp(playerDivs.id).config.id}/${$bp(playerDivs.id).config.playlist.id}/1/25.json`
        default:
            return "Not able to get JSON url."
    }
}