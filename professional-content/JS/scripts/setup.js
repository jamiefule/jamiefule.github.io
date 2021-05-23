//global variables
var lat;
var lon;
var weather;

window.onload = function () {
    //get approx user location
    let apiKey = '3b1e14beb2f54e4196bbdd7065fdf45e';
    $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
        console.log(data)
        lat = data.latitude;
        lon = data.longitude;
        $("#location").val(data.postal_code)
        checkWindow()
        populateWeeklyForcast()
    });
    
};

$(window).resize(function(){
    checkWindow()
})

function checkWindow(){
    if ($(window).width() < 1400) {
        //if the user's screen size can't meet minimum requirements
        if ($(window).width() < 780) {
            $(".card").css("display", "none");
            if(!$("#warning-message").length || $("#warning-message").css("display") == "none")
                $("#banner").after("<p id='warning-message'>Sorry, your screen size is unsupported</p>")
        } else{
            $(".card").css("display", "block");
            $("#warning-message").css("display", "none");
        }
     }

}

function populateWeeklyForcast(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weatherKey = {"Cloudy": "fas fa-cloud",
                         "Partly Cloudy": "fas fa-cloud-sun",
                         "Clear": "fas fa-sun",
                         "Light Rain": "fas fa-cloud-rain",
                         "Rain": "fas fa-cloud-showers-heavy",
                         "Snow": "fas fa-snowflake"}

    //get current week
    var d = new Date();
    var y =  new Date(d.getFullYear(), 0, 1); 
    
    //get the day number of the year
    var numDays =  Math.floor((d - y) / (24 * 60 * 60 * 1000)); 
    var week = Math.ceil(( d.getDay() + 1 + numDays) / 7);   
    var temp = d;
    //append date info to table cells
    for(var i = 0; i < 7; i++){
        //gets day of week like 'mon', 'tue', etc.
        let dayOfWeek = temp.toLocaleDateString('en-US', { weekday: 'long' });
        console.log(dayOfWeek)
        $("#day-" + (i+1)).append("<p class='dayOfMonth'>-" + months[temp.getMonth()] + " " + temp.getDate() + "-</p>")
        $("#day-" + (i+1) + " h5").text(dayOfWeek)

        temp.setDate(temp.getDate() + 1)
    }
    //append weather to forecast
    $.ajax("http://www.7timer.info/bin/api.pl?lon=" + lon + "&lat=" + lat +"&product=civillight&output=json",
        {
            success: function (data) {
                data = JSON.parse(data)
                console.log(data);
                for(var i = 0; i < 7; i++){
                    $("#day-" + (i+1)).append("<p class='weather-report'>" + weatherCleanup(data.dataseries[i].weather)+ "</p>")
                    $("#day-" + (i+1)).append("<i class='weather-icon fa-2x " + weatherKey[weatherCleanup(data.dataseries[i].weather)] +"'></i>")
            
                }
                //fill out wind
                var windVal = data.dataseries[0].wind10m_max
                var windMapping = {
                    1: "Below 0.3m/s (Calm)",
                    2: "0.3-3.4m/s (Light)",
                    3: "3.4-8.0m/s (Moderate)",
                    4: "8.0-10.8m/s (Fresh)",
                    5: "10.8-17.2m/s (Strong)",
                    6: "17.2-24.5m/s (Gale)",
                    7: "24.5-32.6m/s (Storm)",
                    8: "Over 32.6m/s (Hurricane)"
                }
                $("#wind-card").append("<p id='wind-val'>" + windMapping[windVal] + "</p>")

                //remove loading gif
                $(".loading-row td img").css("display", "none")
        }   
    });

}

//https://stackoverflow.com/a/38510584
function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function weatherCleanup(s){
    switch(s){
        case "clear":
            return "Clear";
        case "cloudy":
            return "Cloudy";
        case "lightrain":
            return "Light Rain";
        case "rain":
            return "Rain";
        case "pcloudy":
            return "Partly Cloudy";
        case "snow":
            return "Snow"
        default:
            return s;

    }
}