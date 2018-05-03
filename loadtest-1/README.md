


```
Step 1: Create account, Run on keosd node.
# cleos wallet import 5Kc4kYKiDMHdamai8QHcZ7jTUN5JvbLQJMZTSGtsEPXrZRqypnM
# cleos wallet import 5KZeRRaMw5QpWvwSpRxCK1ib3UyqZaQ6mDLdmJRZMvuQk72P6KJ
# cleos wallet import 5JiUe8J3mVxut5djhCFtysVUFhUV1LJcDzPjB16j3D48AXfbz2D
# cleos wallet import 5JjAmWyrb1TVLkAm8d4h6kqr1BiE1YCHsgDXvLyFQZbyq3i2kd8
# cleos wallet import 5JQKEf9ZVTAGt29KWqdfww8Mr65NUNQ7Y9S2zaomNa7Q3BtnwB4

# cleos create account eosio user1 EOS6FhDpkkBmZPBrANjfU7z8rBDgm8xwaYLAg8qBsLYR2AG25APcb EOS6FhDpkkBmZPBrANjfU7z8rBDgm8xwaYLAg8qBsLYR2AG25APcb
# cleos create account eosio user2 EOS5JaXkrizggfLXoQ5qACvZJVCheJdR3ipKJk6pnF7o5N5uaseMP EOS5JaXkrizggfLXoQ5qACvZJVCheJdR3ipKJk6pnF7o5N5uaseMP
# cleos create account eosio user3 EOS7waz27CKeMY6KVREJVjn8PY9WP23G6h77hKu4J5ZXSecj5iTAp EOS7waz27CKeMY6KVREJVjn8PY9WP23G6h77hKu4J5ZXSecj5iTAp
# cleos create account eosio user4 EOS8HyXtXUia42G1bFWxx9ThXx2YzQq5UeeXkYaPkQfMdSUy4aBgq EOS8HyXtXUia42G1bFWxx9ThXx2YzQq5UeeXkYaPkQfMdSUy4aBgq
# cleos create account eosio eosio.token EOS6LuHe5T9GcXP4ZbDND1z1yp6qU3uw84AhU6ohYUWExTmgBZEGW EOS6LuHe5T9GcXP4ZbDND1z1yp6qU3uw84AhU6ohYUWExTmgBZEGW

Step 2: Deploy eosio.token contract and create token.
# cleos set contract eosio.token /opt/eosio/bin/data-dir/contracts/eosio.token -p eosio.token@active
# cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS", 0, 0, 0]' -p eosio.token

Step 3: Issue token to users and get balance.
# cleos push action eosio.token issue '[ "user1", "1000000.0000 EOS", "memo" ]' -p eosio
# cleos push action eosio.token issue '[ "user2", "1000000.0000 EOS", "memo" ]' -p eosio
# cleos push action eosio.token issue '[ "user3", "1000000.0000 EOS", "memo" ]' -p eosio
# cleos push action eosio.token issue '[ "user4", "1000000.0000 EOS", "memo" ]' -p eosio
# cleos get  currency balance eosio.token user1 EOS

Step 4: Transfer token.
$ cleos push action eosio.token transfer '[ "user1", "user2", "10.0000 EOS", "m" ]' -p user1
# cleos get  currency balance eosio.token user1
# cleos get  currency balance eosio.token user2

```


