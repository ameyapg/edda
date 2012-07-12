// Copyright 2009-2012 10gen, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

render = function(time) {
    // this function renders a single frame, based
    // on the time
    // could be more efficient than wiping everything every time...

    // check that there exists a corresponding frame
    if (frames[time]) {

    // wipe server layer and draw all servers
    canvases["server"].width = canvases["server"].width;
    var first = false;
    var prevx, prevy;
    var count = 0;
    var xvals = [], yvals = [];
    var list, i;

    clear_layers();

    for (var origin_server in frames[time]["links"]) {
        list = frames[time]["links"][origin_server];
        for (i = 0; i < list.length; i++) {
            one_line(servers[origin_server]["x"], servers[origin_server]["y"], servers[list[i]]["x"], servers[list[i]]["y"], contexts["arrow"]);
            console.log("from: ");
            console.log(origin_server);
            console.log("to: ");
            console.log(list[i]);
        }
    }

    for (origin_server in frames[time]["broken_links"]) {
        var list2 = frames[time]["broken_links"][origin_server];
        for (i = 0; i < list2.length; i++) {
            broken_link(servers[origin_server]["x"], servers[origin_server]["y"], servers[list2[i]]["x"], servers[list2[i]]["y"], contexts["arrow"]);
            console.log("_________broken_links_____________");
            console.log("from: ");
            console.log(origin_server);
            console.log("to: ");
            console.log(list[i]);
        }
    }

    for (origin_server in frames[time]["syncs"]) {
        var list3 = frames[time]["syncs"][origin_server];
        for (i = 0; i < list3.length; i++) {
            console.log(servers[origin_server]["x"]);
            //console.log(servers[list3[i]]["x"]);
            console.log("_________syncs_____________");
            console.log("from: ");
            console.log(origin_server);
            console.log("to: ");
            console.log(list[i]);
            one_arrow(servers[origin_server]["x"], servers[origin_server]["y"], servers[list3[i]]["x"], servers[list3[i]]["y"], contexts["arrow"]);
            
        }
    }

    for (var name in frames[time]["servers"]) {
        var state = frames[time]["servers"][name];
    // add logic to parse out ".LOCKED"
    // to capture actual server state
    var n = state.split(".");
    state = n[0];
    console.log(state);
        switch(state) {
	case "STARTUP1":
	    startup1(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
	case "STARTUP2":
	    startup2(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
	case "PRIMARY":
	    primary(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "SECONDARY":
	    secondary(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "ARBITER":
	    arbiter(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "DOWN":
	    down(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "RECOVERING":
	    recovering(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "ROLLBACK":
	    rollback(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "FATAL":
	    fatal(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "UNKNOWN":
	    unknown(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "UNDISCOVERED":
	    undiscovered(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
        case "REMOVED":
	    removed(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
	case "STALE":
	    stale(servers[name]["x"], servers[name]["y"], servers[name]["r"], contexts["server"]);
	    break;
	}

    // add lock, if necessary
    if (n.length == 2) {
        lock(servers[name]["x"], servers[name]["y"], servers[name]["r"]);
    }
        xvals[count] = servers[name]["x"];
        yvals[count] = servers[name]["y"];
        count++;
    }/*
    var xvals2 = xvals, yvals2 = yvals;
    for(var i = 0; i < count; i++) {
        for(var j = 0; j < count; j++) {
            if (xvals[i] != xvals[j])
                one_arrow(xvals[i], yvals[i], xvals2[j], yvals2[j], contexts["arrow"]);
        }
    }*/
    //one_arrow(100, 100, 200, 200, contexts["arrow"]);
    //one_line(120, 100, 220, 200, contexts["link"])

    }
};

clear_layers = function() {
    canvases["arrow"].width = canvases["arrow"].width;
    canvases["server"].width = canvases["server"].width;
};
