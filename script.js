 
(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 10);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let luhend = "";

            if (h < 12){
                luhend = " EL";
            }
            if (h >= 12){
                luhend = " PL";
            }
            if (h> 12){
                h = h - 12;
            }
            
            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + luhend;
            
        };
        
    });
    
    // forms

    //Kaks järgnevat koodijuppi on leitud internetist leheküljelt www.w3resource.com
    


    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        

        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
        }

        if (eesnimi.value === "") {
            
            alert("Palun sisestage oma eesnimi");
            
            eesnimi.focus();
            
            return;
        }
        if (perenimi.value === "") {
            
            alert("Palun sisestage oma perekonnanimi.");
            
            eesnimi.focus();
            
            return;
        }
        
        if (perenimi.value === "") {
            
            alert("Palun sisestage oma perekonnanimi.");
            
            eesnimi.focus();
            
            return;
        }
        let raadio1 = document.getElementById("v1.1").checked;
        let raadio2 = document.getElementById("v1.2").checked;

        if (raadio1 ===false && raadio2 ===false){
            alert("Palun valige tarne aeg");
            return;
        }

        let kingitus = document.getElementById("v1").checked;
        let tarne = document.getElementById("v2").checked;
        let lisa = 0
        if (kingitus === true){
            lisa += 5
        }
        if(tarne === true ){
            lisa +=1
        }
        if (linn.value === "tln" && lisa==0){
            
            e.innerHTML = "Teie tarne on tasuta!";
            
        }
        if (linn.value === "tln" && lisa!=0){
            
            e.innerHTML = "Teie tarne maksab <br>" + lisa + " &euro;";
            
        }
        if (linn.value === "trt"){
            lisa += 2.5;
            e.innerHTML = "Teie tarne maksab <br>" + lisa + " &euro;";
        }
        if (linn.value === "nrv"){
            lisa += 2.5;
            e.innerHTML = "Teie tarne maksab <br>" + lisa + " &euro;";
        }
        if (linn.value === "prn"){
            lisa += 3;
            
            e.innerHTML = "Teie tarne maksab <br>" + lisa + " &euro;";
        }
               
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map
let infobox;
let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";


    let centerPoint = new Microsoft.Maps.Location(	
        58.2900887, 26.0470219
    );
    let Tartu = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let viljandi = new Microsoft.Maps.Location(
            58.3676529, 
            25.595335
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    

        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
    });
    


    infobox.setMap(map);

    
    let pushpin = new Microsoft.Maps.Pushpin(Tartu, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let pushpin2 = new Microsoft.Maps.Pushpin(viljandi, {
        title: 'Viljandi',
        //subTitle: 'Kultuurne koht',
        //text: 'Viljandi'
    });
    

    //Store some metadata with the pushpin.
    pushpin.metadata = {
        title: "Tartu Ülikool",
        description: 'Eesti maineikaim ülikool'
    };
    pushpin2.metadata = {
        title: "Viljandi",
        description: 'Viljandi on väga kultuurne koht.'
    };

    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    //Add pushpin to the map.
    map.entities.push(pushpin);
    map.entities.push(pushpin2);



function pushpinClicked(e) {
//Make sure the infobox has metadata to display.
if (e.target.metadata) {
    //Set the infobox options with the metadata of the pushpin.
    infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true
    });
}
}

   

    

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
