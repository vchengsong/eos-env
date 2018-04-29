
1. 确定小于1/3的时候不会再产生块?，要测试，这是为了防止分叉。
2. 如何快速的切换节点角色？

bp节点不提供http服务，

3.高可用方案汇总
    a 用同一个角色启动多台机器（因为出块冲突，会很快出现分叉，此法不通）
    b 用同一个角色启动多台机器，主服务器开启9876端口，其他机器关闭，主服务器故障，开启其他机器9876端口。
      这样的好处是，不需要重启进程。（不可行）
    c 切换角色（验证可行，但如果区块数据过大，重启需要的时间会增加）
    d 不重启的情况下切换角色（未验证，可能需要修改源码）


4.分层结构：
    a 数据层
      链数据、配置文件
      每小时一次快照（保留几个快照即可）
      要有多个链数据，多备份
    b eosd进程层
      采用多个进程（主备）
      避免分叉
    c 自动切换
      考虑方案（keepalive / 容器管理工具）



``` bash

is_eostore=false
is_init=false
is_restart_always=false

if ${is_restart_always};then
    docker_arg="--restart=always"
fi


if [ ! -d "/data/eos" ];then echo "No dir /data/eos/.." && exit 1 ; fi

if ! ${is_init};then
    docker stop nodeos
    sleep 1
    docker rename nodeos nodeos-`date "+%y%m%d-%H%M"`
fi


p2p_peer_address=47.104.242.13:9876

if ${is_eostore};then
    #eostore
    private_key=5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC
    public_key=EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk
    nodeos_arg="--producer-name eostore"
    
else
    #eosbp11
    private_key=5KPX51GaCTJF6D28L9MXH4Ct8QgA1jm2KxNb1b4ALV9w2d6JywL
    public_key=EOS7SG6NNg3jeVJdqEeV2RACEiruW5AFEZx4ChCmDGSYdB56Jrsdc
fi
 
docker run ${docker_arg} -d --name nodeos \
    -p 8888:8888 -p 9876:9876 \
    -v /data/eos/data:/opt/eosio/bin/data-dir \
    -v /data/eos/blockchain:/root/.local/share/eosio/nodeos/data \
    eosio/eos nodeos ${nodeos_arg} \
    --plugin eosio::chain_api_plugin \
    --plugin eosio::net_api_plugin \
    --p2p-peer-address $p2p_peer_address \
    --http-server-address 0.0.0.0:8888 \
    --private-key [\"${public_key}\",\"${private_key}\"]
    
docker logs -f --tail 1 nodeos
    
```    