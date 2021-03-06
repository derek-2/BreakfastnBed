export default class MarkerManager{
    constructor(map){
        this.map= map;
        this.markers= {};
        this.infoWindows={};
    }

    updateMarkers(listings){
        Object.values(listings).forEach(listing => {
            if (this.markers[listing.id] === undefined){
                this.markers[listing.id]=this.createMarker(listing);
                this.infoWindows[listing.id]=this.createInfoWindow(listing);

                this.markers[listing.id].addListener('click', () => {
                    Object.values(this.infoWindows).forEach(infoWindow => infoWindow.close())
                    this.infoWindows[listing.id].open({
                        anchor: this.markers[listing.id],
                        map: this.map,
                        shouldFocus: false
                    })
                })

                this.markers[listing.id].addListener('mouseover', () => {
                    if (document.getElementById(`listing-${listing.id}`)){
                        document.getElementById(`listing-${listing.id}`).classList.toggle('highlight-listing')
                        }
                    })
                    this.markers[listing.id].addListener('mouseout', () => {
                        if (document.getElementById(`listing-${listing.id}`)){
                        document.getElementById(`listing-${listing.id}`).classList.toggle('highlight-listing')
                        }
                    })

                    const iwOuter = $('.gm-style-iw');
                    const iwBackground = iwOuter.prev();
                    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
                    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
            }
        });
    }

    createMarker(listing){
        return new google.maps.Marker({
            position: {lat: listing.latitude, lng: listing.longitude},
            map: this.map,
            title: `listing #${listing.id}`,
            animation: google.maps.Animation.DROP,
            label: {
                text: `$${listing.price_per_night.toString()}`,
                fontWeight: 'bold',
                fontSize: '12'
            },
            icon: {
                url: window.whitecircle,
                scaledSize: new google.maps.Size(31,31),
            }
        })
    }

    createInfoWindow(listing){
        let contentString=
            (`<div class='info-window'>
                <img class='map-images' src=${listing.photoUrls[0]} />
                <div class='info-window-text'>
                    <p ><b>${listing.description}</b></p>
                    <p class='info-window-title'>${listing.title}</p>
                    <p>$${listing.price_per_night} night</p>
                </div>
            </div>`
            
            )
        
        const infowindow = new google.maps.InfoWindow({
            content: contentString
        })
        return infowindow;
    }
}