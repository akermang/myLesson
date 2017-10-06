var transport = {
    request: function(url, options) {        
        fetch(url, options).then(function(data) {
            return data.json();
        }).then(function(response) {
            console.log(response);
        });
    }
}

//MOCK
//=================================================
var data = {username: 'username', password:'password'};
var options = {
    method: 'POST',
    body: JSON.stringify(data)
}
transport.request(
    'https://leadz.herokuapp.com/api/lead/', 
    options
);
//=================================================