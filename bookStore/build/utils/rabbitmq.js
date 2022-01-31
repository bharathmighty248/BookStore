"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var amqp = require('amqplib/callback_api');

var RabbitMq = /*#__PURE__*/(0, _createClass2["default"])(function RabbitMq() {
  (0, _classCallCheck2["default"])(this, RabbitMq);
  (0, _defineProperty2["default"])(this, "publisher", function (data, queue) {
    amqp.connect("amqp://guest:guest@localhost:5672", function (err, connection) {
      if (err) {
        throw err;
      } else {
        connection.createChannel(function (error, channel) {
          if (error) {
            throw error;
          } else {
            var message = JSON.stringify(data);
            channel.assertQueue(queue);
            channel.sendToQueue(queue, Buffer.from(message));
          }
        });
      }
    });
  });
  (0, _defineProperty2["default"])(this, "subscriber", function (queue) {
    return new Promise(function (resolve, reject) {
      amqp.connect("amqp://guest:guest@localhost:5672", function (error, connection) {
        if (error) {
          reject(error);
        } else {
          connection.createChannel(function (error, channel) {
            if (error) {
              throw error;
            } else {
              channel.assertQueue(queue);
              channel.consume(queue, function (message) {
                resolve(message.content.toString());
              });
            }
          });
        }
      });
    });
  });
});
module.exports = new RabbitMq();