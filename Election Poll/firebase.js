var GotCongressValue = false;
var GotCPMValue = false;
var GotBJPValue = false;

var BJP = 0;
var CPM = 0;
var Congress = 0;


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbtFHAFQa99BUqXeb8SDLdm199TboZR04",
    authDomain: "kozhikode-election-poll.firebaseapp.com",
    databaseURL: "https://kozhikode-election-poll.firebaseio.com",
    projectId: "kozhikode-election-poll",
    storageBucket: "kozhikode-election-poll.appspot.com",
    messagingSenderId: "784601722403"
};
firebase.initializeApp(config);


//db single view
dbSeenPerson = firebase.database().ref().child('SeenPerson');
dbSeenPerson.on('value', function (SeenPerson) {
    seenPerson = SeenPerson.numChildren();
    console.log("seen:↓");
    console.log(seenPerson);

})


//databse location for view count
dbSeenCount = firebase.database().ref().child('SeenCount');
dbSeenCount.on('value', function (SeenCount) {
    seen = SeenCount.numChildren();
    console.log("page loaded:↓")
    console.log(seen);
})
dbSeenCount.push(new Date().toLocaleString()+" "+navigator.platform)

//databse location for Congress and setting current value to html
dbCongress = firebase.database().ref().child('Congress');
dbCongress.on('value', function (congressVotes) {

    Congress = congressVotes.numChildren()




    GotCongressValue = true;

    processValues()
})

//databse location for CPM and setting current value to html
dbCPM = firebase.database().ref().child('CPM');
dbCPM.on('value', function (cpmVotes) {

    CPM = cpmVotes.numChildren();



    GotCPMValue = true;

    processValues()
})

//databse location for BJP and setting current value to html
dbBJP = firebase.database().ref().child('BJP');
dbBJP.on('value', function (bjpVotes) {

    BJP = bjpVotes.numChildren();




    GotBJPValue = true

    processValues()
})

//percentify
function processValues() {
    if (GotBJPValue == true && GotCongressValue == true && GotCPMValue == true) {
        setBars()
    }
}

function setBars() {

    TotalVotes = BJP + CPM + Congress

    document.getElementById("CongressBar").innerHTML = Math.ceil(Congress / TotalVotes * 100) + "%";
    document.getElementById("BJPBar").innerHTML = Math.ceil(BJP / TotalVotes * 100) + "%";
    document.getElementById("CPMBar").innerHTML = Math.ceil(CPM / TotalVotes * 100) + "%";

    document.getElementById("CongressBar").style.width = Congress / TotalVotes * 100 + "%"
    document.getElementById("CPMBar").style.width = CPM / TotalVotes * 100 + "%"
    document.getElementById("BJPBar").style.width = BJP / TotalVotes * 100 + "%"
}
