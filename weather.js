
var api_key = "c3d570b4f3b26bfbeca9f990921df072";

	
	

function sendRequest () {
	
	document.getElementById("main").style.display = '';
	
    var xhr = new XMLHttpRequest();
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json", true);
	var tempMax,tempMin,temp,tempSunrise,tempSunset,tempVisibility;

	
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
        
			
			table = (( document.getElementById ) ? document.getElementById("city_info") : (( document.all ) ? document.all.data : document.layers.data )); // Table Element
            table.rows[ 0 ].cells[ 0 ].innerText = "City: "+json.name;
			
		    table.rows[ 0 ].cells[ 1 ].innerText = "Geo Coords: ["+json.coord.lat+","+json.coord.lon+"]"; 
		   	
			tempSunrise= (new Date(json.sys.sunrise*1000)).getHours()+":"+(new Date(json.sys.sunrise*1000)).getMinutes()+":"+(new Date(json.sys.sunrise*1000)).getSeconds();
			tempSunset=(new Date(json.sys.sunset*1000)).getHours()+":"+(new Date(json.sys.sunset*1000)).getMinutes()+":"+(new Date(json.sys.sunset*1000)).getSeconds();
			
			table.rows[ 1 ].cells[ 0 ].innerText ="Sunrise Time: "+tempSunrise;
			table.rows[ 1 ].cells[ 1 ].innerText ="Sunset Time: "+tempSunset;
		   
			table.rows[ 2 ].cells[ 0].innerText ="Pressure: "+json.main.pressure+" hpa";
			table.rows[ 2 ].cells[ 1 ].innerText ="Humidity: "+json.main.humidity+" %";
         
			temp=(json.main.temp);
			temp=temp-273.15;
		 
			table.rows[ 3 ].cells[ 0 ].innerText ="Temperature: "+temp.toFixed(2)+"°C";
			table.rows[ 3 ].cells[ 1 ].innerText ="";

			tempMin=(json.main.temp_min);
			tempMax=(json.main.temp_max);
			tempMin=tempMin-273.15;
			tempMax=tempMax-273.15;
		  
			table.rows[ 4 ].cells[ 0 ].innerText ="Min Temperature: "+tempMin.toFixed(2)+"°C";
			table.rows[ 4 ].cells[ 1 ].innerText ="Max Temperature: "+tempMax.toFixed(2)+"°C";

		  
			table.rows[ 5 ].cells[ 0 ].innerText ="Clouds: "+json.clouds.all+" %";
		  
		  
		 
		  
			var range=json.weather[0].id;
			if(range >=200 && range<=299)
			{
			 document.getElementById("advise").innerHTML = "Advise : There is a thunderstorm,So please stay at home ";
			 table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: Low ";
			}
			else  if(range >=300 && range<=399)
			{
			document.getElementById("advise").innerHTML = "Advise : It's drizzling today , So carry your Umbrella with you  ";
			table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: Moderate ";
			}
			else  if(range >=500 && range<=599)
			{
			document.getElementById("advise").innerHTML = "Advise : It's raining today , So carry your Umbrella with you  ";
			table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: Low ";
			}
			else  if(range >=600 && range<=699)
			{
			document.getElementById("advise").innerHTML = "Advise : It's snowing today , So carry your Coat with you  ";
			table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: Low ";
			}
			else  if(range==800)
			{
			document.getElementById("advise").innerHTML = "Advise : It's a sunny day , have a nice day!!!  ";
			table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: High ";
			}
			else  if(range >=801 && range<=899)
			{
			document.getElementById("advise").innerHTML = "Advise : It's a cloudy day,It may rain , So carry your Umbrella with you  ";
			table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: Moderate ";
			}
			else  if(range >=900 && range<=999)
			{
			document.getElementById("advise").innerHTML = "Advise : It's an extreme weather out today, So better stay at home ";
			table.rows[ 5 ].cells[ 1 ].innerText ="Visibility: Low ";
			}
		 
		  }
	   
    };
    xhr.send(null);
}
