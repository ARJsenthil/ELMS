
const Capitalize = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}


module.exports = {
    Capitalize: Capitalize,
};