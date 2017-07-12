#### 说明
移动端弹窗dialog(loading, alert, confirm, toast), 基于原生,es6.

#### 效果图
<img src="http://or63xuhc6.bkt.clouddn.com/dialog-img.png" width="200" />

#### 使用
```
<link rel="stylesheet" href="css/dialog.css">
<script src="src/dialog.js"></script>
// 基本使用
let dialog = new Dialog({
    content: '3秒后关闭',
    delay: 3000
})

// 显示loading
let dialog = new Dialog()

// 仅仅显示一个提示
let dialog = new Dialog('提示')

// 手动关闭
dialog.remove()
```

#### 参数
| 选项            | 类型    |  默认值  |  说明  |
| :--------       | :-----  | :----    | :----  |
| content         | string  | loading图标  | 内容 |
| type         | string  | null  | success,error |
|title        | string  | null | 标题|
|showMask         | bool  | falae | 显示遮罩层|
|delay        | number  | null | 设置延时关闭时间|
|showCancel           | bool  | null | 是否显示取消键|
|delayCallback        | fn  | null | 延时关闭回调|
|confirmCallback          | fn  | null | 确认按钮回调|
