exports.handler = function( event, context ) {

    var http = require( 'https' );

    var url = 'http://store.steampowered.com/api/appdetails?appids=';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );
            var text = 'Here's what I found about ';
            var info = (json.detailed_description);
            
            text+=info+"Thank You";
            output( text, context );


        } );

    } );

};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "SteamGameInfo",
            content: text
        },
        shouldEndSession: true
    };

    context.succeed( { response: response } );

}
