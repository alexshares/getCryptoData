var fs 				= require('fs');
var Poloniex 		= require('poloniex.js');
var poloniex 		= new Poloniex();
Poloniex.STRICT_SSL = false;  // this workaround shouldn't be necessary

var watchList = [
                    "BTC_ETH", 
                    "BTC_CVC"
                ];

//updateMainList();

fetchData(watchList);

function fetchData (watchList) {
    poloniex.returnTicker(function(err, data) {
        if (err){
            // Log error message 
            console.log("An error occurred: " + err.msg);
     
            // Disconnect 
            return true;
        } else {
            
            var list = Object.keys(data);

            for (var i = 0; i < list.length; i++ ) {

                if(checkSet(list[i],watchList)){
                    // update file
                    writeData(data[list[i]], list[i]);
                }
            
            }

        }
        
    });
}

function checkSet(item, list) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i] == item){
            return true;
        } else {
            
        }
    }
    return false;
}

function writeData (data, SYMBOL) {

	
	var file = 'trackingData/' + SYMBOL + '.csv';

	fs.appendFile(file, (JSON.stringify(data) + ","), 'utf8', function (err) {
	  if (err) {
	    console.log('Error occured while updating ' + file + ':' + err);
	  } else{
	    console.log('Saved New Data to ' + file);
	  }
	});
}

function updateMainList () {
    poloniex.returnTicker(function(err, data) {
        if (err){
            // Log error message 
            console.log("An error occurred: " + err.msg);
     
            // Disconnect 
            return true;
        } else {
            
            var list = Object.keys(data);

            var file = 'trackingData/index.csv';

            fs.appendFile(file, list, 'utf8', function (err) {
              if (err) {
                console.log('Error occured while updating ' + file + ':' + err);
              } else{
                console.log('Saved New Data to ' + file);
              }
            });

        }
        
    });
}