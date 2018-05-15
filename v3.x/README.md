
## EOS测试网络部署手册

#### 操作系统初始化安装
```
yum -y install docker git nodejs screen tree
systemctl enable docker && systemctl start docker && docker pull eosio/eos
mkdir -p /data/eos/data && mkdir -p /data/eos/blockchain && mkdir -p /data/eos/wallet
```

#### 注意事项：
1. 每个云上的虚机都要开启入方向的9876端口(9876/9876 0.0.0.0/0)，才能正常工作
2. 任何时候不能强制删除正在运行的容器，必须先stop，然后再rm。

#### 启动节点 eosio
```
Step 1:
docker run -d --restart=always --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    -v /data/eos/blockchain:/root/.local/share/eosio/nodeos/data \
    eosio/eos nodeosd.sh --enable-stale-production --producer-name eosio \
    --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin --http-server-address 0.0.0.0:8888
docker logs -f nodeos

Step 2:
docker run -d --restart=always --name keosd --link nodeos \
    -v /data/eos/wallet:/root/eosio-wallet \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    eosio/eos keosd
echo "alias cleos='docker exec keosd cleos -H nodeos'" >> ~/.bashrc && . ~/.bashrc
cleos get info

Step 3:     
cleos wallet create       # 之后将钱包password记录在Records.txt
说明:必须先创建wallet(default)，并且包含了eosio的私钥和公钥。

Step 4:
cleos set contract eosio /opt/eosio/bin/data-dir/contracts/eosio.bios

Step 5:新建用户
#### cleos create key          # 执行多次 之后将钱包password记录在Records.txt

cleos wallet import 5Hpv9p4krLHRfzMaRtiP2wUuSJx5QErPx1xyVWRddTCDkemH5kK      #eosbp1
cleos wallet import 5JtRPPPceNvu1hCkXXoANxtCL3VJK1mYNqy82xJTHpvYRPK5dJm      #eosbp2
cleos wallet import 5HvZaSEkvwsWPa11sD7FbEdjiHodo7BvG75c7v9NYHj458hhaLy      #eosbp3
cleos wallet import 5JoGyPJwmqubeGcxhavL8mvF2EchHztaN9PvPUPjv3JRjTPUXV4      #eosbp4
cleos wallet import 5JHdqY4H4rBuAFMcpHP7SE8PjwV2N3c1SuAoKyxNSmyqsfAR6fG      #eosbp5
cleos wallet import 5KPX51GaCTJF6D28L9MXH4Ct8QgA1jm2KxNb1b4ALV9w2d6JywL      #eosbp11

cleos wallet import 5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC      #eosstore

cleos create account eosio eosbp1 EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8 EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8
cleos create account eosio eosbp2 EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ
cleos create account eosio eosbp3 EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft
cleos create account eosio eosbp4 EOS7AiMrgd2d9nDK7cFk4JbJH14UWb8EHTbYGZig1tJzTANa7zEAH EOS7AiMrgd2d9nDK7cFk4JbJH14UWb8EHTbYGZig1tJzTANa7zEAH
cleos create account eosio eosbp5 EOS6CbwnyzEmMvEXkHgScE7poZRBhM68Ls5Wf5gunhwo5uWMqXs8q EOS6CbwnyzEmMvEXkHgScE7poZRBhM68Ls5Wf5gunhwo5uWMqXs8q
cleos create account eosio eosbp11 EOS7SG6NNg3jeVJdqEeV2RACEiruW5AFEZx4ChCmDGSYdB56Jrsdc EOS7SG6NNg3jeVJdqEeV2RACEiruW5AFEZx4ChCmDGSYdB56Jrsdc

cleos create account eosio eosstore EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk 

```  

#### 其他节点
```
echo "alias cleos='docker exec nodeos cleos'" >> ~/.bashrc && . ~/.bashrc


# Step 1:
p2p_peer_address=13.230.91.225:9876

# Step 2:
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

producer_name=eosstore
private_key=5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC
public_key=EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk


docker run -d --restart=always --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    -v /data/eos/blockchain:/root/.local/share/eosio/nodeos/data \
    eosio/eos nodeos \
    --producer-name ${producer_name} \
    --plugin eosio::chain_api_plugin \
    --plugin eosio::net_api_plugin \
    --p2p-peer-address $p2p_peer_address \
    --http-server-address 0.0.0.0:8888 \
    --private-key [\"${public_key}\",\"${private_key}\"]

#说明：如果提示错误，需要为nodeos命令添加参数 --resync，告诉nodeos重新同步脚本，如果链数据很多，要非常谨慎使用该选项，因为会非常耗时。
    
docker logs -f nodeos

```  


### 激活BP
```
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

