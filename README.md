
地区  |   bp_name     |   角色
华北  	eoshuabei		 boot keosd
华东  	eoshuadong
华南  	eoshuanan
香港  	eostore
东京  	eostore
新加坡  	eostore


注意：每个云上的虚机都要开启入方向的9876端口(9876/9876 0.0.0.0/0)，才能正常工作

#### 华北 启动节点 eosio
```
Step 1:
# mkdir -p /eos/data && mkdir -p /eos/blockchain && mkdir -p /eos/wallet

Step 2:
# docker run -d --restart=always --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /eos/data:/opt/eosio/bin/data-dir \
    -v /eos/blockchain:/root/.local/share/eosio/nodeos/data \
    eosio/eos nodeosd.sh --enable-stale-production --producer-name eosio --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin
# docker logs -f nodeos

Step 3:
# docker run -d --restart=always --name keosd --link nodeos \
    -v /eos/wallet:/root/eosio-wallet \
    -v /eos/data:/opt/eosio/bin/data-dir \
    eosio/eos keosd
# alias cleos='docker exec keosd cleos -H nodeos'
# cleos get info

Step 4:     
# cleos wallet create       # 之后将钱包password记录在Records.txt
说明:必须先创建wallet(default)，并且包含了eosio的私钥和公钥。

Step 5:
# cleos set contract eosio /opt/eosio/bin/data-dir/contracts/eosio.bios

Step 6:新建用户
# cleos create key          # 执行多次 之后将钱包password记录在Records.txt

# cleos wallet import 5Hpv9p4krLHRfzMaRtiP2wUuSJx5QErPx1xyVWRddTCDkemH5kK
# cleos wallet import 5JtRPPPceNvu1hCkXXoANxtCL3VJK1mYNqy82xJTHpvYRPK5dJm
# cleos wallet import 5HvZaSEkvwsWPa11sD7FbEdjiHodo7BvG75c7v9NYHj458hhaLy
# cleos wallet import 5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC


# cleos create account eosio eoshuabei EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8 EOS6LQ6sGUDNYH35opPHwA1sdw8rjtN9s1ZpF1zA8mgHZQ2xoAgk8
# cleos create account eosio eoshuadong EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ EOS6PGpv1vuLrsDxwjrz7cU47ueKz3twp4Et48qJoPFux2Z6y7bDZ
# cleos create account eosio eoshuanan EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft EOS7Gn3L4Pf7oUgqdaXPKg7SEDAkxiYNntmf83CGHS1Bq5sZfpcft
# cleos create account eosio eostore EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk 

```  
    
东京、香港、新加坡节点
```
Step 1:
# mkdir -p /eos/data && mkdir -p /eos/blockchain && mkdir -p /eos/wallet

Step 2:
# docker run -d --restart=always --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /eos/data:/opt/eosio/bin/data-dir \
    -v /eos/blockchain:/root/.local/share/eosio/nodeos/data \
    eosio/eos nodeos --resync \
    --producer-name eostore \
    --plugin eosio::chain_api_plugin \
    --plugin eosio::net_api_plugin \
    --p2p-peer-address 47.104.242.13:9876 \
    --private-key [\"EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk\",\"5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC\"]
# docker logs -f nodeos
```  
    
激活BP
```
# cleos push action eosio setprods \
"{ \"version\": 1, \"producers\": [ \
{\"producer_name\": \"eosio\",\"block_signing_key\": \"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV\"}, \
{\"producer_name\": \"eostore\",\"block_signing_key\": \"EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk\"} \
]}" -p eosio@active


# cleos get info  # 观察区块生产者
```
