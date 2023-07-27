try {
    require('./app.js');
} catch (e) {
    console.log(JSON.stringify({ level: 'error', message: `${e.message}` }));
    process.exit(1);
}
