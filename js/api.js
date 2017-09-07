function getLessons(){
    var storedLessons = localStorage.getItem("lessons_data");
    if(storedLessons == null){
        localStorage.setItem("lessons_data", JSON.stringify(lessonsMockData));
        return lessonsMockData;
    }
    return JSON.parse(storedLessons);
};