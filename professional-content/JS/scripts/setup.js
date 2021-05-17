//global variables
var lat;
var long;

window.onload = function () {
    //get approx user location
    let apiKey = '3b1e14beb2f54e4196bbdd7065fdf45e';
    $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
        console.log(data)
        lat = data.latitude;
        long = data.longitude;
        checkWindow()
    });

};

$(window).resize(function(){
    checkWindow()
})

function checkWindow(){
    if ($(window).width() < 1515) {

        if ($(window).width() < 910) {
            $(".card").css("display", "none");
            if(!$("#warning-message").length || $("#warning-message").css("display") == "none")
                $("#banner").after("<p id='warning-message'>Sorry, your screen size is unsupported</p>")
        } else{
            $(".card").css("display", "block");
            $("#warning-message").css("display", "none");
        }

        $("#day-container").empty()
        $("#day-container").append(`
            <tr>
            <td id="title-card">
                <h3>Forecast</h3>
                <i class="fas fa-cloud-sun-rain fa-4x main-icon"></i>
            </td>
            <td class="extra-space"></td>
            <td id="sun">
                <h5 class="day-title">Sunday</h5>
            </td>
            <td id="mon">
                <h5 class="day-title">Monday</h5>
            </td>
            <td id="tue">
                <h5 class="day-title">Tuesday</h5>
            </td>
            </tr>
            <tr>
            <td class="extra-space"></td>
            <td id="wed">
                <h5 class="day-title">Wednesday</h5>

            <td id="thu">
                <h5 class="day-title">Thursday</h5>
            </td>
            <td id="fri">
                <h5 class="day-title">Friday</h5>
            </td>
            <td id="sat">
                <h5 class="day-title">Saturday</h5>
            </td>
        </tr>
            `);
            $("#day-container td").css("width", "20%").css("height", "190px");
            $("#forecast-card").css("height", "425px")
            $("#day-container tr:first td").css("padding-bottom", "10px")
            $(".extra-space").css("width", "5%")

        //undo changes
     } else{
        $("#day-container").empty()
        $("#day-container").append(`
            <table id="day-container">
            <tr>
                <td id="title-card">
                    <h3>Forecast</h3>
                    <i class="fas fa-cloud-sun-rain fa-4x main-icon"></i>
                </td>
                <td id="sun">
                    <h5 class="day-title">Sunday</h5>
                </td>
                <td id="mon">
                    <h5 class="day-title">Monday</h5>
                </td>
                <td id="tue">
                    <h5 class="day-title">Tuesday</h5>
                </td>
                <td id="wed">
                    <h5 class="day-title">Wednesday</h5>

                <td id="thu">
                    <h5 class="day-title">Thursday</h5>
                </td>
                <td id="fri">
                    <h5 class="day-title">Friday</h5>
                </td>
                <td id="sat">
                    <h5 class="day-title">Saturday</h5>
                </td>
            </tr>
        </table>
        `);
        $("#forecast-card").css("height", "210px")
    }
    populateWeeklyForcast()
}

function populateWeeklyForcast(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //get current week
    var d = new Date();
    var y =  new Date(d.getFullYear(), 0, 1); 
    
    //get the day number of the year
    var numDays =  Math.floor((d - y) / (24 * 60 * 60 * 1000)); 
    var week = Math.ceil(( d.getDay() + 1 + numDays) / 7);   

    var monStart = getDateOfISOWeek(week, y.getFullYear());
    monStart.setDate(monStart.getDate() - 1)
    var temp = monStart;

    //append to table cells
    for(var i = 0; i < 7; i++){
        //gets day of week like 'mon', 'tue', etc.
        let dayOfWeek = temp.toString().split(' ')[0].toLowerCase();
        $("#" + dayOfWeek).append("<p class='dayOfMonth'>-" + months[temp.getMonth()] + " " + temp.getDate() + "-</p>")

        if(d.getDate() == temp.getDate()){
            $("#" + dayOfWeek + " .dayOfMonth").css("color", "#F06C9B").css("font-weight", "bold")
        }

        temp.setDate(temp.getDate() + 1)
    }

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