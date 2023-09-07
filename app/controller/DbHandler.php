<?php
namespace app\controller;
use think\facade\Db;

class DbHandler{
  public function index()
  {
    $infoData = Db::table('pro_cert_info')->select();
    // $sendData = explode("</font>", json($infoData));

    // echo gettype($infoData);
    // echo 'hahahahhhhhhhhhhh';
    // return gettype($infoData);
    // return json($infoData);
    return $infoData;
  }

  public function getdata()
  {
    $zinfoData = Db::table('pro_cert_info')->select();
    return $zinfoData;
  }

}