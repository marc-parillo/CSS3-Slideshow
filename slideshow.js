var slideshow = (function () {

  var config = {

      active: 0,

      timer: 5000,

      startOnLoad : true,

      interval: null,

      list: [],

      allEvents: {

        'prev': function () {

          stopSlideShow();

          setToggleButton('Resume');
          setNewImage('prev');
          revealImage();

        },

        'next': function () {

          stopSlideShow();
          setToggleButton('Resume');
          setNewImage('next');
          revealImage();

        },

        'toggle': function () {

          var isPlaying = this.interval !== null,
              text;

          if (isPlaying) {
            stopSlideShow();
            text = "Resume";
          } else {
            setNewImage('next');
            revealImage();
            startSlideShow();
            text = "Pause";
          }

          setToggleButton(text);
          

        }

      }

    },

    init = function (params) {

      if (params) {
        config.timer = (typeof params.timer !== undefined) ? parseInt(params.timer, 10) : 5000;
        config.startOnLoad = (typeof params.startOnLoad !== undefined) ? !!params.startOnLoad : true;
      }

      var slideshow = document.querySelector("#image-viewer");
      config.list = slideshow.getElementsByTagName('li');

      if (config.list.length <= 1) {
        console.info('Add at least two images to start the slideshow');
        return;
      }

      if (config.startOnLoad) {
        startSlideShow();
      } else {
        revealImage();
        setToggleButton('Resume');
      }

      addEvents();

    },

    startSlideShow = function () {

      var i, li, img;

      config.interval = setInterval(function () {

        setNewImage('next');
        revealImage();

      }, config.timer);

    },

    stopSlideShow = function () {

      clearInterval(config.interval);
      config.interval = null;

    },

    setNewImage = function (direction) {

      if (direction === 'next') {
        config.active = config.active + 1 > config.list.length - 1 ? 0 : config.active += 1;
      } else {
        config.active = config.active === 0 ? config.list.length - 1 : config.active -= 1;
      }

    },

    revealImage = function () {

      for (i = 0; i < config.list.length; i++) {
        config.list[i].className = "";
      }

      config.list[config.active].className = "active";

    },

    addEvents = function () {

      var key;

      for (key in config.allEvents) {

        if (!config.allEvents.hasOwnProperty(key)) {
          continue;
        }

        elem = document.querySelector("#" + key);
        elem.addEventListener('click', clickEvent, false);

      }

    },

    clickEvent = function (e) {

      var target = e.target,
          id = target.id;

      config.allEvents[id].call(config);

    },

    setToggleButton = function(text) {

      var btn = document.querySelector("#toggle");
      btn.innerHTML = text;

    };

  return {

    init: init

  };

}());