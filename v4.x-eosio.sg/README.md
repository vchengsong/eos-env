


cp -r ~/eosio/* /usr/local/bin
mkdir /data/eos-data && mkdir /data/eos-config && mkdir /data/eos-wallet

nohup nodeos -d /data/eos-data --config-dir /data/eos-config --plugin eosio::chain_api_plugin \
 --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &

tail -f /data/eosio.log

cleos wallet create
"PW5KTzHuKzEh1rE3eJQJ9CQczwVWn5jPZ583GrGy4Dsn8eMG1Mw27"

cleos wallet import 5KQhuVV1CKQ5gRzfuTcKShJAfpbuXVTeJ1EuYFUu8nhN8Whh7ru

cleos -u http://13.251.3.82 system regproducer eos.store EOS7etACj3TMiaDRChbDBZTZiGujW8rPQFMNUwWHZ6vmDU3K2GXrY "https://www.eos.store"

cleos -u http://13.251.3.82 system delegatebw --transfer eos.store eos.store "99 EOS" "1 EOS"

eos.store
Private key: 5KQhuVV1CKQ5gRzfuTcKShJAfpbuXVTeJ1EuYFUu8nhN8Whh7ru
Public key: EOS7etACj3TMiaDRChbDBZTZiGujW8rPQFMNUwWHZ6vmDU3K2GXrY



http://www.eosio.sg/ 注册信息
vchengsong
pubkey:EOS697jkKZTX1hntvjZqRnrA8EC6rUXyMBg4EHUArjvRHF6ph1erj
prikey:5KE1ZhGzsdoXDMHZEU9eqxqPvDDAhqvJXrG6LP2tqAwTNgKpjZH

cleos -u http://13.251.3.82 system delegatebw --transfer vchengsong vchengsong "99 EOS" "1 EOS"

cleos -u http://13.251.3.82 system voteproducer prods vchengsong eos.store

cleos -u http://13.251.3.82 create account 


###  ====  自动投票脚本 ==== 
```bash
#Step 1: 


curl -X POST http://13.251.3.82:8080/account -d '{"name":"ytrusu","public_key":"EOS8AiPgMePG6XtUFt7aYfnRCHnSn7Y6NH8KoRffT7wkrkbjdRSaq","private_key":"5JEMZeHPKWj1FgiYESPkjqY5jf1KxKM56oFkjbog8AXJTvewuJG"}'


cleos -u http://13.251.3.82 system delegatebw --transfer ytrusu ytrusu "99 EOS" "1 EOS"


```



















