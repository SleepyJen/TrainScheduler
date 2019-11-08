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
    var convertedHours, convertedMinutes;

    $('.btn').on('click', function (e) {
        e.preventDefault();
        name = $('#name').val();
        destination = $('#destination').val();
        time = $('#time').val();
        frequency = $('#frequency').val();

        if (name != null && destination != null && time != null && frequency != null) {
            let hours = parseInt(time.substring(0, 2));
            let minutes = parseInt(time.substring(3, 5));
            pushIt(hours, minutes);
        } else {
            alert("Invalid Inputs");
        }

    });

    function pushIt(hours, minutes) {
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
            if (hours.toString().length < 2) {
                convertedHours = "0" + hours.toString();
            }
        } else {
            convertedHours = hours.toString();
        }

        if (minutes < 0) {
            if (minutes.toString().length < 2) {
                convertedMinutes = "0" + minutes.toString();
            }

        } else {
            convertedMinutes = minutes.toString();
        }

        let convertedTime = convertedHours + ":" + convertedMinutes;

        db.ref(name + destination).set({
            name: name,
            dest: destination,
            time: convertedTime,
            freq: frequency
        }).catch(err => {
            alert(err);
        });

        $('#name').val('');
        $('#destination').val('');
        $('#time').val('');
        $('#frequency').val('');
    }

    db.ref().on('child_added', snap => {
        console.log(snap.val());
        let train = $('<div>').attr('class', 'trains');
        let row = $('<div>').attr('class', 'row');
        let n = $('<div>').attr('class', 'inline col-sm-2');
        let d = $('<div>').attr('class', 'inline col-sm-2');
        let t = $('<div>').attr('class', 'inline col-sm-2');
        let f = $('<div>').attr('class', 'inline col-sm-2');
        let mins = $('<div>').attr('class', 'inline col-sm-2');
        let line = $('<hr>').attr('class', 'line');

        let trainTime = moment(snap.val().time, "hh:mm").subtract(1, 'days');
        let timeNow = moment();

        let diff = timeNow.diff(trainTime, 'minutes');
        let remainingMin = diff % snap.val().freq;
        let minAway = snap.val().freq - remainingMin;

        let nextTrain = timeNow.add(minAway, 'minutes');
        nextTrain = moment(nextTrain).format("hh:mm");
        console.log(nextTrain);

        const info = snap.val();

        n.text(info.name);
        d.text(info.dest);
        f.text(info.freq);
        t.text(nextTrain);
        mins.text(minAway);

        row.append(n);
        row.append(d);
        row.append(f);
        row.append(t);
        row.append(mins);

        train.append(row);
        $('#box').append(line);
        $('#box').append(train);
    });

});
