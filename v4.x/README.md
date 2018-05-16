### 三个节点

| hostname |   位置 |   操作系统      |  配置 |
|----------| ------ |-------|------|
| eos-bp1  | 东京可用区1 | Ubuntu 16.10 | 64核 1T内存 10G带宽 20T存储|
| eos-bp2  | 东京可用区2 | Ubuntu 16.04 | 64核 1T内存 10G带宽 20T存储|
| eos-bp3  | 新加坡   |   Centos 7.4 | 64核 1T内存 10G带宽 20T存储|


### 从docker镜像cp出程序，并上传到需要部署的服务器
``` bash
docker run --rm -it --name tmp eosio/eos:dawn-v4.0.0 bash -c "cp -r /contracts /opt/eosio/bin/data-dir && bash"


# 在另一个shell中执行
cd && mkdir eosio
docker cp tmp:/opt/eosio/bin  eosio

# 在相应主机上创建eosio目录，然后cp到对应的主机
ssh song@172.16.182.133 mkdir ~/eosio
scp -r -P 22 eosio/bin/* root@172.16.182.133:~/eosio 

# 进入各个主机将程序cp到执行目录
sudo cp -r ~/eosio/* /usr/local/bin
```

### 启动第一个BP节点

``` bash
Step 1:
sudo mkdir /data && sudo chown song:song /data
mkdir /data/eos-data && mkdir /data/eos-config && mkdir /data/eos-wallet
nohup nodeos -d /data/eos-data --config-dir /data/eos-config --enable-stale-production --producer-name eosio \
    --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin > /data/eosio.log 2>&1 &
tail -f /data/eosio.log

Step 2:
nohup keosd -d /data/eos-data --wallet-dir /data/eos-wallet --http-server-address 127.0.0.1:8899 > /data/keosd.log 2>&1 &
echo "alias cleos='cleos --url http://127.0.0.1:8888 --wallet-url http://127.0.0.1:8899'" >> ~/.bashrc && . ~/.bashrc
cleos get info

Step 3:     
cleos wallet create       # 之后将钱包password记录在Records.txt
说明:必须先创建wallet(default)，并且包含了eosio的私钥和公钥。

Step 4:
cleos set contract eosio /usr/local/bin/data-dir/contracts/eosio.bios

Step 5:新建用户
#### cleos create key          # 执行多次 之后将钱包password记录在Records.txt

cleos wallet import 5Hpv9p4krLHRfzMaRtiP2wUuSJx5QErPx1xyVWRddTCDkemH5kK      #eosbp1
cleos wallet import 5JtRPPPceNvu1hCkXXoANxtCL3VJK1mYNqy82xJTHpvYRPK5dJm      #eosbp2
cleos wallet import 5HvZaSEkvwsWPa11sD7FbEdjiHodo7BvG75c7v9NYHj458hhaLy      #eosbp3
cleos wallet import 5JoGyPJwmqubeGcxhavL8mvF2EchHztaN9PvPUPjv3JRjTPUXV4      #eosbp4
cleos wallet import 5JHdqY4H4rBuAFMcpHP7SE8PjwV2N3c1SuAoKyxNSmyqsfAR6fG      #eosbp5
cleos wallet import 5KPX51GaCTJF6D28L9MXH4Ct8QgA1jm2KxNb1b4ALV9w2d6JywL      #eosbp11
cleos wallet import 5HtdWjARtxWcjidGPRHmerAjg7pTB7Go3TctiBWebsKjrVTwYYy      #eosbp12
cleos wallet import 5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC      #eosstore
cleos wallet import 5JQKEf9ZVTAGt29KWqdfww8Mr65NUNQ7Y9S2zaomNa7Q3BtnwB4      #eosio.token
cleos wallet import 5KQot2gvQGfzb3QqBXGpyNgzqVxUgTYJwJ9tymHamdh9nLrQQUg      #voter1
cleos wallet import 5JCKMJLkUcfLLdd7X6Ketm9WBuU2yZzsTzD2ENCWE1zh9XSMn5B      #voter2

cleos create account eosio eosbp1 EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8 EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8
cleos create account eosio eosbp2 EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ
cleos create account eosio eosbp3 EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft
cleos create account eosio eosbp4 EOS7AiMrgd2d9nDK7cFk4JbJH14UWb8EHTbYGZig1tJzTANa7zEAH EOS7AiMrgd2d9nDK7cFk4JbJH14UWb8EHTbYGZig1tJzTANa7zEAH
cleos create account eosio eosbp5 EOS6CbwnyzEmMvEXkHgScE7poZRBhM68Ls5Wf5gunhwo5uWMqXs8q EOS6CbwnyzEmMvEXkHgScE7poZRBhM68Ls5Wf5gunhwo5uWMqXs8q
cleos create account eosio eosbp11 EOS7SG6NNg3jeVJdqEeV2RACEiruW5AFEZx4ChCmDGSYdB56Jrsdc EOS7SG6NNg3jeVJdqEeV2RACEiruW5AFEZx4ChCmDGSYdB56Jrsdc
cleos create account eosio eosbp12 EOS7Xpa3YCn8YQmCpabGc3L2ungqaqaQkrwDDDvP6ExebDAC25Agd EOS7Xpa3YCn8YQmCpabGc3L2ungqaqaQkrwDDDvP6ExebDAC25Agd
cleos create account eosio eosstore EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk 
cleos create account eosio eosio.token EOS6LuHe5T9GcXP4ZbDND1z1yp6qU3uw84AhU6ohYUWExTmgBZEGW EOS6LuHe5T9GcXP4ZbDND1z1yp6qU3uw84AhU6ohYUWExTmgBZEGW
cleos create account eosio voter1 EOS5LtzLC7pU7HH16DZvnD5sbp2KdTX1HQ8usgx4qucx4rzRk6U79 EOS5LtzLC7pU7HH16DZvnD5sbp2KdTX1HQ8usgx4qucx4rzRk6U79
cleos create account eosio voter2 EOS8PvjvhimDWFyH1py4mgvnLBkRi2533RSCUxRZkhZaX3bFRifLj EOS8PvjvhimDWFyH1py4mgvnLBkRi2533RSCUxRZkhZaX3bFRifLj


Step 6: 添加eosio.token合约并生成初始EOS货币
cleos set contract eosio.token /usr/local/bin/data-dir/contracts/eosio.token
cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS", 0, 0, 0]' -p eosio.token

Step 7: 发行货币
cleos push action eosio.token issue '[ "eosbp1", "1000000.0000 EOS", "memo" ]' -p eosio
cleos push action eosio.token issue '[ "eosbp2", "1000000.0000 EOS", "memo" ]' -p eosio
cleos push action eosio.token issue '[ "eosbp3", "1000000.0000 EOS", "memo" ]' -p eosio
cleos push action eosio.token issue '[ "eosbp4", "1000000.0000 EOS", "memo" ]' -p eosio
cleos push action eosio.token issue '[ "voter1", "200000000.0000 EOS", "memo" ]' -p eosio
cleos push action eosio.token issue '[ "voter2", "200000000.0000 EOS", "memo" ]' -p eosio
cleos get  currency balance eosio.token eosbp1 EOS

Step 8: 添加eosio.system合约
cleos set contract eosio /usr/local/bin/data-dir/contracts/eosio.system

```

