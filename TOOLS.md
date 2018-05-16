

### 查看一个进程的所有网络连接
```bash
lsof -p 4573 -nP | grep TCP

```


### nmap
apt install nmap

nmap <ip> -p1-65530 --min-rate 10000 [-Pn]



### check_tcp

有个docker镜像 vpgrp/monitoring-plugins

``` bash

# Step 1: 编译安装
wget https://www.monitoring-plugins.org/download/monitoring-plugins-2.2.tar.gz
gzip -dc monitoring-plugins-2.2.tar.gz | tar -xf -
cd monitoring-plugins-2.2
./configure
make
make install

# Step 2:加入系统路径
vi ~/.bashrc
PATH=$PATH:/usr/local/libexec

. ~/.bashrc

# 用法
for i in `seq 1000000`;do check_tcp -H 172.30.100.105 -p 9871 && sleep 1;done


```
