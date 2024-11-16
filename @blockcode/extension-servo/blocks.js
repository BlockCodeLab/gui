import{Text as o}from"@blockcode/ui";var r={en:{"extension.servo.name":"Servo","extension.servo.90servo":"set PIN [PIN] 90\xB0 servo angle to [ANGLE]\xB0","extension.servo.180servo":"set PIN [PIN] 180\xB0 servo angle to [ANGLE]\xB0","extension.servo.motor":"set PIN [PIN] 360\xB0 servo rotate [ROTATE]","extension.servo.motorClockwise":"clockwise","extension.servo.motorAnticlockwise":"anticlockwise","extension.servo.motorStop":"stop"},"zh-Hans":{"extension.servo.name":"\u8235\u673A","extension.servo.90servo":"\u5C06\u5F15\u811A [PIN] 90\xB0 \u8235\u673A\u89D2\u5EA6\u8BBE\u4E3A [ANGLE]\xB0","extension.servo.180servo":"\u5C06\u5F15\u811A [PIN] 180\xB0 \u8235\u673A\u89D2\u5EA6\u8BBE\u4E3A [ANGLE]\xB0","extension.servo.motor":"\u5C06\u5F15\u811A [PIN] 360\xB0 \u8235\u673A\u8F6C\u5411\u8BBE\u4E3A [ROTATE]","extension.servo.motorClockwise":"\u987A\u65F6\u9488","extension.servo.motorAnticlockwise":"\u9006\u65F6\u9488","extension.servo.motorStop":"\u505C\u6B62"}};var m="./assets/icon-ta0m7ch5.png";var a="./assets/servo-03enzd4g.py";import{jsx as s}from"preact/jsx-runtime";var I={iconURI:m,name:s(o,{id:"extension.servo.name",defaultMessage:"Servo"}),files:[{name:"servo",type:"text/x-python",uri:a}],blocks:[{id:"set_180servo",text:s(o,{id:"extension.servo.180servo",defaultMessage:"set PIN [PIN] 180\xB0 servo angle to [ANGLE]\xB0"}),inputs:{PIN:{type:"number",default:1},ANGLE:{type:"angle",default:0}},python(e){this.definitions_.import_extension_servo="from extensions.servo import servo";let t="";if(this.STATEMENT_PREFIX)t+=this.injectId(this.STATEMENT_PREFIX,e);const n=this.valueToCode(e,"PIN",this.ORDER_NONE)||"0",i=this.valueToCode(e,"ANGLE",this.ORDER_NONE)||"0";return t+=`servo.set_angle(num(${n}), num(${i}))\n`,t}},{id:"set_90servo",text:s(o,{id:"extension.servo.90servo",defaultMessage:"set PIN [PIN] 90\xB0 servo angle to [ANGLE]\xB0"}),inputs:{PIN:{type:"number",default:1},ANGLE:{type:"angle",default:0}},python(e){this.definitions_.import_extension_servo="from extensions.servo import servo";let t="";if(this.STATEMENT_PREFIX)t+=this.injectId(this.STATEMENT_PREFIX,e);const n=this.valueToCode(e,"PIN",this.ORDER_NONE)||"0",i=this.valueToCode(e,"ANGLE",this.ORDER_NONE)||"0";return t+=`servo.set_angle(num(${n}), num(${i}), angle=90)\n`,t}},{id:"set_motor",text:s(o,{id:"extension.servo.motor",defaultMessage:"set PIN [PIN] 360\xB0 servo rotate [ROTATE]"}),inputs:{PIN:{type:"number",default:1},ROTATE:{type:"number",default:"1",menu:[[s(o,{id:"extension.servo.motorClockwise",defaultMessage:"clockwise"}),"1"],[s(o,{id:"extension.servo.motorAnticlockwise",defaultMessage:"anticlockwise"}),"-1"],[s(o,{id:"extension.servo.motorStop",defaultMessage:"stop"}),"0"]]}},python(e){this.definitions_.import_extension_servo="from extensions.servo import servo";let t="";if(this.STATEMENT_PREFIX)t+=this.injectId(this.STATEMENT_PREFIX,e);const n=this.valueToCode(e,"PIN",this.ORDER_NONE)||"0",i=e.getFieldValue("ROTATE")||"0";return t+=`servo.set_motor(num(${n}), num(${i}))\n`,t}}],translations:r};export{I as default};
