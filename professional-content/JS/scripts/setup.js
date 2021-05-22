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

        $(".break, .spacer").css("display", "inline-table");
        $("#day-container div").css("width", "17%")
        $("#humidity-container i").css("display", "block")
        $("#loading-row").css("top", "30%").css("left", "calc(50% - 45px");

        //undo changes
     } else{
        $(".break, .spacer").css("display", "none");
        $("#day-container div").css("width", "calc(12.5% - 20px")

    }

}

function populateWeeklyForcast(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //get current week
    var d = new Date();
    var y =  new Date(d.getFullYear(), 0, 1); 
    
    //get the day number of the year
    var numDays =  Math.floor((d - y) / (24 * 60 * 60 * 1000)); 
    var week = Math.ceil(( d.getDay() + 1 + numDays) / 7);   
    var temp = d;
    //append to table cells
    for(var i = 0; i < 7; i++){
        //gets day of week like 'mon', 'tue', etc.
        let dayOfWeek = temp.toLocaleDateString('en-US', { weekday: 'long' });
        console.log(dayOfWeek)
        $("#day-" + (i+1)).append("<p class='dayOfMonth'>-" + months[temp.getMonth()] + " " + temp.getDate() + "-</p>")
        $("#day-" + (i+1) + " h5").text(dayOfWeek)

        temp.setDate(temp.getDate() + 1)
    }

    $.ajax("http://www.7timer.info/bin/api.pl?lon=" + lon + "&lat=" + lat +"&product=civillight&output=json",
        {
            success: function (data) {
                data = JSON.parse(data)
                console.log(data);
                for(var i = 0; i < 7; i++){
                    $("#day-" + (i+1)).append("<p class='weather-report'>" + weatherCleanup(data.dataseries[i].weather)+ "</p>")
            
                }
                //remove loading gif
                $("#loading-row").css("display", "none")
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