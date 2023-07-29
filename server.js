/*const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))); // เรียกใช้ไฟล์ที่อยู่ในโฟลเดอร์ public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ตั้งค่าการเก็บไฟล์ภาพ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // กำหนดโฟลเดอร์ที่เก็บรูปภาพ
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // ใช้ชื่อเดียวกับชื่อเดิมของไฟล์
  }
});

const upload = multer({ storage: storage });

// สร้างเส้นทางสำหรับรับรูปภาพ
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'Upload successful' });
});


app.post('/upload', upload.single('image'), (req, res) => {
  // ทำอะไรกับรูปภาพที่อัปโหลดได้ที่ req.file
  // ในตัวอย่างนี้เราแค่เพิ่มลิ้งค์เพื่อดูรูปภาพที่อัปโหลด
  const imageUrl = req.file.path;
  res.send(`<a href="${imageUrl}">View Image</a>`);
});

// เปิดให้ Server ทำงานฟังที่พอร์ต 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/











/*const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))); // เรียกใช้ไฟล์ที่อยู่ในโฟลเดอร์ public

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/receiveNumber', (req, res) => {
  const receivedNumber = req.body.number;
  console.log(`Received number from Unity: ${receivedNumber}`);
  res.send('Number received successfully.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/







const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route สำหรับรับรูปภาพจาก Unity
app.post('/upload_image', (req, res) => {
  const imageBase64 = req.body.image; // รับรูปภาพจาก body ของ request
  const imageName = 'uploaded_image.png';

  // แปลงข้อมูลรูปภาพจาก base64 เป็น binary
  const imageBinary = Buffer.from(imageBase64, 'base64');

  // บันทึกรูปภาพลงในเครื่อง
  fs.writeFile(imageName, imageBinary, (err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการบันทึกรูปภาพ', err);
      res.status(500).send('เกิดข้อผิดพลาดในการบันทึกรูปภาพ');
    } else {
      console.log('บันทึกรูปภาพเรียบร้อยแล้ว');
      res.send('บันทึกรูปภาพเรียบร้อยแล้ว');
    }
  });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ Node.js กำลังทำงานที่ http://localhost:${port}`);
});