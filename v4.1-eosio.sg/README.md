

### 每个参与节点的环境准备
```bash
# Step 1: 安装程序（首先是远程传输eosio相关软件到本主机~/eosio目录）
cp -r ~/eosio/* /usr/local/bin
mkdir -p /data/eos-data && mkdir /data/eos-config && mkdir /data/eos-wallet
```

### BPC节点
```bash

# Step 1: 在eosio.sg注册用户eos.store并获得秘钥对，获得一定的余额
eosstore4321
Private key: 5HzWfiYpjWmGATRwUgA764Lh84iLZpqq6ZH83hKr9mwS4FfJwd9
Public key: EOS5c93Szxzrz1ByyYh5TzKjHzUsX4FA9zvQyUDiTiXSGG6eLyy9L

# Step 2: 安装配置文件config.ini并跟新参数、安装genesis.json
配置文件存放目录为 /data/eos-config
config.ini里需要更新的参数包括：private-key producer-name agent-name p2p-peer-address

# Step 3: 启动eosio
nohup nodeos -d /data/eos-data --config-dir /data/eos-config --plugin eosio::chain_api_plugin \
 --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &

tail -f /data/eosio.log

# Step 4: 为eos.store注册生产者
cleos wallet create
"PW5KZkZvua5UWa1Fy69mZGwqm1B2BX2EAVSniYbhD2jKtJ2zQcsvm"

cleos wallet import 5HzWfiYpjWmGATRwUgA764Lh84iLZpqq6ZH83hKr9mwS4FfJwd9
cleos -u http://13.251.3.82 system regproducer eosstore4321 EOS5c93Szxzrz1ByyYh5TzKjHzUsX4FA9zvQyUDiTiXSGG6eLyy9L "https://www.eos.store"
执行成功后，可以在eosio.sg网站首页bp列表中看到eosstore4321，接下来需要投票才能成为活跃BP。

# Step 5: 投票（用EOS购置股权，然后在eosio.sg的portal页进行投票操作，也可以命令行投票。注意，要小于总额）

# 购置股权并投票
cleos -u http://13.251.3.82 system delegatebw --transfer eosstore4321 eosstore4321 "6990 EOS" "1 EOS"
cleos -u http://13.251.3.82 system voteproducer prods eosstore4321 eosstore4321

# 用命令行投票
http://www.eosio.sg/ 注册信息
vchengsong
pubkey:EOS697jkKZTX1hntvjZqRnrA8EC6rUXyMBg4EHUArjvRHF6ph1erj
prikey:5KE1ZhGzsdoXDMHZEU9eqxqPvDDAhqvJXrG6LP2tqAwTNgKpjZH

cleos -u http://13.251.3.82 system delegatebw --transfer vchengsong vchengsong "99 EOS" "1 EOS"
cleos -u http://13.251.3.82 system voteproducer prods vchengsong eosstore4321

```

### 2个全节点
```bash
# Step 1: 在eosio.sg注册用户并获得秘钥对，获得一定的余额
fullnode4321
Private key: 5KBLjgqKK2aWJALsTmGE2hLHjPRpAQqSHDanaT2Asnq8wm7UtdD
Public key: EOS6BS4uibU7GqPBiaT2FDEDmxogSKRW9MNWDPGb58shbzEb5rpfM

fullnode4322
Private key: 5Jdpu4btM4YV6U7DvG6wZaTZrzqwBrjYxYvVJ8ktNzZRcjVHfpm
Public key: EOS5wPp1vRcxUm3bE4DCkWExMKaJgJNsACkUFK1DErEEBjZSwmfu3

fullnode4323
Private key: 5HqpjAWjdUAYoupQfqMWByUQa8Ksy8h4bDcNT4DXQATErQfXg8U
Public key: EOS6zEs8ASxpb2fTfVkgL4X2GEwR88bBJVqCRbknL1oerEs35xBfP

fullnode4324
Private key: 5KMUVF7bo12TgJaw3EHeRSGWNV16EurrJDDhidrxLXvnV2PTjMp
Public key: EOS6z1SaaoqBX8TKiqnLMLXvpmCopWpVSJLKnd9bD4DugKtKnmCC9

fullnode4325
Private key: 5J8LEKZcyNzUyP5g6ap7EhqA773X4FZFkYpgcssBp5AmimZu35Z
Public key: EOS5BZp56dCxttN3bXa7Uef2FgkXd6DMMyTfX1i4NU3tuaFqQYkiY


### 用配置文件启动 ###
# Step 2-1: 安装配置文件config.ini并跟新参数、安装genesis.json
配置文件存放目录为 /data/eos-config
config.ini里需要更新的参数包括：private-key producer-name为空 agent-name p2p-peer-address

# Step 2-2: 启动eosio
nohup nodeos -d /data/eos-data --config-dir /data/eos-config --plugin eosio::chain_api_plugin \
 --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &

tail -f /data/eosio.log


### 用命令行参数启动 ###

nohup nodeos --config-dir /data/eos-config -d /data/eos-data --wallet-dir /data/eos-wallet \
 --http-server-address  127.0.0.1:8888      \
 --p2p-listen-endpoint  0.0.0.0:9871        \
 --p2p-peer-address     13.251.3.82:9876    \
 --p2p-peer-address     13.230.149.24:9871  \
 --p2p-peer-address     52.74.251.4:9871    \
 --shared-memory-size-mb 8096  \
 --agent-name "eosstore2018"      \
 --private-key '["EOS6z1SaaoqBX8TKiqnLMLXvpmCopWpVSJLKnd9bD4DugKtKnmCC9","5KMUVF7bo12TgJaw3EHeRSGWNV16EurrJDDhidrxLXvnV2PTjMp"]' \
 --plugin eosio::chain_api_plugin \
 --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &




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