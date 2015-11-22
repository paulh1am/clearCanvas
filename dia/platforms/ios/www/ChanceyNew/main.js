// var socket = io.connect('http://45.55.187.180:80/');
//var socket = io.connect('http://localhost:8080');
var socket = io.connect('http://45.55.201.170:80/');
var circx = 0;
var squarx = 0;
var tableCounter = 0;
var idArray = new Array();
var globalFocus = null;
var table;
var currentClass;
var audio = new Audio('bell.wav');
var synth = new Tone.DuoSynth;
var filter = new Tone.Filter(1000, "lowpass");
var freeverb = new Tone.Freeverb();
var synth2 = new Tone.NoiseSynth;
var synth2 = new Tone.PluckSynth;
var filter2 = new Tone.Filter(100, "lowpass");
var freeverb2 = new Tone.Freeverb();
var nameLabel;
var guestLabel;
var diagramName;
var currentDia;
var filesG;




$(document).ready(function() {

    socket.on('connect', function() {
    console.log("Connected OUCH!");


    });

   // adding a saved diagram
    
   socket.on("diaTime", function(dia){

    // dia.currentDia
    console.log("diaTime: " + dia);
    console.log("current: " + dia.currentDia);

    
    d = document.getElementById("mainDiagram");
    console.log("inner!!!: " + d.innerHTML);
    d.innerHTML= "";
    console.log("inner2: " + d.innerHTML);
    $(dia.currentDia).appendTo("#mainDiagram");
    openDiagram();

   });

    // file list

    socket.on("savedFiles", function(files){
    console.log(files);
    console.log(files[0]);
    filesG=files;
    console.log("filesG"+ filesG[0]);
    
    for (i=0; i<files.length; i++) {
        
        if (files[i]==".DS_Store")  {
                console.log("do nothing!!");
        }  else {
                $("<li><button id="+files[i]+ " onclick='openSaved(event);'>" +files[i]+ "</button></li>").appendTo("#listofSaved");
                }
    }
    });



    console.log("socket :" + socket);


    //initiate touch

    doub();

    var elem = document.getElementById("boverlay");
    elem.style.display = "none";
    var elem = document.getElementById("overlay");
    elem.style.display = "none";
    var elem2 = document.getElementById("overlay2");
    elem2.style.display = "none";
    var elem3 = document.getElementById("overlay3");
    elem3.style.display = "none";


});



////////////////////////////////////////////toneStuff///////////////////////////////////////////////////////


$(document).ready(function() {
 


    synth.volume.value = -22;
    //connect the synth to the master output channel
    synth.setPreset("DistGit");
    synth.connect(filter);
    filter.connect(freeverb);
    freeverb.toMaster();

    synth2.volume.value = 0;
    //connect the synth to the master output channel
    synth2.setPreset("Koto");
    synth2.connect(filter);
    filter2.connect(freeverb);
    freeverb2.toMaster();

    //create a callback which is invoked every quarter note
    Tone.Transport.setInterval(function(time) {
            //trigger middle C for the duration of an 8th note
            synth.triggerAttack("F4");
        }, "14n"


    );
    //////////////////////////////////////////////////////////////CSSbully/////////////////////////////////
    // $('#save').parent().addClass("whateva");
    // $('#boverlay').parent().addClass("whateva2");
    // $('#overlay2').parent().addClass("whateva2");
    // $('#tableName').parent().addClass("whateva2");
    // $('#guestName').parent().addClass("whateva2");
});


function hide() {
    
    var elem = document.getElementById("boverlay");
    elem.style.display = "none";
    var elem1 = document.getElementById("overlay");
    elem1.style.display = "none";
    elem1.style.backgroundColor="white";
    var elem2 = document.getElementById("overlay3");
    elem2.style.display = "none";
    var elem3 = document.getElementById("overlay2");
    elem3.style.display = "none";


}



// function hide2() {
//     var elem = document.getElementById("overlay2");
//     elem.style.display = "none";
// }


