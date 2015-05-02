(function (w, d) {
    'use strict';

    var body = d.body;

    w.onload = function () {
        body.addClass('loaded');
        _enableButtons();
    };

    // views
    var views = {
        controlBox: d.getElementById('control-box'),
        widgetBox: d.getElementById('widget-box'),
        messageBox: d.getElementById('message-box')
    };

    // message ctrl
    var message = {
        show: function (msg, error) {
            views.messageBox.removeClass('error');
            if (error) {
                views.messageBox.addClass('error');
            }
            views.messageBox.innerHTML = msg;
        },
        close: function () {
            views.messageBox.innerHTML = '';
        }
    };

    // main ctrls
    var baseTemplate = d.getElementById('sample-widget'),
        locationBtn = d.getElementById('share-location-button'),
        cityBtn = d.getElementById('city-location-button'),
        cityInput = d.getElementById('location-input');

    function _enableButtons() {
        locationBtn.removeAttribute('disabled');
        cityBtn.removeAttribute('disabled');
        cityInput.removeAttribute('disabled');
    }

    function _disableButtons() {
        locationBtn.setAttribute('disabled', '');
        cityBtn.setAttribute('disabled', '');
        cityInput.setAttribute('disabled', '');
    }

    function _insertWidget(type) {
        var newTemplate = baseTemplate.cloneNode(true),
            newWidget = new Condense();

        views.widgetBox.innerHTML = '';

        message.close();

        if (type === 'byInput') {
            if (cityInput.value === '') {
                message.show('Please insert a city name', true);
                return;
            }
            newTemplate.setAttribute('data-condense-location', cityInput.value);
            newTemplate.id = 'city-widget';
            newWidget.set(newTemplate, function () {
                message.close();
                views.widgetBox.appendChild(newTemplate);
                newTemplate.removeClass('hidden');
                _enableButtons();
            }, function () {
                message.show('Location not found', true);
                _enableButtons();
            });
        }

        if (type === 'byGeolocation') {
            cityInput.value = '';
            newTemplate.id = 'location-widget';
            newWidget.set(newTemplate, function () {
                message.close();
                views.widgetBox.appendChild(newTemplate);
                newTemplate.removeClass('hidden');
                _enableButtons();
            }, function () {
                message.show('Location not found', true);
                _enableButtons();
            });
        }

        message.show('Loading...');
        _disableButtons();
    }

    cityBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _insertWidget('byInput');
    }, false);

    locationBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _insertWidget('byGeolocation');
    }, false);

    w.onkeydown = function (e) {
        if (e.keyCode === 13) {
            _insertWidget('byInput');
        }
    };

})(window, document);