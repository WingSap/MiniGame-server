----- Unity Project(GitHub Link) ----

https://github.com/WingSap/Interns-Game

----- Server (GitHub Link) ----

https://github.com/WingSap/MiniGame-server

----- ติดตั้ง node.js ก่อนเปิดเซิฟ -----

-ถ้าติดตั้งแล้วข้ามขั้นตอนนี้ได้เลย

----- วิธีเปิดเซิฟเวอร์ -----

(แนะนำให้ตั้ง IP ก่อน)
**** เข้าไปเล่นได้เฉพาะเครื่อข่าย Wifi ที่เหมือนกันเท่านั้นถ้าใช้ SPUWifi เครื่องที่เข้าไปเล่นก็ต้องต่อ SPUWifi เหมือนกัน ****

- เปิด server กดที่ StartServer.bat ได้เลยครับ
- Share Server URL จะเป็นลิ้งค์ที่ไว้เข้าเล่นในมือถือหรือ PC ได้ครับ

----- วิธีเช็ค IP -----

- เปิดหน้า command promt แล้วพิมคำสั่ง ipconfig
- หา IPv4 Address แล้วก็อปเลขที่ได้มาใส่ใน 
	- data.json 
	- และในโฟลเดอร์ ServerMiniGame\public\game1\ จะเจอ IP_Setting.json ใส่ในนี้ได้เลยครับ

----- เพื่มหรือเปลี่ยนรูป -----

**** เฉพาะของเกม 1 เท่านั้น ****

- ขนาดที่แนะนำ 512*362px (รูปแนวนอน)
- ServerMiniGame\public\ImageForGame1
- ตั้งชื่อรูปเป็นตัวเลข 1- 50 แล้วเอามาใส่ใน ImageForGame1 ได้เลยครับ


