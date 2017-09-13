function formatDate(timestamp) {
    var date = new Date(timestamp);
    return `${date.getDay()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
}