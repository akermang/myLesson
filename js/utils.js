function formatDate(timestamp) {
    var date = new Date(timestamp);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
}

