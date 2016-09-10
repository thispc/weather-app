$("document").ready(function(){
  
  var long="";var lat="";
  var tempF=0;
  var locat="";
  var temp=0;
  var main="";
  var ico="";
  var ip="";
  $.ajax({
    url: 'https://api.ipify.org?format=json',
    dataType: 'json',
    async : false,
    success: function(data){
    ip=data.ip;
  }
  });
  
  $.ajax({
  url: 'https://crossorigin.me/http://ip-api.com/json/'+ip,
  dataType: 'json',
    
  async: false,
  
  success: function(data) {
    locat=data.city+","+data.country;
    long = data.lon;
    lat = data.lat;
  }
         
});


  $("#loc").html(locat);
  
  var query='https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&APPID=b803bb5d31267fbfe57ef4eaf6617bb3'
  $.getJSON(query,function(data){
    temp=data["main"]["temp"];
    tempF=(temp* 9 / 5 + 32).toFixed(2);
    main=data["weather"][0]["main"];
    ico=data["weather"][0]["icon"];
    
     $("#temp").html(temp+"° C");
  $("#main_w").html(main);
    $("#main_i").html('<img src="https://crossorigin.me/http://openweathermap.org/img/w/'+ico+'.png" > ');
    var mapp={
      "clear sky":'<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div> ',
      "few clouds":'<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
      "scattered clouds":'<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
      "broken clouds":'<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
      "shower rain":'<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>',
      "rain":'<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>',
      "thunderstorm":'<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>',
      "snow":'<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>',
      "mist":'<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>'
    }
  if(mapp[data["weather"][0]["description"]]===undefined)
 { 
   $("#change").html(mapp["mist"]);
 }
    else
      {
$("#change").html(mapp[data["weather"][0]["description"]]);
      }
  });
 
  
  $('#switch').click(function () {
  if ($('#temp').text().indexOf('F') > -1) {
    $('#temp').text(temp + '° C');
  } else {
    $('#temp').text(tempF + '° F');
  }

  
});
});