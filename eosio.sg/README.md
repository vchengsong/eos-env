


cp -r ~/eosio/* /usr/local/bin
mkdir /data/eos-data && mkdir /data/eos-config && mkdir /data/eos-wallet

nodeos -d /data/eos-data --config-dir /data/eos-config --plugin eosio::chain_api_plugin --plugin eosio::net_api_plugin 


