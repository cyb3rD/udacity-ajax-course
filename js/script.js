
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var mapsGoogleSrc = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=';
    var street = $('#street').val();
    var city = $('#city').val();
    $body.append('<img class="bgimg" src="' + mapsGoogleSrc + city + ', ' + street + '">');


    var apiNYTKey = 'aa4cb30b32ca1932efccf22db70e420d:15:74798596';
    var searchQuery =  city,
        searchUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ city + '&api-key='+ apiNYTKey ;

    // usign NYT API
    $.getJSON(searchUrl, function(json, textStatus) {
            /*optional stuff to do after success */
            console.log(json);
            var articles = json.response.docs;

            for (var i = 0; i < articles.length; i++) {
                var paragraph = articles[i].lead_paragraph,
                    headline = articles[i].headline.main,
                    articleLink = articles[i].web_url;
                $nytElem.append('<li><a href="' + articleLink + '">' + headline + '</a><p>'+ paragraph + '</p></li>');
            }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
