

《EOS的多重签名账户方案-实践》

在比特币和以太坊的基础上，EOS丰富了账户系统，账户是用户自定义的一个字符串，并且可以给该账户配置灵活的权限等级管理。


实现https://github.com/EOSIO/eos/wiki/Accounts-&-Permissions 中描述的多签名账户




``` bash

# 注意：请使用最新的镜像
docker pull eosio/eos:latest

# 启动一个单节点私有链
docker run -d --restart=always --name nodeos -p 8888:8888 -p 9876:9876 eosio/eos nodeosd.sh \
    --enable-stale-production --producer-name eosio \
    --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin --http-server-address 0.0.0.0:8888
    
# 查看出块情况
#docker logs -f --tail 10 nodeos
    
# 启动keosd容器    
docker run -d --restart=always --name keosd --link nodeos eosio/eos keosd    
 
# 设置cleos命令别名
alias cleos='docker exec keosd cleos -u http://nodeos:8888'

测试cleos命令
cleos get info

如果输出类似下面的内容，则说明以上步骤顺利完成。
{
  "server_version": "08cab1dc",
  "head_block_num": 240,
  "last_irreversible_block_num": 239,
  "head_block_id": "000000f04db7f22755bc1c984871ac4a1e2fe202b10ff3e4526e66fef3d7c211",
  "head_block_time": "2018-04-29T06:53:27",
  "head_block_producer": "eosio"
}

创建default钱包
cleos wallet create
"PW5J5Y33g5Zpvp9TBxwxWkDKc7vA9wY7nBo9Gvuf8mNK8LKxCZhq1"

确保钱包是打开的,
$  cleos wallet list
Wallets:
[
  "default *"
]

创建key

song:eos-env$  cleos create key
Private key: 5KSLkkBNzVmGcfQYiMWosyojDUriCDJoFSymgL8t1meTYXdW7G3
Public key: EOS81diURTNSfJobyq2NGdqA5RYM5yCYbcay5uFPsDkTLH3TYvFJj
song:eos-env$  cleos create key
Private key: 5KNR3nsK8HP9CcoUuaWFQdBevn62goHhwVpZ8XdCmS68TnUYoFJ
Public key: EOS5CZSzYGgP262DaNb61wZwDkZAfewHSnpyV798HR4dRoPuAUqnR
song:eos-env$  cleos create key
Private key: 5KCaZN1ohp3Abe57ctHmEGPbkuQEMcTb6mJPeWvvPwc6UuketBC
Public key: EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8
song:eos-env$  cleos create key
Private key: 5KU4QSzxdSC5aoFwxesgKGGA9wLwFLmJx6bnRjoTwge6ioefK5L
Public key: EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49


song:eos-env$  cleos create key
Private key: 5Jw737azvSJRBSSX7cRBJfWxsV9UKwuAWe1LKTqJatDQ5VXAzqW
Public key: EOS7TzFmFMxDXvPoPvaWgTLJSR7G1Gm8ojf3uRufF5ZYBF15KV3ge
song:eos-env$  cleos create key
Private key: 5KU2tbocPNumW9wC7Td2q15biHq1iW8HzJWLLMjWzgZmzrGdh8f
Public key: EOS7o212jPMEdH64nLsGUEe6Wf5Lxk7T75De2L3v2EfVtpVJBHEYJ
song:eos-env$  cleos create key
Private key: 5JDxr4wcnumH3ne29GphhhaHhRCqFCknXNUSzwrFwg1UsRSjBB2
Public key: EOS88vNDnJP8L1fYuMHnfkbhQdRYcKy5sQ1HmvRvExfv4P5aFYgTt
song:eos-env$  


导入key
cleos wallet import 5KSLkkBNzVmGcfQYiMWosyojDUriCDJoFSymgL8t1meTYXdW7G3  # for account acc1
cleos wallet import 5KNR3nsK8HP9CcoUuaWFQdBevn62goHhwVpZ8XdCmS68TnUYoFJ  # for account acc2
cleos wallet import 5KCaZN1ohp3Abe57ctHmEGPbkuQEMcTb6mJPeWvvPwc6UuketBC  # for account acc3
cleos wallet import 5KU4QSzxdSC5aoFwxesgKGGA9wLwFLmJx6bnRjoTwge6ioefK5L  # for account acc4
  
cleos wallet import 5Jw737azvSJRBSSX7cRBJfWxsV9UKwuAWe1LKTqJatDQ5VXAzqW  # for account 
cleos wallet import 5KU2tbocPNumW9wC7Td2q15biHq1iW8HzJWLLMjWzgZmzrGdh8f  # for account acc4
cleos wallet import 5JDxr4wcnumH3ne29GphhhaHhRCqFCknXNUSzwrFwg1UsRSjBB2  # for account acc4


========================

cleos create account eosio acc1 EOS81diURTNSfJobyq2NGdqA5RYM5yCYbcay5uFPsDkTLH3TYvFJj EOS81diURTNSfJobyq2NGdqA5RYM5yCYbcay5uFPsDkTLH3TYvFJj
cleos create account eosio acc2 EOS5CZSzYGgP262DaNb61wZwDkZAfewHSnpyV798HR4dRoPuAUqnR EOS5CZSzYGgP262DaNb61wZwDkZAfewHSnpyV798HR4dRoPuAUqnR
cleos create account eosio acc3 EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8 EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8
cleos create account eosio acc4 EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49 EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49


u_name=multisig
cleos create account eosio ${u_name} EOS88vNDnJP8L1fYuMHnfkbhQdRYcKy5sQ1HmvRvExfv4P5aFYgTt EOS88vNDnJP8L1fYuMHnfkbhQdRYcKy5sQ1HmvRvExfv4P5aFYgTt
key1=EOS7o212jPMEdH64nLsGUEe6Wf5Lxk7T75De2L3v2EfVtpVJBHEYJ



cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc1","permission":"active"},"weight":1}]}' owner -p multisig@owner
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [{"permission":{"key":"EOS7o212jPMEdH64nLsGUEe6Wf5Lxk7T75De2L3v2EfVtpVJBHEYJ","permission":"active"},"weight":1}], "accounts" : []}' owner

cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc1","permission":"active"},"weight":1},{"permission":{"actor":"acc2","permission":"active"},"weight":1}]}' owner -p multisig@owner


cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc1","permission":"active"},"weight":1},{"permission":{"actor":"acc4","permission":"active"},"weight":1}]}' owner



cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"user1","permission":"active"},"weight":1}]}' owner


cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [{"permission":{"key":"EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8","permission":"active"},"weight":1}], "accounts" : []}' owner
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [{"permission":{"key":"EOS5CZSzYGgP262DaNb61wZwDkZAfewHSnpyV798HR4dRoPuAUqnR","permission":"active"},"weight":1}], "accounts" : []}' owner



cleos set account permission multisig publish '{"threshold" : 2, "keys" : [{"permission":{"key":"EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8","permission":"active"},"weight":1}], "accounts" : [{"permission":{"actor":"bob","permission":"active"},"weight":2},{"permission":{"actor":"stacy","permission":"active"},"weight":2}]}' active




========================




================================================================================================


cleos create account eosio acc1 EOS81diURTNSfJobyq2NGdqA5RYM5yCYbcay5uFPsDkTLH3TYvFJj EOS81diURTNSfJobyq2NGdqA5RYM5yCYbcay5uFPsDkTLH3TYvFJj
cleos create account eosio acc2 EOS5CZSzYGgP262DaNb61wZwDkZAfewHSnpyV798HR4dRoPuAUqnR EOS5CZSzYGgP262DaNb61wZwDkZAfewHSnpyV798HR4dRoPuAUqnR
cleos create account eosio acc3 EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8 EOS4xNVTde5RnY4w9hKpjHvwJ4e9rq7bmZ6K4UU4t8MefixWDcVi8
cleos create account eosio acc4 EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49 EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49



u_name=test2
key1=EOS88vNDnJP8L1fYuMHnfkbhQdRYcKy5sQ1HmvRvExfv4P5aFYgTt
key2=EOS7o212jPMEdH64nLsGUEe6Wf5Lxk7T75De2L3v2EfVtpVJBHEYJ

cleos create account eosio ${u_name} EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49 EOS5Muzf9wdo7oxPZz9okAFMH7RQ4Z9qYHQU9xybXmiBUfN6BxM49
cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [{"permission":{"key":"${key1}","permission":"active"},"weight":1}], "accounts" : [{"permission":{"actor":"acc2","permission":"active"},"weight":50}]}' owner
cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc2","permission":"active"},"weight":50}]}' owner

cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc3","permission":"active"},"weight":1},{"permission":{"actor":"acc1","permission":"active"},"weight":50}]}' owner
cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 100, "keys" : [{"permission":{"key":"${key2}","permission":"active"},"weight":25}], "accounts" : [{"permission":{"actor":"acc4","permission":"active"},"weight":75}]}' owner
cleos get account ${u_name}



================================================================================================


cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [{"permission":{"key":"${key1}","permission":"active"},"weight":1}], "accounts" : [{"permission":{"actor":"acc2","permission":"active"},"weight":50}]}' owner
cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc2","permission":"active"},"weight":50}]}' owner

cleos set account permission ${u_name} active '{"threshold" : 1, "keys" : [], "accounts" : [{"permission":{"actor":"acc3","permission":"active"},"weight":1},{"permission":{"actor":"acc1","permission":"active"},"weight":50}]}' owner
cleos get account ${u_name}
cleos set account permission ${u_name} active '{"threshold" : 100, "keys" : [{"permission":{"key":"${key2}","permission":"active"},"weight":25}], "accounts" : [{"permission":{"actor":"acc4","permission":"active"},"weight":75}]}' owner
cleos get account ${u_name}







```




参考
Accounts & Permissions  https://github.com/EOSIO/eos/wiki/Accounts-&-Permissions
Command Reference  https://github.com/EOSIO/eos/wiki/Command-Reference#create-or-modify-permissions