function show() {
    var elem2 = document.getElementById("overlay");
    elem2.style.display = "block";
    elem2.setAttribute("role", "alert");
    elem2.style.backgroundColor=" #FFC924";
    var elem3 = document.getElementById("boverlay");
    elem3.style.display = "block";
    elem2.setAttribute("role", "alert");
}


function show2() {
    

    var elem3 = document.getElementById("overlay2");
    elem3.style.display = "block";

    elem3.setAttribute("role", "alert");

}


///////////////////////////////////////////////////////save4Server////////////////////////////////////////////

function openSaved(event) {
    console.log("opensaved!");
    var datatosend2=event.target.id
    console.log("datatosend2: "+ datatosend2); 
    sendFileName(datatosend2);
    hide();
    
}


function sendFileName (datatosend2) {
    socket.emit('retrieveData', datatosend2);
    console.log("datatosend2 in SFN", datatosend2);
    

};


function openDName() {
    var elem = document.getElementById("overlay3");
    elem.style.display = "block";
    elem.setAttribute("role", "alert");
}

function hideDName() {
    var elem = document.getElementById("overlay3");
    elem.style.display = "none";
    elem.setAttribute("role", "");
}

function sendData(datatosend) {
    socket.emit('sendMessage', datatosend);
    console.log("datatosend", datatosend);
};




function saveD() { ///////////////////////////////////WHERE I AM ADDING TO DIAGRAM
    diagramName = document.getElementById("diagName").value;
    diagramName = diagramName.replace(/ /g,"_");
    console.log("diagramName ", diagramName);
    var outputHtml = $("#mainDiagram").html();
    console.log("OUTPUT: ",outputHtml);

    var datatosend = {
        diagramName: diagramName,
        currentDia: outputHtml
    };
    console.log("preSend");
    sendData(datatosend);
    console.log("postSend");

    clear();
    hideDName();
}


function save() {
    alert("saved!");
    hide();
    var elem = document.getElementById(globalFocus);
    var x = document.getElementById("tableName").value;
    var y = document.getElementById("guestName").value;
    
    nameLabel= x;
    guestLabel= y;
    
    var table = new Table();
    clear();
    
    elem.setAttribute("title", x);
    elem.setAttribute("alt", y);
    clear();
}


///////////////////////////////////////////////////////houseKeeping////////////////////////////////////////////

function clear() {
    //var elem=document.getElementById(globalFocus);
    var x = document.getElementById("tableName");
    x.value = '';
    var y = document.getElementById("guestName");
    y.value = '';
    var y = document.getElementById("diagName");
    y.value = '';
}



///////////////////////////////////////////////////////sHAPES////////////////////////////////////////////
function openDiagram() {
    var mainDiagramChildren = $("#mainDiagram").children();
    console.log("mainDiagramChildren!!!!!!", mainDiagramChildren);
    for( var i = 0; i < mainDiagramChildren.size(); i++ ) {
        var newTable = new Table(mainDiagramChildren[i]);
        console.log("newTable!!!!", newTable);

    }
}

