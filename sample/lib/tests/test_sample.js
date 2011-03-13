$(function(){
    
    /*
    * This turns off jquery effects so we don't have to wait for them.
    * Makes tests more reliable and faster 
    */ 
    $.fx.off = true;
    
    
    module("Testing searchGoogle");
    
    test("makes an ajax call", function(){
        expect(5);
        var ajaxStub = this.stub($, 'ajax');
        var keyword = "test";
        var ajaxData = {
            url: "http://www.google.com/search?q="+keyword,
            type: "GET",
            dataType: "html"
        };
        searchGoogle(keyword);
        ok($.ajax.called);
        if ($.ajax.calledOnce) {
            var ajaxArguments = $.ajax.args[0][0];
            equals(ajaxArguments.url, ajaxData.url );
            equals(ajaxArguments.type, ajaxData.type);
            equals(ajaxArguments.dataType, ajaxData.dataType);
            equals(ajaxArguments.success, _precessResults);
        }
    });
    
    test("related searches are shown", function(){
        expect(2);
        var searches = '<div class="brs_col"><p><a href="/some_link"><b>speed</b> test</a></p></div>';
        var googleResultsPage = '<html><head><body><div id="brs"><div class="med">Pesquisas relacionadas</div>'+searches+'</div></body></head></html>';
     
        _precessResults(googleResultsPage);
        
        var relatedSearches = $("#related");
        equals(relatedSearches.length, 1);
        equals(relatedSearches.html(), searches);
        
        
    });
    
    module("Testing some random jQuery effect");
    
    test("animation on #animate should occour", function(){
        var $animate = $("#animate");
        var animateMock = this.mock($animate);
        animateMock.expects("animate").withArgs({"right": "+=50px"}, "slow");
        
        animateThis($animate);
    });
});