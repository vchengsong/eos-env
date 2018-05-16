

### 每个参与节点的环境准备
```bash
# Step 1: 安装程序（首先是远程传输eosio相关软件到本主机~/eosio目录）
cp -r ~/eosio/* /usr/local/bin
mkdir -p /data/eos-data && mkdir /data/eos-config && mkdir /data/eos-wallet
```

### BPC节点
```bash

# Step 1: 在eosio.sg注册用户eos.store并获得秘钥对，获得一定的余额
eos.store
Private key: 5KQhuVV1CKQ5gRzfuTcKShJAfpbuXVTeJ1EuYFUu8nhN8Whh7ru
Public key: EOS7etACj3TMiaDRChbDBZTZiGujW8rPQFMNUwWHZ6vmDU3K2GXrY

# Step 2: 安装配置文件config.ini并跟新参数、安装genesis.json
配置文件存放目录为 /data/eos-config
config.ini里需要更新的参数包括：private-key producer-name agent-name p2p-peer-address

# Step 3: 启动eosio
nohup nodeos -d /data/eos-data --config-dir /data/eos-config --plugin eosio::chain_api_plugin \
 --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &

tail -f /data/eosio.log

# Step 4: 为eos.store注册生产者
cleos wallet create
"PW5KTzHuKzEh1rE3eJQJ9CQczwVWn5jPZ583GrGy4Dsn8eMG1Mw27"

cleos wallet import 5KQhuVV1CKQ5gRzfuTcKShJAfpbuXVTeJ1EuYFUu8nhN8Whh7ru
cleos -u http://13.251.3.82 system regproducer eos.store EOS7etACj3TMiaDRChbDBZTZiGujW8rPQFMNUwWHZ6vmDU3K2GXrY "https://www.eos.store"
执行成功后，可以在eosio.sg网站首页bp列表中看到eos.store，接下来需要投票才能成为活跃BP。

# Step 5: 投票（用EOS购置股权，然后在eosio.sg的portal页进行投票操作，也可以命令行投票。注意，要小于总额）

# 购置股权
cleos -u http://13.251.3.82 system delegatebw --transfer eos.store eos.store "99 EOS" "1 EOS"

# 用命令行投票
http://www.eosio.sg/ 注册信息
vchengsong
pubkey:EOS697jkKZTX1hntvjZqRnrA8EC6rUXyMBg4EHUArjvRHF6ph1erj
prikey:5KE1ZhGzsdoXDMHZEU9eqxqPvDDAhqvJXrG6LP2tqAwTNgKpjZH

cleos -u http://13.251.3.82 system delegatebw --transfer vchengsong vchengsong "99 EOS" "1 EOS"
cleos -u http://13.251.3.82 system voteproducer prods vchengsong eos.store

# 自动投票脚本
curl -X POST http://13.251.3.82:8080/account -d '{"name":"ytrusu","public_key":"EOS8AiPgMePG6XtUFt7aYfnRCHnSn7Y6NH8KoRffT7wkrkbjdRSaq","private_key":"5JEMZeHPKWj1FgiYESPkjqY5jf1KxKM56oFkjbog8AXJTvewuJG"}'
cleos -u http://13.251.3.82 system delegatebw --transfer ytrusu ytrusu "99 EOS" "1 EOS"

```

### 2个全节点
```bash
# Step 1: 在eosio.sg注册用户并获得秘钥对，获得一定的余额
fullnode.1
Private key: 5KQBcHzu4UzeBXpAhoBnQqFG1294AkR8dorUkRP4cN7ZHh3VS3f
Public key: EOS8NDNADwGaKBjQUg3M5b75C42iuoBUHEWLKwkVVuMKzW4D5XjKy

fullnode.2
Private key: 5JNm9f3N1hvN7JxiuDFcQksuMSxqH7WT8GKaVozT4M2tXLx14VC
Public key: EOS5AZyzAbTRf5TZsq8bsmjxBUFHvLT9TZruyS5kCEPf2oEoskhy5


# Step 2: 安装配置文件config.ini并跟新参数、安装genesis.json
配置文件存放目录为 /data/eos-config
config.ini里需要更新的参数包括：private-key producer-name为空 agent-name p2p-peer-address

# Step 3: 启动eosio
nohup nodeos -d /data/eos-data --config-dir /data/eos-config --plugin eosio::chain_api_plugin \
 --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &

tail -f /data/eosio.log

```


