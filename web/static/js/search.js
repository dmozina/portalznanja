//Video containers. Videos contains all videos, featured contains only featured videos (since it is a different
//web service call). These 2 arrays do not change.
//Current array is the one that is displayed on the search page. Only current array gets manipulated and
//upon a new search criteria the current videos are displayed.
var videos = [];
var featured = [];
var current = [];

//Video class.
function Video( id, title, image, language, category ){
    this.id = id;
    this.title = title;
    this.image = image;
    this.language = language;
    this.category = category;
}

/**
 * Populates the search HTML page. Each time a new search criteria is given this function retrieves the data
 * from the current array and puts the videos into a list for convenient display.
 */
function populateHtml () {
    var ul = document.getElementById("vidUl");
    ul.innerHTML = '';
    //Add videos to the HTML page...
    for (var i = 0; i < current.length; i++) {
        var newLi = document.createElement("li");
        newLi.className += " vid";
        ul.appendChild(newLi);

        var ti = document.createElement("a");
        var im = document.createElement("a");
        newLi.appendChild(ti);
        newLi.appendChild(im);

        var p = document.createElement("p");
        var img = document.createElement("img");
        ti.appendChild(p);
        im.appendChild(img);

        ti['href'] = "/video/?vId=" + current[i].id;
        im['href'] = "/video/?vId=" + current[i].id;

        p.innerHTML = "" + current[i].title;
        img.className += " vidImage";
        img["src"] = "static/images/" + current[i].image;
    }
}

/**
 * This function is called when the user visits the /search page for the first time. Both /video and /featured
 * web services are called to retrieve the data.
 * This allows us to have search completely client side instead of server side!
 */
function getAllVideos() {
    $.ajax({
        type: 'GET',
        url: '/api/v1/video/?format=json',
        dataType:'json',
        success: function (data) {
            $.each(data, function(i, j){
                if (i == "objects") {
                    $.each(j, function(k, l){
                        var id, title, image, language, category;
                        $.each(l, function(key, value){
                            if (key == "displayImage") {
                                image = value;
                            } else if (key == "id") {
                                id = value;
                            } else if (key == "title") {
                                title = value;
                            } else if (key == "category") {
                                $.each(value, function(key2, value2){
                                    if (key2 == "id") {
                                        category = value2;
                                    }
                                });
                            } else if (key == "language") {
                                $.each(value, function(key3, value3){
                                    if (key3 == "id") {
                                        language = value3;
                                    }
                                });
                            }
                        });
                        videos.push(new Video(id, title, image, language, category));
                    });
                }
            });
            current = videos;
            populateHtml();
            checkForHash();
        }

    });
    $.ajax({
        type: 'GET',
        url: '/api/v1/featured/?format=json',
        dataType:'json',
        success: function (data2) {
            $.each(data2, function(ii, jj){
                if (ii == "objects") {
                    $.each(jj, function(kk, ll){
                        $.each(ll, function(jaja, nene){
                            if (jaja == "video") {
                                var id2, title2, image2, language2, category2;
                                $.each(nene, function(keyy, valuee){
                                    if (keyy == "displayImage") {
                                        image2 = valuee;
                                    } else if (keyy == "id") {
                                        id2 = valuee;
                                    } else if (keyy == "title") {
                                        title2 = valuee;
                                    } else if (keyy == "category") {
                                        $.each(valuee, function(key2, value2){
                                            if (key2 == "id") {
                                                category2 = value2;
                                            }
                                        });
                                    } else if (keyy == "language") {
                                        $.each(valuee, function(key3, value3){
                                            if (key3 == "id") {
                                                language2 = value3;
                                            }
                                        });
                                    }
                                });
                                featured.push(new Video(id2, title2, image2, language2, category2));
                            }
                        });
                    });
                }
            });
        }
    });
}


/**
 * This method is the hearth of the search functionality. Each click on the radio and/or checkbox buttons
 * results in this function being called.
 * This function evaluates the new search criteria and manipulates the current array accordingly.
 * This function is also extensible for custom search via the search box!!
 *
 * @param param - search parameter. Can be either featured, all (for the 2 radio buttons) or starting with either
 * lan:<id> or cat:<id> respectively to the auto generated checkboxes.
 */
function search(param) {
    if (param == "featured") {
        current = featured.slice(0);
        resetBoxes();
    } else if (param == "all") {
        current = videos.slice(0);
        resetBoxes();
    } else if (param.substring(0, 3) == "lan") {
        var box = document.getElementById(param);
        var list = [];
        if (box.checked) {
            var radio = document.getElementById("All");
            var which = [];
            if (radio.checked) {
                which = videos;
            } else {
                which = featured;
            }
            for (var ii = 0; ii < which.length; ii++) {
                if (which[ii].language == parseInt(param.charAt(4))) {
                    list.push(which[ii]);
                }
            }
            add(current, list);
        } else {
            for (var i = 0; i < current.length; i++) {
                if (current[i].language == parseInt(param.charAt(4))) {
                    list.push(current[i]);
                }
            }
            remove(current, list);
        }
    } else if (param.substring(0, 3) == "cat") {
        var box = document.getElementById(param);
        var list = [];
        if (box.checked) {
            var radio = document.getElementById("All");
            var which = [];
            if (radio.checked) {
                which = videos;
            } else {
                which = featured;
            }
            for (var ii = 0; ii < which.length; ii++) {
                if (which[ii].category == parseInt(param.charAt(4))) {
                    list.push(which[ii]);
                }
            }
            add(current, list);
        } else {
            for (var i = 0; i < current.length; i++) {
                if (current[i].category == parseInt(param.charAt(4))) {
                    list.push(current[i]);
                }
            }
            remove(current, list);
        }
    }
    populateHtml();
}

/**
 * Helper method. Removes all elements from original array (current) that are found in the remove array.
 * @param original
 * @param remove
 */
function remove(original, remove) {
    var items = new Array();

    items = jQuery.grep(original,function (item) {
        return jQuery.inArray(item, remove) < 0;
    });
    current = items;
}

/**
 * Add all element from the remove array to the original/current array
 * @param original
 * @param remove
 */
function add(original, remove) {
    for (var i = 0; i < remove.length; i++) {
        original.push(remove[i]);
    }
}

/**
 * When user clicks on the all and/or featured radio button all normal or featured videos are shown, respectively.
 * It is a must that we reset all checkboxes to the default (checked) state.
 */
function resetBoxes() {
    var nodes = document.getElementsByName("box");
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].checked = true;
    }
}


/**
 * Checks for the initial hash URL value. Current we handle only #featured
 */
function checkForHash() {
    if (location.href.indexOf("?q=featured") >= 0)  {
        document.getElementById("FT").checked = true;
        search("featured");
    }
}


