<?php
    mb_language("uni");
    mb_internal_encoding("utf-8"); //内部文字コードを変更
    mb_http_input("auto");
    mb_http_output("utf-8");

    try {
        $db = new PDO('mysql:dbname=coten_listner;host=localhost;', 'root','root');
    } catch (PDOException $e) {
        echo 'DB接続エラー！: ' . $e->getMessage();
        exit;
    }
    $sth = $db->prepare("SELECT * FROM tb_coten_radio");
    $sth->execute();

    $program_data = array();

    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
        $program_data[]=array(
            'id'=>$row['id'],
            'num'=>$row['num'],
            'title'=>$row['title'],
            'point'=>$row['point'],
            'apple_podcast_url'=>$row['apple_podcast_url'],
            'google_podcast_url'=>$row['google_podcast_url'],
            'youtube_url'=>$row['youtube_url'],
            'theme_id'=>$row['theme_id'],
            'delivery_date'=>$row['delivery_date']
        );
    }

    //jsonとして出力
    header('Content-type: application/json');
    echo json_encode($program_data, JSON_UNESCAPED_UNICODE);
        
?>
