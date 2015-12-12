/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




///////////////////////////////////////////////////////////////
//////      from here JS that belongs to new_object       /////
///////////////////////////////////////////////////////////////

//a list to hold all obkecs (global)
var items = [];


    //when readAll btn clicked - alt tag populate with json
    var readBtn = document.getElementById('readBtn');
    if(readBtn == 0){
        console.log('do nothing'); 
    } else if (readBtn) {
        readBtn.addEventListener('click', function() {
            var currentOBJ = {};
            currentOBJ.name = document.getElementById('name').value;
            currentOBJ.size = document.getElementById('size').value;
            currentOBJ.shape = document.getElementById('shape').value;
            currentOBJ.color = document.getElementById('color').value;
            currentOBJ.position = document.getElementById('position').value;
            currentOBJ.notes = document.getElementById('notes').value;
            currentJSON = JSON.stringify(currentOBJ).replace(/{|}|,/g,' '); //convert js-obj string
            openReadInfo(currentJSON);
            console.log(currentJSON);        
        }, false);

    };


//fuction below:
//shows summery of choices
//gives it focus to voiceOver will read it
function openReadInfo(currentJSON){ //func to show info on button for 3 sec then disapper
    
    var readRow = document.getElementById("readRow");
    var td = document.createElement("td"); //create <td>
    var info = document.createTextNode(currentJSON);
    $(readRow).hide().html(td).fadeIn(500);//insert html tontd
    $(td).html(info); //insert info (JSon) as html
    readRow.setAttribute('tabindex', '0');
    td.setAttribute("colspan", "2"); //occupy 2 <tr>

    document.getElementById('readRow').focus();

}

//below function:
//make an OBJ by choices selected,
//add the OBJ to "items" list,
//go to grid page (where u can see the OBJ)
var addNewObj = function(){ 
    
    var currentOBJ = {};
    currentOBJ.name = document.getElementById('name').value;
    currentOBJ.size = document.getElementById('size').value;
    currentOBJ.shape = document.getElementById('shape').value;
    currentOBJ.color = document.getElementById('color').value;
    currentOBJ.position = document.getElementById('position').value;
    currentOBJ.notes = document.getElementById('notes').value;
    
    currentJSON = JSON.stringify(currentOBJ); //convert js-obj to json
    console.log(currentJSON);

    items.push(currentJSON);
    console.log(items);
}

//below function not complete:
//needs to send back to grid page with no addition
var cancelNew = function(){
    
    console.log("send back to grid page");
}

///////////////////////////////////////////////////////////////
//////      until here JS that belongs to new_object      /////
///////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////
//////      from here JS that belongs to menu             /////
///////////////////////////////////////////////////////////////

//startuing with hiding the grid main page
$(document).ready(function(){
     $("#main_page").hide();
});


//a function that replaces menu >> main_page
var backToGrid = function(){
    $("#menuPage").hide(); //hide menu
    $("#main_page").show(); //show main page
}






