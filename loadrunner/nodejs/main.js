Eos = require('eosjs');

eos = Eos.Localnet({keyProvider: ['5Kc4kYKiDMHdamai8QHcZ7jTUN5JvbLQJMZTSGtsEPXrZRqypnM',
    '5KZeRRaMw5QpWvwSpRxCK1ib3UyqZaQ6mDLdmJRZMvuQk72P6KJ',
    '5JiUe8J3mVxut5djhCFtysVUFhUV1LJcDzPjB16j3D48AXfbz2D',
    '5JjAmWyrb1TVLkAm8d4h6kqr1BiE1YCHsgDXvLyFQZbyq3i2kd8']});

us=['user1','user2','user3','user4'];
us = shuffle(us);

let c_call = 1;
let c_ret = 1;

function transfer(from,to,amount) {
    console.log(c_call++,'--');
    eos.transaction('eosio.token', token => {
        console.log(c_ret++);
        token.transfer(us[from], us[to], amount+' EOS', '');
    });
}

function loop() {
    transfer(0, 1, Math.random().toFixed(4));
    transfer(1, 2, Math.random().toFixed(4));
    transfer(2, 3, Math.random().toFixed(4));
    transfer(3, 0, Math.random().toFixed(4));
}


let interval_big = 5000;
let times = 5;
let interval = interval_big / times;

function once() {
    for (let i = 0; i < times; i++)
    {
        setTimeout(loop, i * interval);
    }
}

setInterval(once, interval_big);










function shuffle(array) {
    let tmp, current, top =array.length;
    if(top) while(--top){
        current =Math.floor(Math.random() * (top + 1));
        tmp =array[current];
        array[current] =array[top];
        array[top] = tmp;
    }
    return array;
}