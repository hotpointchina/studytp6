


![](https://www.thinkphp.cn/uploads/images/20230630/300c856765af4d8ae758c503185f8739.png)

ThinkPHP 8.0
===============

`ThinkPHP` 是一个免费开源的，快速、简单的面向对象的轻量级PHP开发框架，是为了敏捷WEB应用开发和简化企业应用开发而诞生的。`ThinkPHP` 诞生十七年来一直秉承简洁实用的设计原则，在保持出色的性能和至简代码的同时，更注重易用性。遵循`Apache2`开源许可协议发布，意味着你可以免费使用`ThinkPHP` ，甚至允许把你基于`ThinkPHP` 开发的应用开源或商业产品发布/销售。


## 特性

* 基于PHP`8.0+`重构
* 升级`PSR`依赖
* 依赖`think-orm`3.0版本
* `6.0`/`6.1`无缝升级


> ThinkPHP8.0的运行环境要求PHP8.0.0+



## 文档

[完全开发手册](https://doc.thinkphp.cn)

## 服务

ThinkPHP生态服务由[顶想云](https://www.topthink.com)（TOPThink Cloud）提供，为生态提供专业的开发者服务和价值之选。


## 安装

~~~
composer create-project topthink/think studytp6
~~~

启动服务

~~~
cd studytp6
php think run
~~~

然后就可以在浏览器中访问

~~~
http://localhost:8000
~~~

如果需要更新框架使用
~~~
composer update topthink/framework
~~~

## 命名规范

`ThinkPHP`遵循PSR-2命名规范和PSR-4自动加载规范。



<br /><hr /><br />


# 项目简介
- 一个增删改查的 ThinkPHP 的练习
- 技术栈
  + PHP 8.0.26
  + ThinkPHP 6
  + Vue 3x
  + ElementPlus

## ThinkPHP 官网     
- https://www.thinkphp.cn/     

## 环境准备  
### 一、安装 wampServer （安装）  
- 安装地址也是未来项目地址的父级   

> wampServe 官网   
- https://www.wampserver.com/en/ 
- 下载 x64 版本   
- 一路下一步即可

### 二、配置环境变量   
1、左键点击（任务栏-时钟左边） `wampServer` 图标，依次选择：PHP->版本。查看打绿勾的那个；
- `wampServer` 为绿色时，代表服务启动正常。    

2、windows 资源管理器里，进入到 [ wamp64\bin\php\对应的版本号 ]，将路径进行复制       

3、打开：

```html
  控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 环境变量 
    -> 系统变量 -> 选中 `Path` -> 新建 -> 将上一步复制好的路径黏贴进去
    -> 一路 【确定】 回去  
```
4、`cmd` 控制台中查看 php 环境变量及 php 是否安装成功   

```bash
php -v
```


### 三、创建项目   

1、安装 `Composer`     
- https://doc.thinkphp.cn/v8_0/setup.html 
- 一路下一步即可   

2、 控制台 cd 到 wamp 的 www 目录下

3、输入：

```bash
composer create-project topthink/think 项目名
```


## 安装的依赖库

### composer 模版引擎   

```bash
composer require topthink/think-view
```


## 数据库

> 数据库和模型操作采用独立的 ThinkORM 库，默认安装应用的时候会自动安装，如果你不需要使用该<b style="color:#cf0101">ORM</b>库的话，可以单独卸载 <b style="color:#cf0101">topthink/think-orm</b> 后安装其它的<b style="color:#cf0101">ORM</b>库。

- 基于PDO和PHP强类型实现
- 支持原生查询和查询构造器
- 自动参数绑定和预查询
- 简洁易用的查询功能
- 强大灵活的模型用法
- 支持预载入关联查询和延迟关联查询
- 支持多数据库及动态切换
- 支持 `MongoDb`
- 支持分布式及事务
- 支持断点重连
- 支持 `JSON` 查询
- 支持数据库日志
- 支持 `PSR-16` 缓存及 `PSR-3` 日志规范

> 配置文件
- 在全局或者应用配置目录（不清楚配置目录位置的话参考配置章节）下面的database.php中（后面统称为数据库配置文件）配置下面的数据库参数：

```php
// config\database.php
<?php

return [
    // 默认使用的数据库连接配置
    'default'         => env('DB_DRIVER', 'mysql'),

    // 自定义时间查询规则
    'time_query_rule' => [],

    // 自动写入时间戳字段
    // true为自动识别类型 false关闭
    // 字符串则明确指定时间字段类型 支持 int timestamp datetime date
    'auto_timestamp'  => true,

    // 时间字段取出后的默认时间格式
    'datetime_format' => 'Y-m-d H:i:s',

    // 时间字段配置 配置格式：create_time,update_time
    'datetime_field'  => '',

    // 数据库连接配置信息
    'connections'     => [
        'mysql' => [
            // 数据库类型
            'type'            => env('DB_TYPE', 'mysql'),
            // 服务器地址
            'hostname'        => env('DB_HOST', '110.110.0.1'),
            // 数据库名
            'database'        => env('DB_NAME', 'hello'),
            // 用户名
            'username'        => env('DB_USER', 'root'),
            // 密码
            'password'        => env('DB_PASS', 'root'),
            // 端口
            'hostport'        => env('DB_PORT', '3306'),
            // 数据库连接参数
            'params'          => [],
            // 数据库编码默认采用utf8
            'charset'         => env('DB_CHARSET', 'utf8'),
            // 数据库表前缀
            'prefix'          => env('DB_PREFIX', 'gy_'),

            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy'          => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate'     => false,
            // 读写分离后 主服务器数量
            'master_num'      => 1,
            // 指定从服务器序号
            'slave_no'        => '',
            // 是否严格检查字段是否存在
            'fields_strict'   => true,
            // 是否需要断线重连
            'break_reconnect' => false,
            // 监听SQL
            'trigger_sql'     => env('APP_DEBUG', true),
            // 开启字段缓存
            'fields_cache'    => false,
        ],

        // 更多的数据库配置信息
    ],
];

```


## 路由配置    
> route\app.php

```php
<?php
use think\facade\Route;

Route::get('think', function () {
  return 'hello,ThinkPHP6!';
});

Route::get('hello/:name', 'index/hello');
```




