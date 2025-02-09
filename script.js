document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();  // หยุดการส่งฟอร์มแบบปกติ

    // ดึงไฟล์รูปภาพจากฟอร์ม
    const formData = new FormData();
    const fileInput = document.getElementById('image-upload');
    formData.append('image', fileInput.files[0]);

    // ส่งคำขอไปยัง API
    fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // แสดงผลลัพธ์ที่ได้รับจาก API
        document.getElementById('result').innerHTML = 'ผลลัพธ์: ' + data.result;
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
    });
});