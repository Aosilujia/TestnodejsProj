var mqtt=require('mqtt');

var client  = mqtt.connect('tcp://admin:password@192.168.0.118:61613',)

client.on('connect', function () {
  client.subscribe('3503物管理器')
  client.publish('3503物管理器', '')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())

  //parse message to json

  //get its type and request response


  //analyse and deal with the json



})
