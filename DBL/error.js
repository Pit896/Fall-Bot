module.exports = (dbl) => {
    dbl.on('error', e => {
        console.log(`Ooops:\n\n${e}`);
    });
}