function Table(elem) {
    console.log("in table constructor");
  
  if ( elem == null ) {
    
    console.log(currentClass);
    var elem = document.getElementById("overlay");
    // var labe = document.getElementById("overlay");
    elem.style.display = "inline";
    
    globalFocus = this.id;
    // console.log("GFE" + this.labe);
    
    // CLASS SPECIFIC INITIALIZATION
    this.class = currentClass;
    this.id = "table" + tableCounter++;
    // this.labe =$("");
    this.elem = $("<div  alt='Table Object' id='" + this.id + "' class='" + this.class + "'>drag me!<p id='" + this.id + "' class='" + this.class + " shapeText'> <b>Table: </b>"+ nameLabel +"<br><b>Guests:</b> </br>"+guestLabel+"</p></div>");
    // this.labe =$("<p id='" + this.id + "' class='" + this.class + " shapeText'><b>Table: </b>"+ nameLabel +"<br><b>Guests:</b> </br>"+guestLabel+"</p>");
    // this.elem = $("<div  alt='Table Object' id='" + this.id + "' class='" + this.class + "'><p id='dragText'>Drag me!</p></div>");
    $(this.elem).bind("touchstart", this.start.bind(this));
    $(this.elem).bind("touchmove", this.moveMe.bind(this));
    $(this.elem).bind("touchend", this.endCheck.bind(this));
    // $(this.labe).bind("touchstart", this.start.bind(this));
    // $(this.labe).bind("touchmove", this.moveMe.bind(this));
    // $(this.labe).bind("touchend", this.endCheck.bind(this));


    
    // ADDED TO CHECK COLLISIONS
    idArray.push(this.id);

    // IF NOTHING EXISTS YET
    

    $("#mainDiagram").append(this.elem);
    // $("#mainDiagram").append(this.labe);
  }
  else {
    console.log("creating from elements", $(elem));
    this.class = $(elem).attr("class");
    this.id = $(elem).attr("id");
    this.elem = $(elem);
    // this.labe = $(labe);
    this.name = name;
    idArray.push(this.id);
    tableCounter++;
    $(this.elem).bind("touchstart", this.start.bind(this));
    $(this.elem).bind("touchmove", this.moveMe.bind(this));
    $(this.elem).bind("touchend", this.endCheck.bind(this));
    // $(this.labe).bind("touchstart", this.start.bind(this));
    // $(this.labe).bind("touchmove", this.moveMe.bind(this));
    // $(this.labe).bind("touchend", this.endCheck.bind(this));
    this.endCheck();
  }
}



//drag start
Table.prototype.start = function(e) {
    Tone.Transport.start();
    //synth.triggerAttack('F4');
    console.log("I'm in start");

    var orig = e.originalEvent;
    var pos = $(this.elem).position();
    // var pos2 = $(this.labe).position();
    this.elem.offset = {
        x: orig.changedTouches[0].pageX - pos.left,
        y: orig.changedTouches[0].pageY - pos.top
    };


    // this.labe.offset = {
    //     x: orig.changedTouches[0].pageX - pos2.left,
    //     y: orig.changedTouches[0].pageY - pos2.top
    // };

};

//update css

Table.prototype.moveMe = function(e) {
    console.log("CURRENTclass " + currentClass);
    e.preventDefault();
    var orig = e.originalEvent;
    $(this.elem).css({
        top: orig.changedTouches[0].pageY - this.elem.offset.y,
        left: orig.changedTouches[0].pageX - this.elem.offset.x
    });

    // $(this.labe).css({
    //     top: orig.changedTouches[0].pageY - this.labe.offset.y,
    //     left: orig.changedTouches[0].pageX - this.labe.offset.x
    // });


};


//check for collision
Table.prototype.endCheck = function(e) {
    synth.triggerRelease();
    Tone.Transport.stop();
    console.log("I'm in end!");
    console.log($("#" + idArray[i]));
    var localId = this.id;
    for (var i = 0; i < idArray.length; i++) {
        if (localId != idArray[i]) {
            collision($(this.elem), $("#" + idArray[i]));

        }
    };
};


function collision(object1, object2) {
    var x1 = object1.offset().left;
    var y1 = object1.offset().top;
    var h1 = object1.outerHeight(true);
    var w1 = object1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = object2.offset().left;
    var y2 = object2.offset().top;
    var h2 = object2.outerHeight(true);
    var w2 = object2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        console.log("did not collide");
        synth2.triggerRelease();
    } else if (b1 >= y2 || y1 <= b2 || r1 >= x2 || x1 <= r2) {
        console.log("collided!");
        //alert("your table has collided with another!")
        audio.play();
        synth2.triggerAttack('C4');
        synth.triggerAttack('C4');
        console.log("haaay")
    } else {
        console.log("other");
        audio.play();
        synth2.triggerRelease();
    }
}

function doub() {
    $(".base0").on("tap", function() {
        currentClass = "square";
        //alert(Table.getInfo());
        //alert("name your table");
        //console.log(squarx);
        var square = "square " + squarx;
        show();
        // ondouble();
    });

    $(".base1").on("tap", function() {
        currentClass = "circle";
        // var table = new Table();
        //alert(Table.getInfo());
        //alert("name your table");
        //console.log(squarx);
        var circle = "circle " + circx;
        show();
    });
}
// console.log(collision($('#circle'), $('#square')));