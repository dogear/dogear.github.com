//
// DogEar
// dogear_api.js
//

var dogear = {
    server_url : "http://ec2-204-236-251-180.compute-1.amazonaws.com:443/"
}

dogear.make_basic_auth = function(user, pass) {
  var token = user + ':' + pass;
  var hash = Base64.encode(token);
  return "Basic " + hash;
}

dogear.auth = null;

//
// dogear.get_req
//
//     path - relative GET path on server (e.g. api/0.2/get)
//     callback - function called with result of request (or null on failure)
//
dogear.get_req = function(path, callback) {
    var get_req = new XMLHttpRequest();
    get_req.open(
            "GET",
            dogear.server_url + path,
            false);
    get_req.onload = function () {
        if (get_req != null && get_req.status == 200) {
            var response = eval("(" + get_req.responseText + ")");
            callback(response);
        }
        else {
            callback(null);
        }
    };
    get_req.onreadystatechange = function() {
            if (get_req.readyState == 4 && get_req.status == 200) {
                    // TODO
            }
    };
    
    get_req.send(null);
}

//
// dogear.post_req
//
//     path - relative POST path on server (e.g. api/0.2/add)
//     data - array of key/value pairs to send
//     callback - function called with result of request (or null on failure)
//
dogear.post_req = function(path, data, callback) {
    var post_req = new XMLHttpRequest();
    post_req.open(
            "POST",
            dogear.server_url + path,
            true);
    post_req.onload = function () {
        if (post_req != null && post_req.status == 200) {
            var response = eval("(" + post_req.responseText + ")");
            callback(response);
        }
        else {
            callback(null);
        }
    };
    post_req.onreadystatechange = function() {
            if (post_req.readyState == 4 && post_req.status == 200) {
                    // TODO
            }
    };
    
    post_req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    var data_string = '';
    data.forEach(function (data_element) {
        if (data_string != '') {
            data_string += '&'
        }
        data_string += data_element.key + '=' + data_element.value;
    });
    post_req.send(data_string);
};

dogear.get_bookmark = function(username, guid, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    data.push({
        key : 'guid',
        value : guid
    });
    
    dogear.post_req('api/0.2/bookmark', data, function(response) {
        if (response != null && response.action == 'bookmark') {
            callback(response.data);
        }
        else {
            callback(null);
        }
    });
};

dogear.get_bookmarks = function(username, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    dogear.post_req('api/0.2/get', data, function(response) {
        if (response != null && response.action == 'get') {
            callback(response.data);
        }
        else {
            callback(null);
        }
    });
};

dogear.get_bookmarks_with_parent = function(username, parent, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    data.push({
        key : 'parent',
        value : parent
    });
    
    dogear.post_req('api/0.2/get', data, function(response) {
        if (response != null && response.action == 'get') {
            callback(response.data);
        }
        else {
            callback(null);
        }
    });
};

dogear.add_bookmark = function(username, bookmark, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    data.push({
        key : 'title',
        value : bookmark.title
    });
    
    data.push({
        key : 'url',
        value : bookmark.url
    });
    
    data.push({
        key : 'parent',
        value : bookmark.parent
    });
    
    data.push({
        key : 'children',
        value : bookmark.children
    });
    
    dogear.post_req('api/0.2/add', data, function(response) {
        if (response != null && response.action == 'add') {
            callback(response.data);
        }
        else {
            callback(null);
        }
    });
};

dogear.update_bookmark = function(username, bookmark, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    data.push({
        key : 'guid',
        value : bookmark.guid
    });
    
    data.push({
        key : 'title',
        value : bookmark.title
    });
    
    data.push({
        key : 'url',
        value : bookmark.url
    });
    
    data.push({
        key : 'parent',
        value : bookmark.parent
    });
    
    data.push({
        key : 'children',
        value : bookmark.children
    });
    
    dogear.post_req('api/0.2/update', data, function(response) {
        if (response != null && response.action == 'update') {
            callback(response.data);
        }
        else {
            callback(null);
        }
    });
};

dogear.remove_bookmark = function(username, guid, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    data.push({
        key : 'guid',
        value : guid
    });
    
    dogear.post_req('api/0.2/remove', data, function(response) {
        if (response != null && response.action == 'remove') {
            callback(response.data);
        }
        else {
            callback(null);
        }
    });
};

dogear.create_account = function(username, password, callback) {
    var data = new Array();
    
    data.push({
        key : 'username',
        value : username
    });
    
    data.push({
        key : 'password',
        value : password
    });
    
    dogear.post_req('api/0.2/create', data, function(response) {
        if (response != null && response.action == 'create') {
            callback(true);
        }
        else {
            callback(false);
        }
    });
};

dogear.let_me_know = function(email, callback) {
    var data = new Array();
    
    data.push({
        key : 'email',
        value : email
    });
    
    dogear.post_req('api/0.2/letmeknow', data, function(response) {
        if (response != null && response.action == 'email') {
            callback(true);
        }
        else {
            callback(false);
        }
    });
};
