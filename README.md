
地区  |   bp_name     |   角色
华北  	eoshuabei		 boot keosd
华东  	eoshuadong
华南  	eoshuanan
香港  	eostore
东京  	eostore
新加坡  	eostore


操作系统初始化安装
yum -y install docker git nodejs
systemctl enable docker && systemctl start docker && docker pull eosio/eos
mkdir -p /data/eos/data && mkdir -p /data/eos/blockchain && mkdir -p /data/eos/wallet

注意事项：
1. 每个云上的虚机都要开启入方向的9876端口(9876/9876 0.0.0.0/0)，才能正常工作
2. 任何时候不能强制删除正在运行的容器，必须先stop，然后再rm。

#### 华北 启动节点 eosio
```
Step 1:
# docker run -d --restart=always --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    -v /data/eos/blockchain:/root/.local/share/eosio/nodeos/data \
    --http-server-address 0.0.0.0:8888 \
    eosio/eos nodeosd.sh --enable-stale-production --producer-name eosio --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin
# docker logs -f nodeos

Step 2:
# docker run -d --restart=always --name keosd --link nodeos \
    -v /data/eos/wallet:/root/eosio-wallet \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    eosio/eos keosd
# alias cleos='docker exec keosd cleos -H nodeos'
# cleos get info

Step 3:     
# cleos wallet create       # 之后将钱包password记录在Records.txt
说明:必须先创建wallet(default)，并且包含了eosio的私钥和公钥。

Step 4:
# cleos set contract eosio /opt/eosio/bin/data-dir/contracts/eosio.bios

Step 5:新建用户
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
# docker run -d --restart=always --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    -v /data/eos/blockchain:/root/.local/share/eosio/nodeos/data \
    eosio/eos nodeos \
    --producer-name eostore \
    --plugin eosio::chain_api_plugin \
    --plugin eosio::net_api_plugin \
    --p2p-peer-address 47.104.242.13:9876 \
    --http-server-address 0.0.0.0:8888 \
    --private-key [\"EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk\",\"5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC\"]
    说明：如果提示错误，需要为nodeos命令添加参数 --resync，告诉nodeos重新同步脚本，如果链数据很多，要非常谨慎使用该选项，因为会非常耗时。
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

