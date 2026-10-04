# 給歪歪西的生日網站

這是可直接放在 GitHub Pages 儲存庫根目錄的靜態網站。啟用 Pages 時，選擇 `main` 分支的 `/ (root)`。

照片可以放到 `assets/`。在 `script.js` 中把回憶的 `photo: null` 改成相對路徑，例如 `photo: 'assets/memory-01.jpg'`。提交更新後，GitHub Pages 會重新發布。

自彈自唱原始檔 `VID_20261003_204308.mp4` 保留在本機，不會加入 Git。網站使用從它製作的 `assets/yyc-song.m4a` 作為背景音樂，並在最後一頁循環播放 `assets/yyc-song.mp4`。

網站頁面本身可供任何知道網址的人開啟。`noindex` 標記只是向搜尋引擎提出不收錄的要求，並非密碼保護。
