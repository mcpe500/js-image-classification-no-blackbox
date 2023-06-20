const utils = {}

utils.flaggedUsers = [];

utils.styles = {
    car: { color: "gray", text: "🚗" },
    fish: { color: "red", text: "🐟" },
    house: { color: "yellow", text: "🏠" },
    tree: { color: "green", text: "🌳" },
    bicycle: { color: "cyan", text: "🚲" },
    guitar: { color: "blue", text: "🎸" },
    pencil: { color: "magenta", text: "✏️" },
    clock: { color: "lightgray", text: "⏰" },
};


utils.formatPercent = (percent) => {
    return (percent * 100).toFixed(2) + "%";
}

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(count / max);
    process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (arr, key) => {
    const groups = {};
    for (let obj of arr) {
        const value = obj[key];
        if (!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(obj);
    }
    return groups;
}

if (typeof module !== 'undefined') {
    module.exports = utils;
}


