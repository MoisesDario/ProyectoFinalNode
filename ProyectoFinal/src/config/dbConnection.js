const postgres =  require('postgres');

module.exports = () => {
    return postgres.createConnection({
        host: 'database.cb4ss7egmzko.us-east-2.rds.amazonaws.com',
        user: 'postgres',
        password: 'Moises_980612',
        database: 'database'
    });
}