### 启动其他节点

``` bash
# Step 1:
p2p_peer_address=172.16.182.138:9876

# Step 2:  选择相应的生产者名称和秘钥对
producer_name=eosbp1
private_key=5Hpv9p4krLHRfzMaRtiP2wUuSJx5QErPx1xyVWRddTCDkemH5kK
public_key=EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8

producer_name=eosbp2
private_key=5JtRPPPceNvu1hCkXXoANxtCL3VJK1mYNqy82xJTHpvYRPK5dJm
public_key=EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ

producer_name=eosbp3
private_key=5HvZaSEkvwsWPa11sD7FbEdjiHodo7BvG75c7v9NYHj458hhaLy
public_key=EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft

producer_name=eosbp4
private_key=5JoGyPJwmqubeGcxhavL8mvF2EchHztaN9PvPUPjv3JRjTPUXV4
public_key=EOS7AiMrgd2d9nDK7cFk4JbJH14UWb8EHTbYGZig1tJzTANa7zEAH

producer_name=eosbp5
private_key=5JHdqY4H4rBuAFMcpHP7SE8PjwV2N3c1SuAoKyxNSmyqsfAR6fG
public_key=EOS6CbwnyzEmMvEXkHgScE7poZRBhM68Ls5Wf5gunhwo5uWMqXs8q

producer_name=eosbp11
private_key=5KPX51GaCTJF6D28L9MXH4Ct8QgA1jm2KxNb1b4ALV9w2d6JywL
public_key=EOS7SG6NNg3jeVJdqEeV2RACEiruW5AFEZx4ChCmDGSYdB56Jrsdc

producer_name=eosbp12
private_key=5HtdWjARtxWcjidGPRHmerAjg7pTB7Go3TctiBWebsKjrVTwYYy
public_key=EOS7Xpa3YCn8YQmCpabGc3L2ungqaqaQkrwDDDvP6ExebDAC25Agd

producer_name=eosstore
private_key=5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC
public_key=EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk


sudo mkdir /data && sudo chown song:song /data
nohup nodeos -d /data/eos-data --config-dir /data/eos-config --producer-name ${producer_name} \
    --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin \
    --p2p-peer-address $p2p_peer_address --private-key [\"${public_key}\",\"${private_key}\"] > /data/eosio.log 2>&1 &
tail -f /data/eosio.log

cleos wallet create
cleos wallet import ${private_key}
cleos system regproducer ${producer_name} ${public_key}

```


