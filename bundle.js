/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {// import highlightCurrentWord from './client/javascripts/highlightText';
	// const analyzeWPM = require('./client/javascripts/analyzeWPM');
	// const Game = require('./client/javascripts/game');
	// const Player = require('./client/javascripts/player');

	// const divCanvasContainer = document.getElementById('canvas-container');
	// const canvas = document.getElementById('canvas');
	// const WIDTH = window.innerWidth;
	// canvas.width = WIDTH;
	// const ctx = canvas.getContext('2d');
	const express = __webpack_require__(1);
	const app = express();
	const server = __webpack_require__(2).Server(app);
	// import IO from 'socket.io-client'

	app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
	  res.sendFile(__dirname + '/bundle.js');
	});
	app.use('/client', express.static(__dirname + '/client'));
	server.listen(2000);
	console.log('server started');


	const SOCKET_LIST = {};
	const PLAYER_LIST = {};

	class Player {
	  constructor(id){
	    this.x = 250;
	    this.y = 250;
	    this.id = id;
	    this.number = "" + Math.floor(10 * Math.random());
	  }
	}
	const io = __webpack_require__(3)(server, {});
	io.sockets.on('connection', socket => {
	  console.log('socket connection');
	  socket.id = Math.random();
	  SOCKET_LIST[socket.id] = socket;

	  let player = new Player(socket.id);
	  PLAYER_LIST[socket.id] = player;

	  socket.on('disconnect', () => {
	    delete SOCKET_LIST[socket.id];
	    delete PLAYER_LIST[socket.id]
	  });
	});

	setInterval(() => {
	  const pack = [];
	  for (let i in PLAYER_LIST){
	    console.log(PLAYER_LIST)
	    let player = PLAYER_LIST[i];
	    player.x++;
	    player.y++;
	    pack.push({
	      x: player.x,
	      y: player.y,
	      number: player.number
	    });
	  }
	  for (let i in SOCKET_LIST){
	    let socket = SOCKET_LIST[i];
	    socket.emit('newPositions', pack);
	  }
	}, 1000/25);

	//
	//   // document.addEventListener("DOMContentLoaded", function(){
	//   //   let wpm = new analyzeWPM;
	//   //   let game = new Game(5, ctx, wpm);
	//   //   game.initializeGame(10);
	//   //   let wordsArray = game.wordsArray;
	//   //   // highlightCurrentWord(0, wordsArray);
	//   // });
	//   // server.emit('serverMsg', {
	//   //   msg: 'hello'
	//   // })
	// })
	//
	// // setInterval(() => {
	// //   const pack = [];
	// //   for (let i in PLAYER_LIST){
	// //     let player = PLAYER_LIST[i];
	// //     player.updatePosition();
	// //     pack.push({
	// //       x: player.x,
	// //       y: player.y,
	// //       number: player.number
	// //     })
	// //   }
	// //   for (let i in SOCKET_LIST){
	// //     let socket = SOCKET_LIST[i];
	// //     socket.emit('newPositions', pack);
	// //   }
	// // }, 1000/25);
	//
	//
	//
	//
	//
	//
	//
	// // client ask server for file (express)
	// // client send data to server (input)
	// // server send data to client (monster position)

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);