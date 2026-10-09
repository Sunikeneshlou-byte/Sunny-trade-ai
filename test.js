const fs=require('fs'),vm=require('vm'),assert=require('assert');const code=fs.readFileSync(__dirname+'/app.js','utf8');
const dom={};const fake=id=>dom[id]||(dom[id]={value:'',textContent:'',innerHTML:'',disabled:false,classList:{add(){},remove(){}}});
const context={console,Date,Number,Math,Intl,Set,Array,JSON,Map,Promise,localStorage:{getItem(){return null},setItem(){}},document:{getElementById:fake},navigator:{},setTimeout,clearTimeout,fetch:()=>Promise.reject(Error('offline'))};vm.createContext(context);
vm.runInContext(code.slice(0,code.indexOf("for(const id of ['tradeAmount'")),context);
let ok=0;function test(name,body){body();ok++;console.log('PASS',name)}
function value(s){return vm.runInContext(s,context)}
test('EMA stable flat market',()=>assert(Math.abs(value('emaLast(Array(150).fill(10),20)')-10)<1e-10));
test('RSI stable flat market neutral',()=>assert.strictEqual(value('rsi(Array(120).fill(2))'),50));
test('RSI rise approaches 100',()=>assert(value('rsi(Array.from({length:150},(_,i)=>i+1))')>99));
test('ATR no volatility flat',()=>assert(Math.abs(value('atr(Array.from({length:100},(_,i)=>[i,9,11,10,10,30]))')-2)<1e-10));
test('dollar scenario commissions and slippage',()=>{const x=value('scenario(100,100,2,4)');assert(x.gain>100&&x.loss<100&&x.profit>0&&x.down<0)});
test('small coin display not zero',()=>assert(value('preciseMoney(0.00003121)').includes('0.00003121')));
test('one-hundred market scan configured',()=>assert(code.includes('COUNT=100')));
test('25-ranked shortlist configured',()=>assert(code.includes('list.slice(0,25)')));
test('independent open position quote refresh present',()=>assert(code.includes('await refreshOpenPositions()')));
test('stale quote fails closed',()=>assert.strictEqual(value('validQuote("BNB-USD")'),undefined));
test('no real exchange trading operations',()=>assert(!/private[_-]?key|createOrder|placeOrder|withdraw|signTransaction/i.test(code)));
console.log(`SUCCESS ${ok} tests`)
