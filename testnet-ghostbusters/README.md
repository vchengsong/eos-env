

#### 1 安装WireGuard
```bash
# Ubuntu安装
$ sudo add-apt-repository ppa:wireguard/wireguard
$ sudo apt-get update
$ sudo apt-get install wireguard

# macOS安装
$ brew install wireguard-tools

```

#### 2 

``` bash
# HOST A 的操作
mkdir ~/WireGuard && cd ~/WireGuard
wg genkey | tee privatekey | wg pubkey > publickey
ip link add dev wg0 type wireguard
ip link show
ip address add dev wg0 10.0.0.1/24
wg set wg0 private-key ./privatekey
ip link set wg0 up
ip a
wg set wg0 peer Q5+oJebjcMuDDx684nj9jLkA1rXMSheOUM6i51TaDHc= allowed-ips 10.0.0.2/32 endpoint 172.28.130.139:35139
wg showconf wg0

ping 10.0.0.2
wg

# HOST B 的操作
mkdir ~/WireGuard && cd ~/WireGuard
wg genkey | tee privatekey | wg pubkey > publickey
ip link add dev wg0 type wireguard
ip link show
ip address add dev wg0 10.0.0.2/24 
wg set wg0 private-key ./privatekey
ip link set wg0 up
ip a
wg set wg0 peer oy6jCel+LntxG95joXme3aeFJL92ykCTzWB1aFyUp2A= allowed-ips 10.0.0.1/32 endpoint 172.28.130.182:33834
wg showconf wg0

ping 10.0.0.1
wg


#### wg常用命令
wg
wg show
wg showconf wg0





```



#### keybase 常用命令
``` bash

run_keybase     #运行keybase

#查看mount点
keybase status      
keybase config get


```















#Wireguard
[Peer]
PublicKey = 2KPt7wWBfb8w4NgmYSvOn/93qooCOQHCXl39wU9l+Cw=
AllowedIPs = 192.168.100.90/32
Endpoint = 52.74.251.4:5555
PersistentKeepAlive = 20

#EOS
[EOS]
p2p-peer-address = 192.168.100.90:5555
peer-key = EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk







#Wireguard
[Peer]
PublicKey = EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk
AllowedIPs = 192.168.100.90/32
Endpoint = <peer-public-endpoint>:<peer-vpn-port>
PersistentKeepAlive = 20

#EOS
[EOS]
p2p-peer-address = <vpn-ip-address>:<p2p-port>
peer-key = "<eos-public-key>"





eos.store
Private key: 5HwKSKA5QfNgAae3WtRt4oW7EV1gzkjA5jd18qj5M1Wp65BdZhC
Public key: EOS6pB118BPnUySPhojFkwrQ8Kz8sQLqQc41BCcJzvQsK2Wq5X3Dk