const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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