### 给BP投票
```
#列出BPC
cleos system listproducers

#voter 购买权益
cleos push action eosio delegatebw '{"from":"voter1","receiver":"voter1","stake_net_quantity":"10000000 EOS","stake_cpu_quantity":"10000000 EOS","stake_storage_quantity":"0 EOS"}' -p voter1


cleos system buyram voter1 voter1 "1 EOS"

cleos system delegatebw --transfer voter1 voter1 "100000000 EOS" "100000000 EOS"



cleos push action eosio delegatebw '{"from":"voter","receiver":"voter","stake_net_quantity":"23.0000 EOS","stake_cpu_quantity":"20.0000 EOS","stake_storage_quantity":"1.0000 EOS"}' -p voter
cleos push action eosio voteproducer '["voter", "", ["producer1"]]' -p voter
#cleos system voteproducer prods voter producer1 -p voter






















cleos push action eosio setprods \
"{ \"version\": 1, \"producers\": [ \
{\"producer_name\": \"eosio\",\"block_signing_key\": \"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV\"}, \
{\"producer_name\": \"eosbp1\",\"block_signing_key\": \"EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8\"}, \
{\"producer_name\": \"eosbp2\",\"block_signing_key\": \"EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ\"} \
]}" -p eosio@active



cleos push action eosio setprods \
"{ \"version\": 1, \"producers\": [ \
{\"producer_name\": \"eosio\",\"block_signing_key\": \"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV\"}, \
{\"producer_name\": \"eosbp1\",\"block_signing_key\": \"EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8\"}, \
{\"producer_name\": \"eosbp2\",\"block_signing_key\": \"EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ\"}, \
{\"producer_name\": \"eosbp3\",\"block_signing_key\": \"EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft\"}, \
{\"producer_name\": \"eosstore\",\"block_signing_key\": \"EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk\"} \
]}" -p eosio@active


cleos get info  # 观察区块生产者
```



















