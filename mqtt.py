import passw #Se importa datos del servidor
import paho.mqtt.client as mqtt
import os, urlparse

#sensor=p
#['led','0']

def accion(msg):
    mensaje=msg.split('=')
    if mensaje[0]=='led':
        if mensaje[1]=='0':
            print('led off')
        if mensaje[1]=='1':
            print('led on')

#Siempre se conserva on_connect, on_message, on_publish, on_subscribe
# Define event callbacks
def publicar(msg): #crear un mensaje con una funcion
	#print (msg)
	mqttc.publish(topic2, msg)
    
def publicarT(topic,msg):
    print(msg)
    mqtt.publish(topic,msg)

#publicar('10;15;100;0')
#mensaje=msg.split(';');
#sensor_p.innerHTML=mensaje[0];
#sensor_l.innerHTML=mensaje[1];
#sensor_i.innerHTML=mensaje[3];

def on_connect(client, userdata, flags, rc): #sirve para conectarse al servidor
    print("rc: " + str(rc))

# def new_message(client, obj, msg):
   
    # print("Nuevo mensaje: "+str(msg.payload));

def on_message(client, obj, msg):
    #print("Nuevo mensaje: "+str(msg.payload));
    accion(msg.payload);

def on_publish(client, obj, mid):
    #print("mid: " + str(mid))
    pass

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(client, obj, level, string):
    print(string)

#Nuevo Cliente mqttc##

mqttc = mqtt.Client()
# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

# Uncomment to enable debug messages
#mqttc.on_log = on_log

# Connect
mqttc.username_pw_set(passw.user, passw.psw)
mqttc.connect(passw.server, passw.port)
topic1="led" #varible del tema al que se pueden suscribir, es el canal de youtube
topic2="test"
# Start subscribe, with QoS level 0
mqttc.subscribe(topic1, 0)

# Publish a message
mqttc.publish(topic1, 'led')
mqttc.publish(topic2, 'test')
#mqttc.publish(topic,topic)
# Continue the network loop, exit when an error occurs

rc = 0
import time
i=0
while rc == 0: #control de errores
	time.sleep(2)
	i=i+1
	publicar('l='+str(i))
	rc=mqttc.loop()
print("rc: " + str(rc))