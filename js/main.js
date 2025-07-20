'use strict';
{
  const url_string = window.location.href;
  const url_obj = new URL(url_string);
  const params = url_obj.searchParams;
  let cvBackGround = '#' + params.get('back');
  let cvForeGround = '#' + params.get('fore');
  if (cvBackGround==='#null' || cvForeGround==='#null'){
    cvBackGround = '#aaa';  // 背景色
    cvForeGround = '#222';  // 文字色
  }
  function InitScreen(){
    // 画面背景初期化
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(canvas.width,0);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.lineTo(0,canvas.height);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvBackGround;
    ctx.fill();
  }
  function DelStr2(strLen,ix,iy) {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // 文字列削除処理（一括）
     ctx.beginPath();
     ctx.moveTo(ix-1,iy);
     ctx.lineTo(ix-1+(strLen)*55, iy);
     ctx.lineTo(ix+(strLen)*55-8, iy+75);
     ctx.lineTo(ix-8, iy+74);
     ctx.lineTo.closePath;
     ctx.fillStyle = cvBackGround;
     ctx.fill();
     ctx.beginPath();
     ctx.moveTo(ix-19,iy+64);
     ctx.lineTo(ix-8, iy+64);
     ctx.lineTo(ix-8, iy+74);
     ctx.lineTo(ix-19, iy+74);
     ctx.lineTo.closePath;
     ctx.fillStyle = cvBackGround;
     ctx.fill();
  }

  function putStr2(tgtStr,ix,iy) {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // 文字列削除処理（一括）
    //  ctx.beginPath();
    //  ctx.moveTo(ix,iy);
    //  ctx.lineTo(ix+(tgtStr.length)*55, iy);
    //  ctx.lineTo(ix+(tgtStr.length)*55-7, iy+75);
    //  ctx.lineTo(ix-7, iy+75);
    //  ctx.lineTo.closePath;
    //  ctx.fillStyle = cvBackGround;
    //  ctx.fill();

    // 文字列描画処理
    for (let cnt=0;cnt<tgtStr.length;cnt++){
      //console.log(cnt,tgtStr[cnt]);
      if (tgtStr[cnt]===':'){
        putChar_2D(ctx, ix + cnt * 55, iy);
      }
      if (tgtStr[cnt]==='.'){
        putChar_2E(ctx, ix + cnt * 55, iy);
      }
      if (tgtStr[cnt]==='-'){
        putChar_3A(ctx, ix + cnt * 55, iy);
      } 
      if (tgtStr[cnt]==='E'){
        putChar_45(ctx, ix + cnt * 55, iy);
      } 
      if (tgtStr[cnt]==='o'){
        putChar_6F(ctx, ix + cnt * 55, iy);
      } 
      if (tgtStr[cnt]==='r'){
        putChar_72(ctx, ix + cnt * 55, iy);
      } 
      if (tgtStr[cnt]==='^'){
        putChar_5E(ctx, ix + cnt * 55, iy);
      }
      if (tgtStr[cnt]>='0' && tgtStr[cnt]<='9'){
        let tgtNum = tgtStr.charCodeAt(cnt) - 0x30;
        //console.log(cnt,tgtStr[cnt],tgtNum);
        putNum(ctx, tgtNum, ix + cnt * 55, iy);
      }
    }
  } // end of function putStr2

  // Colonの描画
  function putChar_2D(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x+14,y+16);
    ctx.lineTo(x+24,y+16);
    ctx.lineTo(x+23,y+26);
    ctx.lineTo(x+13,y+26);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvForeGround;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+11,y+48);
    ctx.lineTo(x+21,y+48);
    ctx.lineTo(x+20,y+58);
    ctx.lineTo(x+10,y+58);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvForeGround;
    ctx.fill();
  }
  // Dotの描画
  function putChar_2E(ctx, x, y) {
    ctx.beginPath();
    //ctx.moveTo(x-5,y+64);
    //ctx.lineTo(x+5,y+64);
    //ctx.lineTo(x+4,y+74);
    //ctx.lineTo(x-6,y+74);
    ctx.moveTo(x-18,y+64);
    ctx.lineTo(x-8,y+64);
    ctx.lineTo(x-9,y+74);
    ctx.lineTo(x-19,y+74);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvForeGround;
    ctx.fill();
  }
    // マイナスの描画
  function putChar_3A(ctx, x, y) {
    drawHSeg(ctx,x+2,y+37);
  }
    // アンダースコアの描画(^で代用)
  function putChar_5E(ctx, x, y) {
    drawHSeg(ctx,x-1,y+69);
  }
    // Eの描画(E)
  function putChar_45(ctx, x, y) {
    var BitSeg= 0x6d;
    drawNum(ctx,BitSeg,x,y);
  }
    // oの描画(o)
  function putChar_6F(ctx, x, y) {
    var BitSeg= 0x0f;
    drawNum(ctx,BitSeg,x,y);
  }
    // rの描画(r)
  function putChar_72(ctx, x, y) {
    var BitSeg= 0x0c;
    drawNum(ctx,BitSeg,x,y);
  }
  function putNum(ctx, Num, x, y){
    // 0～9描画時、各セグメントのON/OFF情報をビットに置き換えた配列
    var BitSegs = [0x77, 0x12, 0x5d, 0x5b, 0x3a, 0x6b, 0x6f, 0x72, 0x7f, 0x7b];
    //console.log('Num : BitSeg',Num,BitSegs[Num]);
    drawNum( ctx, BitSegs[Num],x,y);
  }
  
  function drawNum(ctx, bitInfo,ix,iy){
    var BitChk = [0x00, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01];
    var SegOffsetX = [null, 5, 4, 36, 2, 1, 33, -1];
    var SegOffsetY = [null, 5, 6, 6, 37, 38, 38, 69];
    // for(let i=0; i<8; i++){
    //   console.log(' Segment',bitInfo,i,(bitInfo & BitChk[i])!=0 );
    // }
    //セグメント１作成
    if (bitInfo & BitChk[1]){
      drawHSeg(ctx,ix+SegOffsetX[1],iy+SegOffsetY[1]);
    }
    //セグメント２作成
    if (bitInfo & BitChk[2]){
      drawVSeg(ctx,ix+SegOffsetX[2],iy+SegOffsetY[2]);
    } 
    //セグメント３作成
    if (bitInfo & BitChk[3]){
      drawVSeg(ctx,ix+SegOffsetX[3],iy+SegOffsetY[3]);
    } 
    //セグメント４作成
    if (bitInfo & BitChk[4]){
      drawHSeg(ctx,ix+SegOffsetX[4],iy+SegOffsetY[4]);
    } 
    //セグメント５作成
    if (bitInfo & BitChk[5]){
      drawVSeg(ctx,ix+SegOffsetX[5],iy+SegOffsetY[5]);
    } 
    //セグメント６作成
    if (bitInfo & BitChk[6]){
      drawVSeg(ctx,ix+SegOffsetX[6],iy+SegOffsetY[6]);
    } 
    //セグメント７作成
    if (bitInfo & BitChk[7]){
      drawHSeg(ctx,ix+SegOffsetX[7],iy+SegOffsetY[7]);
    }
  }

  function drawHSeg(ctx,ix,iy) {
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.lineTo(ix+5,iy-5);
    ctx.lineTo(ix+25,iy-5);
    ctx.lineTo(ix+30,iy);
    ctx.lineTo(ix+25,iy+5);
    ctx.lineTo(ix+5,iy+5);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvForeGround;
    ctx.fill();
  } 
  function drawVSeg(ctx,ix,iy) {
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.lineTo(ix+5,iy+5);
    ctx.lineTo(ix+3,iy+24);
    ctx.lineTo(ix-2,iy+29);
    ctx.lineTo(ix-7,iy+25);
    ctx.lineTo(ix-5,iy+5);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvForeGround;
    ctx.fill();
  } 
  
  var scrnMode = 0;
  var strBuff = ''; // 入力文字列バッファ
  var numLen = 0;   // 桁数(.除く)
  var dotpos = -1;  // .位置
  var Value_1 = 0;  // 引数１
  var Value_2 = 0;        // 引数２
  var oprFlg = 0;         // 演算子フラグ（なし、加、減、乗、除）
  var oprFlgNew = 0; // セッション内演算子入力の有無
  
  function setBuff(){
      var strBuff_1 = '';
      if (strBuff.length === 0) {
        strBuff = '0';
      }
      if (dotpos >=0){
        strBuff_1= strBuff.substring(0,dotpos) + '.' + strBuff.substring(dotpos,strBuff.length);
      }else{
        strBuff_1 = strBuff + '.';
      }  
      if (scrnMode <= 2) {
        Value_1 = parseFloat(strBuff_1); // 引数１に設定
        let errFlg = ChkRange(Value_1); // 数値の範囲チェック
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return(errFlg);
        }
      }else{
        Value_2 = parseFloat(strBuff_1); // 引数２に設定
        let errFlg = ChkRange(Value_1); // 数値の範囲チェック
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return(errFlg);
        }
      }
      showVal();
      return(0); // 正常終了  
  }

  function showVal(){
    var val_0 = 0;
    if (scrnMode <= 2) {
      val_0 = Value_1; // 表示対象：引数１
    } else {
      val_0 = Value_2;  // 表示対象：引数２
    }
    showValue(val_0); // 数値表示
  }
  function showValue(val_x) {
    // 事前処理：小数点10桁未満の端数はあらかじめ切り捨てる
    val_x = Math.round(val_x * 1e10) / 1e10;

    var Ceiling = 10; // 表示桁の下限
    //var maxLen; // 必要桁数
    let allLen = val_x.toString().length; // 全桁数
    var intUnder; // 丸目桁数（小数点以下）
    let dotpos_1 = val_x.toString().indexOf('.'); // 小数点位置
    if (dotpos_1<0) { // 小数点がない場合は1の位で丸める
      intUnder =0;
    } else {
      intUnder = allLen - dotpos_1 -1;
    }
    let intLen = parseInt(val_x).toString().length; // 整数部桁数
    console.log ('int_val_x',parseInt(val_x),'int_val_x.toString()',parseInt(val_x).toString());
    if (val_x < 0 &&  val_x > -1) { // 整数部が-0の場合
     Ceiling = Ceiling - intLen - 1;      
    } else {
      Ceiling = Ceiling - intLen;
    }
    if (intUnder > Ceiling) { // 丸め桁を表示桁数の下限に設定
      intUnder = Ceiling; 
    }
    // if (allLen !== intLen) { // 小数点付きの場合
    //     allLen = allLen -1;
    //   if (val_x < 1 && val_x > -1) { // 整数部が0のみの場合
    //     Ceiling = Ceiling -1;    
    //     allLen = allLen -1; 
    //   }
    // }
    // if (val_x < 0){ // 符号付きの場合
    //     Ceiling = Ceiling -1;    
    //     allLen = allLen -1;
    //     // intLen = intLen -1;
    // }
    // if (allLen > Ceiling) {
    //     maxLen = Ceiling; 
    // } else {
    //     maxLen = allLen; // 必要桁数
    // }
    // let intUnder = maxLen - intLen;
    val_x = Math.round(val_x * Math.pow(10,intUnder))/Math.pow(10,intUnder); 
    console.log ('val_x',val_x,'val_x.toString()',val_x.toString(),'丸め桁',intUnder);

    let valStr_0 = val_x.toString();  // 数値を文字に変換
    let valStr_1 = valStr_0.replace('.',''); // 小数点なし
    let dotStr = '';
    const charSpc = ' ';
    dotpos= valStr_0.indexOf('.');
      if (dotpos>0) {
            dotStr = charSpc.repeat(dotpos)+'.';
      }else {
          dotStr = charSpc.repeat(valStr_0.length)+'.';
      }
      DelStr2(10,25,50);  // 10桁表示を削除
      putStr2(dotStr,25,50);
      putStr2(valStr_1,25,50);
  }
  function showStr(Str_0){
    console.log('strBuff',Str_0);
    DelStr2(10,25,50);  // 10桁表示を削除
    const charSpc = ' ';  // 半角スペース
    if (dotpos>=0) {
      let dotStr= charSpc.repeat(dotpos)+'.';
      putStr2(dotStr,25,50);
    }
    if ((scrnMode === 1 || scrnMode === 3) &&(numLen<10)){  
      putStr2(Str_0 + '^',25,50); // 末尾にアンダースコアを付加
    }else{
      putStr2(Str_0,25,50);  
    }
  }
 
  function showError(num_0){
    DelStr2(10,25,50);  // 10桁表示を削除
    let ErrString = 'Error'+String(num_0).padStart(2,'0'); // エラーコードを2桁表示に 
    putStr2(ErrString,25,50); 
  }
  function InitBuff() { // 入力文字列バッファ初期化
      strBuff = '';
      numLen = 0;
      dotpos = -1;
  }
  function InitAll() { // 全ての変数を初期化
    InitBuff();
    oprFlg=0;
    Value_1 =0;
    Value_2 =0;
  }

  function calcVal() { // 演算子フラグに応じて演算を行う
      if (oprFlg === 1){
          Value_1 = Value_1 + Value_2; // 加算
      }else if(oprFlg===2){
          Value_1 = Value_1 - Value_2; // 減算
      }else if (oprFlg===3){
          Value_1 = Value_1 * Value_2; // 乗算
      }else if (oprFlg===4){
          if(Value_2 !==0){
            Value_1 = Value_1 / Value_2; // 除算
          }else {
            return(11); // エラー
          }
      }
      let errFlg = ChkRange(Value_1); // 数値の範囲チェック
      return(errFlg); //演算成功ならば0
  }
  function ChkRange(Val_0) { // 数値の範囲チェック
    if (Val_0 <= -1e+9 || Val_0 >= 1e+10) {
      return(1); 
    }
    if (Val_0 !== 0 && Val_0 < 1e-9 && Val_0 > -1e-8) {
      return(2);
    }
    if ((Val_0.toString().indexOf('e') >= 0) || (Val_0.toString().indexOf('E') >= 0)) {
      return(3); // 指数表記エラー
    }

    return(0); // 表示範囲内
  }

  // ボタン要素取得(表示)
  const buttonElement_C = document.getElementById('btn_C');
  const buttonElement_7 = document.getElementById('btn_7');      
  const buttonElement_4 = document.getElementById('btn_4');      
  const buttonElement_1 = document.getElementById('btn_1');      
  const buttonElement_0 = document.getElementById('btn_0');      

  const buttonElement_BS = document.getElementById('btn_BS');
  const buttonElement_8 = document.getElementById('btn_8');      
  const buttonElement_5 = document.getElementById('btn_5');      
  const buttonElement_2 = document.getElementById('btn_2');      
  const buttonElement_DOT = document.getElementById('btn_DOT');      

  const buttonElement_SQR = document.getElementById('btn_SQR');
  const buttonElement_9 = document.getElementById('btn_9');      
  const buttonElement_6 = document.getElementById('btn_6');      
  const buttonElement_3 = document.getElementById('btn_3');      
  const buttonElement_PLMI = document.getElementById('btn_PLMI');

  const buttonElement_DIV = document.getElementById('btn_DIV');      
  const buttonElement_MUL = document.getElementById('btn_MUL');      
  const buttonElement_MNS = document.getElementById('btn_MNS');      
  const buttonElement_PLS = document.getElementById('btn_PLS');      
  const buttonElement_EQ  = document.getElementById('btn_EQ');      

  InitScreen();
  showVal();

 buttonElement_C.addEventListener('click',() => {
    InitAll(); // 全ての変数を初期化
    showVal();
    scrnMode = 0;
    oprFlgNew = 0; // セッション内演算子入力有無クリア
 });  
 buttonElement_7.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '7';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return; 
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_4.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '4';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_1.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '1';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_0.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '0';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_BS.addEventListener('click',() => {
   if (scrnMode === 1 || scrnMode === 3){
        if (numLen === dotpos) {
          dotpos = -1; // 小数点位置をリセット
        }else{
          strBuff = strBuff.slice(0, -1); // 最後の文字を削除
          numLen--;
        }
        if (numLen === 0) {
          scrnMode--;
          showVal(); 
        }else{
          showStr(strBuff);
        }  
   }
 });  
 buttonElement_8.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '8';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_5.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '5';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_2.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '2';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_DOT.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   if (dotpos < 0){
      dotpos = numLen;
      showStr(strBuff);
   }
 });  
 buttonElement_SQR.addEventListener('click',() => {
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
        scrnMode++;
    }
    if (scrnMode >= 4) {
        if (Value_2 >= 0) {
          Value_2 = Math.sqrt(Value_2);
        } else {
            showError(12); // エラー表示;
            scrnMode=0; 
            return; 
        }
    } else {
        if (Value_1 >= 0) {
          Value_1 = Math.sqrt(Value_1);
        } else {
          showError(12); // エラー表示;
          scrnMode=0; 
          return;
        }
    }
    let errFlg=ChkRange(Value_1);
    if (errFlg > 0) {
        showError(errFlg); // エラー表示
        InitAll();
        scrnMode=0;
        return;
    }
    showVal();
 });  
 buttonElement_9.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '9';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_6.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '6';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_3.addEventListener('click',() => {
   if (scrnMode === 0 || scrnMode === 2){
      InitBuff();
      if (oprFlgNew===1)  scrnMode=3; 
      else  scrnMode=1;
   }
   strBuff = strBuff + '3';
   numLen++;
   if ((scrnMode ===1 || scrnMode===3) && (numLen >= 10)){
      if (setBuff(strBuff) >0) return;
      if (oprFlg > 0) scrnMode++;
      else scrnMode=0;  // 演算子フラグが立っていない場合はscrnModeを0に戻す
   }else{
      showStr(strBuff);
   }
 });  
 buttonElement_PLMI.addEventListener('click',() => {
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
        scrnMode++;
    }
    if (scrnMode >= 4) {
        Value_2 = -Value_2; // 引数２の符号を反転
    } else {
        Value_1 = -Value_1; // 引数１の符号を反転
    }
    showVal();
 });
 buttonElement_DIV.addEventListener('click',() => {
    oprFlgNew = 1; // セッション内演算子入力有
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
    }
    if (scrnMode >=3 ){
        let errFlg=calcVal();
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return;
        }else{
          showValue(Value_1); //必ずValue_1を表示する
        }
    }
    scrnMode=2;
    oprFlg=4; // 除算
 });
 buttonElement_MUL.addEventListener('click',() => {
    oprFlgNew = 1; // セッション内演算子入力有
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
    }
    if (scrnMode >=3){
        let errFlg=calcVal();
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return;
        }else{
          showValue(Value_1); //必ずValue_1を表示する
        }
    }
    scrnMode=2;
    oprFlg=3;  // 乗算
});
 buttonElement_MNS.addEventListener('click',() => {
    oprFlgNew = 1; // セッション内演算子入力有
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
    }
    if (scrnMode >=3){
        let errFlg=calcVal();
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return;
        }else{
          showValue(Value_1); //必ずValue_1を表示する
        }
    }
    scrnMode=2;
    oprFlg=2; // 減算
 });
 buttonElement_PLS.addEventListener('click',() => {
    oprFlgNew = 1; // セッション内演算子入力有
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
    }
    if (scrnMode >=3){
        let errFlg=calcVal();
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return;
        }else{
          showValue(Value_1); //必ずValue_1を表示する
        }
    }
    scrnMode=2;
    oprFlg=1; // 加算
 });
 buttonElement_EQ.addEventListener('click',() => {
    oprFlgNew = 0; // セッション内演算子入力有無クリア
    if (scrnMode ===1 || scrnMode===3) {
        if (setBuff(strBuff) >0) return;
    }
    if (oprFlg > 0){
        let errFlg=calcVal();
        if (errFlg > 0) {
          showError(errFlg); // エラー表示
          InitAll();
          scrnMode=0;
          return;
        }else{
          showValue(Value_1); //必ずValue_1を表示する
        }
    }
    scrnMode=2;
});

}