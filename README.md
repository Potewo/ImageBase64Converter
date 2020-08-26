<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
# MarkdownImageBase64Converter
jpegやpngでの画像をbase64に変換してMarkdownファイルに挿入するプログラムです。
素のHTMLとJavascriptのみで作られているのでどんな環境でも実行することができます。
自動で最大700pxにリサイズされます。
もとの画像の長い方の辺が700pxになり、短い方の辺はもとの画像のアスペクト比に応じて変化します。
## 使い方
1. <i class="material-icons">insert_drive_file</i>ボタンからMarkdownファイルを読み込みます。
1. 二番目のボタンから挿入したい画像を選択します。
1. テキストエリアの中で画像を挿入したい部分をクリックします。
1. 挿入ボタンをクリックして画像を挿入します。
1. ダウンロードボタンを押してできたファイルをダウンロードします。
