document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();  // ป้องกันการรีเฟรชหน้าเว็บเมื่อกด Submit

    const fileInput = document.getElementById('image');
    const statusMessage = document.getElementById('status');
    
    // ตรวจสอบว่าเลือกไฟล์หรือไม่
    if (fileInput.files.length === 0) {
        statusMessage.textContent = "Please choose an image before submitting.";
        statusMessage.style.color = "red";
        return;
    }

    // แสดงข้อความกำลังส่งคำขอ
    statusMessage.textContent = "Uploading image, please wait...";
    statusMessage.style.color = "blue";

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);  // เพิ่มไฟล์ที่ผู้ใช้เลือกไปใน formData

    for (let [key, value] of formData.entries()) {
        console.log(`Key: ${key}, Value:`, value);
    }
    
    // ส่งคำขอไปยัง API
    fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();  // แปลงผลลัพธ์ที่ได้เป็น blob (ไฟล์ภาพ)
    })
    .then(imageBlob => {
        // สร้าง URL สำหรับแสดงภาพ
        const imageObjectURL = URL.createObjectURL(imageBlob);
        // ตั้งค่าภาพที่แสดงในหน้าเว็บ
        document.getElementById('result').innerHTML = `<img src="${imageObjectURL}" alt="Prediction result">`;
        statusMessage.textContent = "Prediction complete.";
        statusMessage.style.color = "green";
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Failed to get prediction result.';
        statusMessage.textContent = 'An error occurred. Please try again.';
        statusMessage.style.color = "red";
    });
});
