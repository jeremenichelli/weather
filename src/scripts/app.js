(function (w, d) {
    'use strict';

    var body = d.body;

    w.onload = function () {
        body.addClass('loaded');
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
    }

    function _disableButtons() {
        locationBtn.setAttribute('disabled', '');
        cityBtn.setAttribute('disabled', '');
    }

    function _insertCityWidget() {
        views.widgetBox.innerHTML = '';

        message.close();

        if (cityInput.value === '') {
            message.show('Please insert a city name', true);
            return;
        }

        message.show('Loading...');
        _disableButtons();

        var newTemplate = baseTemplate.cloneNode(true),
            newWidget = new Condense();

        newTemplate.id = 'city-widget';
        newTemplate.setAttribute('data-condense-location', cityInput.value);
        views.widgetBox.appendChild(newTemplate);

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

    function _insertLocationWidget() {
        views.widgetBox.innerHTML = '';

        message.show('Loading...');
        _disableButtons();

        cityInput.value = '';

        var newTemplate = baseTemplate.cloneNode(true),
            newWidget = new Condense();

        newTemplate.id = 'location-widget';
        views.widgetBox.appendChild(newTemplate);

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

    cityBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _insertCityWidget();
    }, false);

    locationBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _insertLocationWidget();
    }, false);

    w.onkeydown = function (e) {
        if (e.keyCode === 13) {
            _insertCityWidget();
        }
    };

})(window, document);