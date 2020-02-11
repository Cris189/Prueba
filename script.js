//alert ('Hola hola hola');

var etiqueta;
function onloadFcn()
{
	etiqueta=document.getElementById("led on");
	etiqueta.innerHTML="led ON";
}

/*
rpi=mqtt.py			sitio web
Se suscribe a led	Se suscribe a test
topic_tx=test		topic_rx=test

topic_rx=led		topic_tx=led
*/

  // Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("tailor.cloudmqtt.com", 30142 , "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
	//<!--Diccionario, se asocia una funcion a valores-->
    useSSL: true,
    userName: "cmtaxycn",
    password: "7E6pGjhFHi3f",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
  topicRx="test";
  topicTx="led";
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
	
    client.subscribe(topicRx);
    message = new Paho.MQTT.Message("Hola desde la Web");
    message.destinationName = topicTx;
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("El mensaje recibido es: "+message.payloadString);
	//sensor=document.getElementById("sensor_val");
	//sensor.innerHTML=message.payloadString;
	accion(message.payloadString);
  }
  
    // called when a message arrives
  function sendMessage(msg) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topicTx;
    client.send(message);
	
  }

    // called when a message arrives
  function ledOn() {
	sendMessage('led=1')	
  }
  
  function ledOff() {
	sendMessage('led=0')	
  }
  
 function accion(msg)
 {
	 mensaje=msg.split('=');
	 if(msg[0]=='i')
	 {
		 document.getElementById("sensor_i").innerHTML=mensaje[1];
		 document.getElementById("sensor_p").innerHTML=mensaje[1];
		 document.getElementById("sensor_l").innerHTML=mensaje[1];
	 }
 }