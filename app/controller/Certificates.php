<?php

namespace app\controller;
use think\facade\View;
use think\facade\Db;
use think\facade\Request;

class Certificates
{
  public function index()
  {  
    
    View::assign([
      'type'    => '综合柜员',
      
    ]);
    
    return view('index');
    // return View::fetch('index');
  }

  public function getList()
  {
  
    $queryData = Request::post();

    // $page = Request::param('page', 1);
    $page = $queryData['current'];
    // 证书名称
    $certificateName = $queryData['certificateName'] ? $queryData['certificateName'] : '';



    // 每页显示的数据条数
    $pageSize = $queryData['pageSize'] ? $queryData['pageSize'] : 10;

    // 查询数据总数量
    $totalCount = Db::table('pro_cert_info')->count();

    // 计算总页数
    $totalPage = ceil($totalCount / $pageSize);
    
    // 计算偏移量
    $offset = ($page - 1) * $pageSize;
    

    // 查询数据并按时间降序排列
    // $data = Db::table('pro_cert_info')
    //     ->order('create_time', 'desc')
    //     ->limit($offset, $pageSize)
    //     ->select();

    // return $data;
    if( $certificateName !== '' ){
      $data = Db::table('pro_cert_info')
        ->where('certificate_name', $certificateName)
        ->order('create_time', 'desc')
        ->limit($offset, $pageSize)
        ->select();
      $totalCount = count($data);
    }else{
      $data = Db::table('pro_cert_info')
        ->order('create_time', 'desc')
        ->limit($offset, $pageSize)
        ->select();
    }

    $dataLength = count($data);



    // 返回数据
    $responseData = [
      'data' => $data,
      'currentPage' => $page,
      'pageSize' => $pageSize,
      'totalPage' => $totalPage,
      'total' => $totalCount,

      // test
      'queryData'  => $queryData,
      'certificateName'  => $certificateName,
      'dataLength'  => $dataLength,
      // 'queryDataType'  => gettype($queryData),
      // 'queryDataCurrent'  => $queryData['current'],
    ];
    return $responseData;
    
  }
  

  
  function add()
  {
    $requestData = Request::post();
    
    $certificateName = $requestData['certificateName'];
    $createName = $requestData['createName'];
    $createTime = $requestData['createTime'];


    $data = [
      'create_name' => $createName, 
      'certificate_name' => $certificateName,
      'create_time' => $createTime, 
    ];

    // 插入数据
    $result = Db::table('pro_cert_info')->save($data);

    if ($result) {
      return [
        'code' => '1',
        'msg' => '添加成功',
        // 'requestData' => $requestData
      ];
    } else {
      return [
        'code' => '0',
        'msg' => '添加失败',
        // 'requestData' => $requestData
      ];
    }

  }



  public function singleDelete()
  {
    // 获取前端POST请求的参数
    $requestData = Request::post();
    $lineId = $requestData['lineId'];
    

    $result = Db::table('pro_cert_info')->where('line_id', $lineId)->delete();

    if ($result) {
      return [
        'code' => '1',
        'msg' => '删除成功',
        'requestData' => $requestData
      ];
    } else {
      return [
        'code' => '0',
        'msg' => '删除失败',
        'requestData' => $requestData
      ];
    }

  }




}
