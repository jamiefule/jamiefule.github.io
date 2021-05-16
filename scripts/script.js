
$(document).on('change', "#art-toggle", function(){

    //if art mode
    if($("#art-toggle").prop("checked")){
        //show art
        $(".art").css("display", "table");
        $(".art-title").css("display", "block");
        //hide professional
        $(".professional").css("display", "none");
        $(".professional-title").css("display", "none");

        //return background
        $("#bgImage").css("display", "block");
        $("#translucent").css("background-color", "rgba(27, 61, 206, 0.3)");
        $("#bgBlob").css("display", "none");
        $(".info-container").css("display", "none");



    }

    //if professional mode
    if(!$("#art-toggle").prop("checked")){
        //hide art
        $(".art").css("display", "none");
        $(".art-title").css("display", "none");

        //show professional
        $(".professional").css("display", "table");
        $(".professional-title").css("display", "block");

        //change bg
        $("#bgImage").css("display", "none");
        $("#translucent").css("background-color", "#EFEFEF");
        $("#bgBlob").css("display", "block");
        $(".info-container").css("display", "block");



    }
})