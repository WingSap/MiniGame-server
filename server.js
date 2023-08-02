const express = require('express');
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
});