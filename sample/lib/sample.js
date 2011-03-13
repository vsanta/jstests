

function searchGoogle (keyword){
    var ajaxData = {
        url: "http://www.google.com/search?q="+keyword,
        type: "GET",
        dataType: "html",
        success: _precessResults
    };

    $.ajax(ajaxData);
};

function _precessResults(data){
    $results = $(data).find(".brs_col");
    $related = $('<div id="related"/>').append($results);
    $("#container").append($related);
};

function animateThis($animateMe){
    $animateMe.animate({"right": "+=50px"}, "slow");
};