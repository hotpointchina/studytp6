<?php
use think\facade\Route;

// Route::get('think', function () {
//     return 'hello,ThinkPHP6!';
// });

Route::get('index', 'info/index');
Route::get('infoData', 'DbHandler/index');

// 证书管理 - 首页
Route::get('certificatesManage', 'Certificates/index');
// 证书管理 - 获取列表
Route::post('certificatesList', 'Certificates/getList');
// 证书管理 - 新增
Route::post('certificatesAdd', 'Certificates/add');
// 证书管理 - 删除
Route::post('certificatesSingleDelete', 'Certificates/singleDelete');

