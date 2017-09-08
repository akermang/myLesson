function getLessons(){
    var key = "lessons_data";
    var storedLessons = getItem(key);
    return storeIfNull(storedLessons, lessonsMockData, key);
};

function getStudends(){
    var key = "students_data";
    var storedStudents = getItem(key);
    return storeIfNull(storedStudents, studentsMockData, key);
};

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function storeInDb(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
}

function storeIfNull(storedData, mockData, key) {
    if(!storedData){
        storeInDb(mockData, key);
        return mockData;
    }
    return storedData;
}
