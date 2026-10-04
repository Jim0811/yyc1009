# 給歪歪西的生日網站

這是可直接放在 GitHub Pages 儲存庫根目錄的靜態網站。啟用 Pages 時，選擇 `main` 分支的 `/ (root)`。

照片與歌曲可以放到 `assets/`。在 `script.js` 中把回憶的 `photo: null` 改成相對路徑，例如 `photo: 'assets/memory-01.jpg'`；在 `index.html` 的 `birthdayAudio` 元素設定 `src="assets/our-song.mp3"`。提交更新後，GitHub Pages 會重新發布。

網站頁面本身可供任何知道網址的人開啟。`noindex` 標記只是向搜尋引擎提出不收錄的要求，並非密碼保護。
