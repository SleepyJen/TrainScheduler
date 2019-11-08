$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyDTlyieE7mHSaS-DIFHWEOuETJq35Tyu-s",
        authDomain: "trainscheduler-f0ba4.firebaseapp.com",
        databaseURL: "https://trainscheduler-f0ba4.firebaseio.com",
        projectId: "trainscheduler-f0ba4",
        storageBucket: "trainscheduler-f0ba4.appspot.com",
        messagingSenderId: "721700363398",
        appId: "1:721700363398:web:c915a7bbd6da5dcb224507"
    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.database();
    var destination, time, frequency, name;

    $('.btn').on('click', function (e) {
        e.preventDefault();
        name = $('#name').val();
        destination = $('#destination').val();
        time = $('#time').val();
        frequency = $('#frequency').val();
        let hours = parseInt(time.substring(0, 2));
        let minutes = parseInt(time.substring(3, 5));
        let convertedHours, convertedMinutes;

        let done = false;

        while (!done) {
            if (minutes < 0 || hours < 0) {
                if (minues < 0) {
                    minutes *= -1;
                }
                if (hours < 0) {
                    hours *= -1;
                }
            }
            if (minutes > 59) {
                hours++;
                minutes -= 59;
            }
            if (hours > 23) {
                hours = hours % 23;
            }
            if (minutes < 60 && hours < 24) {
                done = true;
            }
        }
        if (hours < 10) {
            if (hours.toString().length < 1) {
                convertedHours = "0" + hours.toString();
            }
        } else {
            convertedHours = hours.toString();
        }

        if (minutes < 0) {
            if (minutes.toString().lengtj) {
                convertedMinutes = "0" + minutes.toString();
            }

        } else {
            convertedMinutes = minutes.toString();
        }

        let convertedTime = convertedHours + ":" + convertedMinutes;
        console.log(convertedTime);


        // db.ref(name).push({
        //     name: name,
        //     dest: destination,
        //     time: time,
        //     freq: frequency
        // });
    });

    db.ref().on('child_added', snap => {

    });

});
