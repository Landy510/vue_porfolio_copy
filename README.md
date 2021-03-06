# vue_hw

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

**作業修改進度**
* 功能部分
	* 除此之外似乎安裝了 bootstrap-vue 但卻沒有使用？若確定沒有使用請移除。 -> ok，已經移除。 2021/02/27
	* fontawesome 的引入建議寫法。 -> ok! 2021/02/27
	* rules 建議可以放在 new Vue 之前。 -> ok! 2021/02/27
	* import 時建議補上副檔名，像是import Navbar from './Navbar.vue' -> ok! 2021/02/27
	* v-for 不要跟 v-if 併用 (已修改檔案: Home.vue, Lecture_Product.vue, SelfProduct.vue) -> ok! 2021/02/27
	* v-for 請補上 :key，例如：orderList.vue。 -> ok! 2021/02/27
	* SelfProduct.vue 的 169 行可以不用寫呼叫函式因為並沒有做其他特別的處理，因此可直接綁 getProduct 即可。 -> ok! 2021/02/27
	* 該頁面若沒有使用 jQuery 請移除「import $ from 'jquery';」 (已修改檔案: orderList.vue, SelfProduct.vue, CustomerCheckout.vue) -> ok! 2021/02/27
	* 單純的 button 並沒有預設行為，因此可以不用寫 .prevent。  -> ok! 2021/02/27
	* 單純的 button 按鈕請補上 type="button" 屬性。   -> ok! 2021/02/27
	* Products.vue 的 Status 建議可以改成 status 統一駝峰命名。  -> ok! 2021/02/27
	* router-link 可以直接寫內文不用再次撰寫 a 標籤。 -> ok! 2021/02/27
	* img 標籤建議盡可能去描述，而不是單純的「alt="Card image cap"」。 -> ok! 2021/02/27
	* 一個頁面只會有一個 h1 標籤。  -> ok! 2021/02/27
	* 有關陣列的filter功能改寫成比較簡短的形式。 -> ok! 2021/02/27
	* Home.vue 的 ReadWebSiteWidth 中的 if 判斷是似乎是想寫 if...else if? 在此可以考慮 switch。 -> ok! 已將那個函式刪掉了，用vue-carousel取代這個函式的swiper功能了。
	* Footer.vue 外層可以去除 div 直接 footer 即可。 -> ok! 2021/02/27
	* orderList.vue 的 th 概念類似 td 建議可以改成以下。 -> ok! 2021/02/27
	* 當宣告 const vm = this; 之後可以將 this 替換成 vm，例如： this.$http.get 改為 vm.$http.get 等。 -> ok! 2021/02/27
	* SCSS 請以縮排兩格為主 ，可參考這一篇建議規範文獻。 -> ok! 2021/02/27
	* 請統一 {{}} 寫法，不可一下子 {{item}} 一下子 {{ item }} (前後空白)，以助教的風格習慣是後者，因為在閱讀上較美觀，同學可以自己選擇哪一種 :D，這部分同學也可以參考官方文獻的建議寫法唷。  -> ok! 2021/03/01
	* 在此會建議萬用路由放在最後並且導回首頁而不是登入頁面，正常使用者並不需要登入的。 -> ok! 2021/03/01
	* Object.assign({}, item); 也可以嘗試修改成 {...item}; 唷。 -> ok! 2021/03/01
	* 沒有用途的 .vue 檔案請移除，例如：HelloWorld.vue 等。 -> ok! 2021/03/01
	* .vue 檔案會建議首字大寫。 -> ok! 2021/03/01
	* 可建立 frontend 及 backend 資料夾區分前後台，區分的好處在於方便自己將來的維護。 -> ok! 2021/03/01
	* 雙等號可改為三等號。 -> ok! 2021/03/01
	* 程式碼尾段多餘的空格請務必清除，若是使用 VSCode 可以點一下檢視>轉譯 or 顯示空白字元。 -> ok! 2021/03/01
	* 正常來講 assets 底下不會出現 all.css 與 all.css.map。 -> ok! (已經把all.min.css的檔案產出在helper資料夾中) 2021/03/01
	* console.log() 的程式碼內容刪除掉。 -> ok! 2021/03/01
	* 非必要註解可以斟酌刪除，否則 code 會顯得特別雜亂。 -> ok! 2021/03/01
	* 可多加美化 index.html 中的 meta，另外請多加注意 lang 要調整至相關語系，例如調整成 「zh-Hant-TW」，若是英語系網站則可以保留預設 「en」。 -> ok! 2021/03/01
	* 在此會建議加入購物車的行為使用 localStorage 來搭配製作。 -> ok! 2021/03/04
	* 安裝ESLint，並修正ESLint生產出來的錯誤。 -> ok! 2021/03/05
* 畫面部分
	* 整體
	* 網站的圖片可以再挑選的更統一一些，像重訓課程都偏深色背景的就會看起來一致性較高，如果更細心一點，建議是連圖片上有出現的色系都盡量統一 -> ok! 2021/03/05
	* 物件的圓角樣式建議統一（e.g. 圖片、按鈕） -> ok! 2021/03/05
	* 頁面內容不多時，建議 Footer 也要保持在瀏覽器的底部（e.g. Sticky Footer） -> ok! 2021/03/05
	* 有訂定了網頁標準色（e.g. 黃色），就要盡量只使用網頁標準色（結帳流程的問題比較多，其他地方也都要檢查），除了成功、失敗、或是特價等等特殊狀態以外，其他元件都應該只使用你訂定的網頁標準色為主，盡量不要直接使用預設的色彩
	* 字級有使用過小的問題，桌面版最小建議不要低於 14px  -> ok! 2021/03/05
	
	* 首頁
	* Banner 上的標題左右可以多一些空格讓白底不要直接貼邊 -> ok! 2021/03/05
	* 區塊之間的垂直間距可以大一些且保持一致  -> ok! 2021/03/05
	* 
	* Lecture 的部分，可以讓分類的 Tab 做得更明確一些，目前的有點難辨識現在選到哪一個分類  -> ok! 2021/03/05
	* 課程卡片的資訊排版在沒有原價時，會有點不平衡，這邊可以再調整一下 -> ok! 2021/03/05
	* 前往課程一覽的按鈕過寬也會看起來不像按鈕  -> ok! 2021/03/05
	* 加入購物車時出現的 Modal 內容過少且排版過於繁瑣 -> ok! 2021/03/05

	* 產品頁

	* 購物車
		* 因為你的購物車 icon 在右側，因此購物車的側欄從右側滑入會更符合使用者體驗。 -> OK! 2021/02/26

	* 結帳表單