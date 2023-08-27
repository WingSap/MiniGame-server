const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// อ่านไฟล์ JSON
const file = 'data.json';

// ใช้ fs.readFile ในการอ่านไฟล์ JSON
fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.error(`เกิดข้อผิดพลาดในการอ่านไฟล์ ${file}:`, err);
    return;
  }

  try {
    // แปลง JSON เป็นอ็อบเจ็กต์ JavaScript
    const jsonData = JSON.parse(data);

    // สร้าง URL โดยรวม hostname และ port จาก JSON
    const url = `http://${jsonData.IP}:${jsonData.port}`;

    // แสดง URL ใน console.log
    console.log('Share Server URL:', url);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการแปลง JSON:', error);
  }
});

app.use(express.static("public"));

app.get("/game1", (req, res) => {
    // ทำสิ่งที่ต้องการกับ API ของ Game 1
    res.send("You are in Game 1!");
});

///// ปิดไว้รอเพื่มเกมในอนาคต /////
/*app.get("/game2", (req, res) => {
    // ทำสิ่งที่ต้องการกับ API ของ Game 2
    res.send("You are in Game 2!");
});

app.get("/game3", (req, res) => {
    // ทำสิ่งที่ต้องการกับ API ของ Game 3
    res.send("You are in Game 3!");
});*/

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
  // ตรวจสอบว่ามีรูปภาพที่อัปโหลดมาหรือไม่
  if (!req.file) {
    console.log('No image uploaded');
    return res.status(400).json({ message: 'No image uploaded' });
  }
  else {
    console.log('Upload image successful');
    res.json({ message: 'Upload image successful' });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server node.js is running at http://localhost:${port}`);
});