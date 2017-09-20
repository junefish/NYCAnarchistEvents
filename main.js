(function () { // begin Immediately-Invoked Function Expression
    $(document).ready(function() {
        const sources = [{
            googleCalendarId: '5irab2ggffkj3l451b5qae9l1s@group.calendar.google.com',
            className: 'anarchist-events',
            title: "Featured Events",
            defaultShow: true,
        }, {
            googleCalendarId: 'glj5531i5vt6aq3i07vlqo09e1qrbkst@import.calendar.google.com',
            className: 'the-base',
            title: 'The Base',
            defaultShow: true,
        }, {
            googleCalendarId: '49d38ogbtcddujpt2u5gm39n9td1bv3p@import.calendar.google.com',
            className: 'bluestockings',
            title: 'Bluestockings',
            defaultShow: false
        }
        ];
        var initialized = false;

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,listWeek'
            },
            height: 'auto',
            defaultView: 'listWeek',
            defaultDate: new Date().toJSON().slice(0,10),
            navLinks: true, // can click day/week names to navigate views
            displayEventTime: true, // don't show the time column in list view
            // THIS KEY WON'T WORK IN PRODUCTION!!!
            // To make your own Google API key, follow the directions here:
            // http://fullcalendar.io/docs/google_calendar/
            googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',

            eventSources: sources,

            eventClick: function(event) {
                // opens events in a popup window
                window.open(event.url, 'gcalevent', 'width=700,height=600');
                return false;
            },

            rerenderView: function() {
                if (initialized) {
                    sources.forEach(function(e){
                        if ($("." + e.className +"-button.disabled-button").length) {
                        $("." + e.className).hide();
                    };
                })}
            },

            viewRender: function() {
                $('.fc-list-view .fc-scroller').css('height', 'auto');
            },

            loading: function(bool) {
                $('#loading').toggle(bool);
                if (!bool && !initialized) {
                    sources.forEach(function(e) {
                        var button = document.createElement('input');
                        var buttonClass = e.className + "-button";
                        var disableButtons = function() {
                            $("." + e.className).toggle();
                            $("." + buttonClass).toggleClass('disabled-button');
                        };
                        button.type = 'button';
                        button.value = e.title;
                        button.classList.add(buttonClass);
                        $("#toggles").append(button);

                        button.addEventListener('click', disableButtons, false);

                        if (!e.defaultShow) {
                            disableButtons();
                        };
                    });
                    initialized = true;
                };
            }
        });
    });
})(); // end IIFE
