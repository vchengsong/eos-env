
Eos = require('eosjs');

eos = Eos.Localnet({keyProvider: '5Kc4kYKiDMHdamai8QHcZ7jTUN5JvbLQJMZTSGtsEPXrZRqypnM'});

eos.transaction('eosio.token', token => {
    token.transfer('user1', 'user2', '1 EOS', '')
});


