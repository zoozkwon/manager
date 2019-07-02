$(document).ready(function() {
    $('#summernote').summernote({
        height: 230,
        minHeight: 100,
        maxHeight: 400,
        focus: false,
        lang: 'ko-KR',
        placeholder: '내용을 입력 해주세요.',
        callbacks: {
            onImageUpload : function(files, editor, welEditable) {
                sendFile(files[0], editor, welEditable);
            }
        }
    });
    function sendFile(file,editor,welEditable) {
        data = new FormData();
        data.append("file", file);
        $.ajax({
            url: "http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/MyApp-Group/upload.php", // image 저장 소스
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data){
                console.log(data);
                var image = $('<img>').attr('src', '' + data); // 에디터에 img 태그로 저장을 하기 위함
                console.log(image);
                $('#summernote').summernote("insertNode", image[0]); // summernote 에디터에 img 태그를 보여줌
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus+" "+errorThrown);
            }
        });
    }
    $('form').on('submit', function (e) {
        e.preventDefault();
    });
});