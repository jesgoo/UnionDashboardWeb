
## 项目结构及编译环境
### 项目结构

* `asset` 公共依赖库
* `deploy` 项目构建工具
* `union` [联盟]项目文件夹
* `node_modules` node依赖库，主要服务于grunt
* `package.json`
* `Gruntfile.js` node-grunt编译脚本
* `README.md` 模块简介，部署依赖说明
* `output` 编译结果
* `build.xml` ant编译脚本
* `build.sh` 编译打包

### 开发环境

#### ant
安装ant就可以执行编译。
$ sh build.sh

我们希望逐步淘汰ant，暂且用着。

下载[ant](http://apache.dataguru.cn//ant/binaries/apache-ant-1.8.4-bin.zip)解压到无空格、中文等奇怪字符的路径下，将{ant.install}/bin设置到os path

#### node

到这里[下载](http://nodejs.org/download/)

#### grunt

使用得比较越广泛的node deploy package，安装成命令行工具

    $ npm install -g grunt-cli

原本是 $ npm install -g grunt

如果之前安装过grunt，则请

    $ npm uninstall -g grunt

再执行上面的安装操作

然后checkout项目，package.json已有，执行

    $ npm install

即本地添加node_modules文件夹

## /deploy/er-sync

### 参考文档

* [ER (Enterprise RIA) 框架手册](https://github.com/ecomfe/er)
* [ESUI 框架手册](https://github.com/ecomfe/esui)

### er-sync

根据er的项目结构写的一个工具，功能有：

0. 实现项目结构同步：
    * 开发初期根据站点地图（sitemap.js）生成整个站点的项目结构
    * 开发过程中更新项目结构
0. [数据接口文档][data]同步：实现从mock data（调试数据）中生成《[数据接口文档][data]》，彻底消除手工维护文档的消耗

我们已经在grunt建了一个sync task，如要sync demo，请确保demo根目录下含有sitemap.js这个文件

    $ grunt sync:demo

#### sitemap.js

    :::javascript
    /**
     * 定义站点地图
     */
    mf = typeof mf === 'undefined' ? {} : mf;

    mf.MAP = {
        "index":{//Page
            "login":{//Module
                "login":{} //Action, 此处空对象留作扩展
            },
            "help":{//Module
                "about":{},
                "qa":{}
            }
        },
        "main":{//Page
            "group":{//Module
                "list":{}, //Action
                "detail":{}
            },
            "user":{//Module
                "list":{}
            },
            "__nav1":{//配置1级菜单(以下简称nav1）
                "group":{//nav1 id
                    "label":"项目小组",
                    "url":"#/group/list" //默认url,触发nav2
                },
                "user":{//nav1 id
                    "label":"小组成员",
                    "url":"#/user/list"
                },
                "baidu":{
                    "label":"百度外链",
                    "url":"http://www.baidu.com"
                }
            },
            "__nav2":{//nav2
                "/group/list":{//nav2 id
                    "nav1":"group", //nav1 id
                    "label":"GroupList",
                    "list":[
                        {"nav2":"/group/list"},
                        {"nav2":"/group/add"}
                    ]
                },
                "/group/detail":{//nav2 id
                    "nav1":"group", //nav1 id
                    "label":"GroupDetail",
                    "list":[
                        {"nav2":"/group/list", "parent":1},
                        {"nav2":"/group/detail"}
                    ]
                },
                "/user/list":{//nav2 id
                    "nav1":"user", //nav1 id
                    "label":"UserList",
                    "list":[
                        {"nav2":"/user/list"},
                        {"nav2":"/user/add"}
                    ]
                }
            }
        }
    };

    /**
     * 该文件同时被node读取，生成站点文件（/src/**）
     */
    if (typeof exports !== 'undefined') {
        exports.MAP = mf.MAP;
    }

#### Mock data & 数据接口文档
我们是如何实现mock data中生成接口文档的呢？

浏览器环境下和er-sync生成文档，这两个过程使用同一个数据源可以解决这个问题。

##### mock data文件

`/data/group/list.js`

    :::javascript
    /**
     * 兼容node和browser环境
     */
    if (typeof exports === 'undefined') {
        exports = {};
    }

    exports.request = {
        "page":0, //不传时请默认为0, 所有字段不传递时后端按默认值处理
        "orderBy":"id",
        "order":"asc",
        "from":"2012-01-01",
        "to":"2012-01-01",
        "team":"Mobads",
        "keyword":"中文关键字"
    };

    exports.response = {
        "success":true, //成功
        "model":{
            "team":"Mobads团队",
            "teams":[
            //{1.6}信息
            //{2.0}附加信息
                {name:'Mobads', value:0},
                {name:'Other Team1', value:1},
                {name:'Other Team2', value:2},
                {name:'Other Team3', value:3}
            ],
            "list":{//列表信息
                "page":0, //页码
                "pageSize":3,
                "totalSize":6,
                "orderBy":"id",
                "order":"asc",
                "data":[
                    {//单行记录
                        "id":1,
                        "name":"客户端"
                    },
                    {
                        "id":2,
                        "name":"业务端"
                    },
                    {
                        "id":3,
                        "name":"检索端"
                    }
                ]
            }
        }
    };

##### 生成的文档

Request

`/group/list.json?page=0&orderBy=id&order=asc&from=2012-01-01&to=2012-01-01&team=Mobads&keyword=%E4%B8%AD%E6%96%87%E5%85%B3%E9%94%AE%E5%AD%97`

    :::javascript
    {
        "page":0, //不传时请默认为0, 所有字段不传递时后端按默认值处理
        "orderBy":"id",
        "order":"asc",
        "from":"2012-01-01",
        "to":"2012-01-01",
        "team":"Mobads",
        "keyword":"中文关键字"
    }

Response

    :::javascript
    {
        "success":true, //成功
        "model":{
            "team":"Mobads团队",
            "teams":[
                {name:'Mobads', value:0},
                {name:'Other Team1', value:1},
                {name:'Other Team2', value:2},
                {name:'Other Team3', value:3}
            ],
            "list":{//列表信息
                "page":0, //页码
                "pageSize":3,
                "totalSize":6,
                "orderBy":"id",
                "order":"asc",
                "data":[
                    {//单行记录
                        "id":1,
                        "name":"客户端"
                    },
                    {
                        "id":2,
                        "name":"业务端"
                    },
                    {
                        "id":3,
                        "name":"检索端"
                    }
                ]
            }
        }
    }