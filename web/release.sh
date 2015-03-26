#!/bin/expect
# 这一行告诉操作系统脚本里的代码使用那一个shell来执行。这里的expect其实和linux下的bash、windows下的cmd是一类东西。
# 注意：这一行需要在脚本的第一行。

# 名称：Remote Add Proxy Site，^_^
# 说明：自动登上远程服务器后添加反向代理站点(配置内置)
# 注意：需要传递一个域名参数，脚本中的proxySiteAdd是远程服务器上的添加站点工具
# 用法：raps xxxx.com
# 2012-11-02 08:55:21

# 登录并执行命令
set timeout 30
# 设置超时时间 单位：秒
spawn ssh work@sh04.jesgoo.com
# spawn是进入expect环境后才可以执行的expect内部命令
# 如果没有装expect或者直接在默认的SHELL下执行是找不到spawn命令的。
# 它主要的功能是给ssh运行进程加个壳，用来传递交互指令。
expect "]$ "
# 这里的expect也是expect的一个内部命令。
# 判断上次输出结果里是否包含“]$ ”的字符串，如果有则立即返回，否则就等待一段时间后返回，等待时长就是前面设置的30秒
send "cd /home/work/UnionDashboard/web/web r"
# 执行交互动作，与手工输入命令等效。
# 命令字符串结尾别忘记加上“r”，如果出现异常等待的状态可以核查一下。
 interact
# 执行完成后保持交互状态，把控制权交给控制台，这个时候就可以手工操作了。如果没有这一句登录完成后会退出，而不是留在远程终端上。
# 如果你只是登录过去执行
#expect "]$ "
#send "git pull"
#expect "]$ "
#send "sh build.sh"
exit