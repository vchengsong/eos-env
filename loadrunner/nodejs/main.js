

Eos = require('eosjs'); // Eos = require('./src')

// Optional configuration..
config = {
    keyProvider: ['5Kc4kYKiDMHdamai8QHcZ7jTUN5JvbLQJMZTSGtsEPXrZRqypnM','5KZeRRaMw5QpWvwSpRxCK1ib3UyqZaQ6mDLdmJRZMvuQk72P6KJ'], // WIF string or array of keys..
    httpEndpoint: 'http://127.0.0.1:8888',
    mockTransactions: () => 'null', // or 'pass|fail|null'
    transactionHeaders: (expireInSeconds, callback) => {
    callback(null/*error*/, headers)
},
expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true
};

eos = Eos.Localnet(config);

eos.getBlock(1).then(result => {console.log(result)});
// eos.getInfo({}).then(result => {console.log(result)});

// options = {
//     broadcast: true,
//     sign: true,
//     authorization: "user1@active"
// };

eos.transfer('user1', 'user2', '1 EOS', '',true);


