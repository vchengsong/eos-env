

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

### 监控内容
攻击前要准备的事项

1. 主服务器禁止外网ip， 只能通过NLB的ip访问外网
2. NLB的ip只开放9876端口，关闭所有其他端口
3. shield等级升为adv级别
4. 现场演示更换NLB的EIP（验证一下）
5. 实时观察攻击流量和防护流量


事项：
尽早购买大服务器



监控：
1. 内网ping主机，查看延时

Shield监控
NLB监控
主机cpu、网络、内存监控
出块监控



3个节点的出块情况
ping 172.30.100.105
for i in `seq 1000000`;do check_tcp -H 172.30.100.105 -p 9871 && sleep 1;done








user11
pub:EOS5W7K3wxqgffH2q65XXkGRMPNa3CF9Nmp5DedbGECq5AVE3w1xo 
pri:5KD7BgKvFyd3FzRx5BLN7AXLCkGDYC8m4BFedrDMhTpA3zRG4RE

cleos -u http://13.251.3.82 system delegatebw --transfer user11 user11 "990 EOS" "1 EOS"

cleos -u http://13.251.3.82 system voteproducer prods user11 eos.store


2.156e+23