module.exports = (dbl) => {
    dbl.on('posted', () => {
        console.log("Server count posted!");
    });
}