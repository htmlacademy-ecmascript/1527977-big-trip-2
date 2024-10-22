(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},$={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",y={};y[_]=m;var g=function(t){return t instanceof S},M=function t(e,n,i){var s;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,s=o}return!i&&s&&(_=s),s||!i&&_},b=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},D=$;D.l=M,D.i=g,D.w=function(t,e){return b(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function m(t){this.$L=M(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return D},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var n=b(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return b(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<b(t)},v.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,u=!!D.u(e)||e,h=D.p(t),f=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?i:i.endOf(a)},p=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,$=this.$D,_="set"+(this.$u?"UTC":"");switch(h){case c:return u?f(1,0):f(31,11);case l:return u?f(1,v):f(0,v+1);case o:var y=this.$locale().weekStart||0,g=(m<y?m+7:m)-y;return f(u?$-g:$+(6-g),v);case a:case d:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case s:return p(_+"Seconds",2);case i:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,u=D.p(t),h="set"+(this.$u?"UTC":""),f=(o={},o[a]=h+"Date",o[d]=h+"Date",o[l]=h+"Month",o[c]=h+"FullYear",o[r]=h+"Hours",o[s]=h+"Minutes",o[i]=h+"Seconds",o[n]=h+"Milliseconds",o)[u],p=u===a?this.$D+(e-this.$W):e;if(u===l||u===c){var m=this.clone().set(d,1);m.$d[f](p),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[D.p(t)]()},v.add=function(n,u){var d,h=this;n=Number(n);var f=D.p(u),p=function(t){var e=b(h);return D.w(e.date(e.date()+Math.round(t*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return p(1);if(f===o)return p(7);var m=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[f]||1,v=this.$d.getTime()+n*m;return D.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return D.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(n.monthsShort,o,u,3),MMMM:c(u,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,h){var f,p=D.p(d),m=b(n),v=(m.utcOffset()-this.utcOffset())*t,$=this-m,_=D.m(this,m);return _=(f={},f[c]=_/12,f[l]=_,f[u]=_/3,f[o]=($-v)/6048e5,f[a]=($-v)/864e5,f[r]=$/e,f[s]=$/t,f[i]=$/1e3,f)[p]||$,h?_:D.a(_)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=M(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return D.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),w=S.prototype;return b.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),b.extend=function(t,e){return t.$i||(t(e,S,b),t.$i=!0),b},b.locale=M,b.isDayjs=g,b.unix=function(t){return b(1e3*t)},b.en=y[_],b.Ls=y,b.p={},b}()},285:function(t){t.exports=function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,i=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,r={},a=function(t){return(t=+t)+(t>68?1900:2e3)},o=function(t){return function(e){this[t]=+e}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t)}],u=function(t){var e=r[t];return e&&(e.indexOf?e:e.s.concat(e.f))},c=function(t,e){var n,i=r.meridiem;if(i){for(var s=1;s<=24;s+=1)if(t.indexOf(i(s,0,e))>-1){n=s>12;break}}else n=t===(e?"pm":"PM");return n},d={A:[s,function(t){this.afternoon=c(t,!1)}],a:[s,function(t){this.afternoon=c(t,!0)}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[n,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[i,o("seconds")],ss:[i,o("seconds")],m:[i,o("minutes")],mm:[i,o("minutes")],H:[i,o("hours")],h:[i,o("hours")],HH:[i,o("hours")],hh:[i,o("hours")],D:[i,o("day")],DD:[n,o("day")],Do:[s,function(t){var e=r.ordinal,n=t.match(/\d+/);if(this.day=n[0],e)for(var i=1;i<=31;i+=1)e(i).replace(/\[|\]/g,"")===t&&(this.day=i)}],M:[i,o("month")],MM:[n,o("month")],MMM:[s,function(t){var e=u("months"),n=(u("monthsShort")||e.map((function(t){return t.slice(0,3)}))).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[s,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,o("year")],YY:[n,function(t){this.year=a(t)}],YYYY:[/\d{4}/,o("year")],Z:l,ZZ:l};function h(n){var i,s;i=n,s=r&&r.formats;for(var a=(n=i.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,n,i){var r=i&&i.toUpperCase();return n||s[i]||t[i]||s[r].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))).match(e),o=a.length,l=0;l<o;l+=1){var u=a[l],c=d[u],h=c&&c[0],f=c&&c[1];a[l]=f?{regex:h,parser:f}:u.replace(/^\[|\]$/g,"")}return function(t){for(var e={},n=0,i=0;n<o;n+=1){var s=a[n];if("string"==typeof s)i+=s.length;else{var r=s.regex,l=s.parser,u=t.slice(i),c=r.exec(u)[0];l.call(e,c),t=t.replace(c,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon}}(e),e}}return function(t,e,n){n.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(a=t.parseTwoDigitYear);var i=e.prototype,s=i.parse;i.parse=function(t){var e=t.date,i=t.utc,a=t.args;this.$u=i;var o=a[1];if("string"==typeof o){var l=!0===a[2],u=!0===a[3],c=l||u,d=a[2];u&&(d=a[2]),r=this.$locale(),!l&&d&&(r=n.Ls[d]),this.$d=function(t,e,n){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var i=h(e)(t),s=i.year,r=i.month,a=i.day,o=i.hours,l=i.minutes,u=i.seconds,c=i.milliseconds,d=i.zone,f=new Date,p=a||(s||r?1:f.getDate()),m=s||f.getFullYear(),v=0;s&&!r||(v=r>0?r-1:f.getMonth());var $=o||0,_=l||0,y=u||0,g=c||0;return d?new Date(Date.UTC(m,v,p,$,_,y,g+60*d.offset*1e3)):n?new Date(Date.UTC(m,v,p,$,_,y,g)):new Date(m,v,p,$,_,y,g)}catch(t){return new Date("")}}(e,o,i),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),c&&e!=this.format(o)&&(this.$d=new Date("")),r={}}else if(o instanceof Array)for(var f=o.length,p=1;p<=f;p+=1){a[1]=o[p-1];var m=n.apply(this,a);if(m.isValid()){this.$d=m.$d,this.$L=m.$L,this.init();break}p===f&&(this.$d=new Date(""))}else s.call(this,t)}}}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2592e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:o,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof _},h=function(t,e,n){return new _(t,n,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},$=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function p(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*c[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(u);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/o),t%=o,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=$(this.$d.years,"Y"),e=$(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=$(n,"D"),s=$(this.$d.hours,"H"),r=$(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=$(a,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||o.negative,u=s.format||r.format||o.format?"T":"",c=(l?"-":"")+"P"+t.format+e.format+i.format+u+s.format+r.format+o.format;return"P"===c||"-P"===c?"P0D":c},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/c[f(t)]},v.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/c[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var i;return i=e?t*c[f(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return h(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return h(t,{$l:n},e)},s.isDuration=d;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),a.bind(this)(t,e)}}}()},412:function(t){t.exports=function(){"use strict";return function(t,e){e.prototype.isSameOrBefore=function(t,e){return this.isSame(t,e)||this.isBefore(t,e)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}const i=[{id:1,description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:2,description:"Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.",name:"Amsterdam",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163318",description:"Amsterdam parliament building"},{src:"http://picsum.photos/300/200?r=0.0762563005163319",description:"Amsterdam river"}]},{id:3,description:"Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva).",name:"Geneva",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163320",description:"Geneva parliament building"}]},{id:4,description:"",name:"Saturn",pictures:[]}],s=[{type:"taxi",offers:[{id:1,title:"Upgrade to a business class",price:120},{id:2,title:"Order Uber",price:20}]},{type:"train",offers:[{id:3,title:"coffee",price:10}]},{type:"ship",offers:[{id:4,title:"Upgrade to a business class",price:100},{id:5,title:"Upgrade to a first class",price:200},{id:6,title:"Add luggage",price:50}]},{type:"flight",offers:[{id:7,title:"Upgrade to a business class",price:100},{id:8,title:"Upgrade to a first class",price:200},{id:9,title:"Add meal",price:15},{id:10,title:"Choose seats",price:5},{id:11,title:"Add luggage",price:50}]}],r=[{id:1,basePrice:1100,dateFrom:"2024-07-10T12:55:56.845Z",dateTo:"2024-07-10T13:29:30.375Z",destination:2,isFavorite:!0,offers:[1],type:"taxi"},{id:2,basePrice:2200,dateFrom:"2024-09-19T13:55:56.845Z",dateTo:"2024-09-19T15:55:56.845Z",destination:1,isFavorite:!1,offers:[],type:"bus"},{id:3,basePrice:3300,dateFrom:"2024-08-02T02:01:56.845Z",dateTo:"2024-08-03T15:19:19.375Z",destination:3,isFavorite:!0,offers:[3],type:"train"},{id:4,basePrice:4500,dateFrom:"2024-10-10T00:00:00.845Z",dateTo:"2024-10-29T00:00:00.845Z",destination:4,isFavorite:!1,offers:[4,5],type:"ship"}],a=["Taxi","Bus","Train","Ship","Drive","Drive","Flight","Check-in","Sightseeing","Restaurant"],o=["event","offer"],l="HH:mm",u="DD/MM/YY HH:mm",c="YYYY-MM-DDTHH:mm",d=t=>`${t[0].toUpperCase()}${t.slice(1)}`;var h=n(484),f=n.n(h),p=n(285),m=n.n(p),v=n(646),$=n.n(v),_=n(412),y=n.n(_);f().extend(m()),f().extend($()),f().extend(y());const g=(t,e)=>t?f()(t).format(e):"",M=t=>String(t).padStart(2,"0"),b=t=>t.split(" ").join("_");class D{constructor({point:t,destinations:e,offers:n}){this.point=t,this.destinations=e,this.offers=n}getTemplate(){return((t,e,n)=>{const i=e.find((e=>e.id===t.destination))||{},s=n.find((e=>e.type===t.type))?.offers||[],r=s.filter((e=>t.offers.includes(e.id))),{basePrice:o,dateFrom:l,dateTo:c,type:h}=t,{name:f,description:p,pictures:m}=i||{},v=t.id||0,$=`${a.map((t=>`<div class="event__type-item">\n                <input id="event-type-${t}-${v}" class="event__type-input  visually-hidden" type="radio"\n                name="event-type" value="${t}" ${t===h?"checked":""}>\n                <label class="event__type-label  event__type-label--${t}"\n                for="event-type-${t}-${v}">${d(t)}</label>\n              </div>`)).join("")}`,_=s.length?`<section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n              <div class="event__available-offers">\n              ${s.map((t=>`<div class="event__offer-selector">\n                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${b(t.title)}-${v}"\n                  type="checkbox" name="event-offer-${b(t.title)}" ${r.map((t=>t.id)).includes(t.id)?"checked":""}>\n                  <label class="event__offer-label" for="event-offer-${t.title}-${v}">\n                    <span class="event__offer-title">${t.title}</span>\n                      &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${t.price}</span>\n                  </label>\n                </div>`)).join("")}\n                </div>\n              </section>`:"",y=i?`<section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">${p||""}</p>\n            ${m?.length?`<div class="event__photos-container">\n                <div class="event__photos-tape">\n                ${m?.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`))}\n                </div>\n              </div>`:""}\n            </section>`:"";return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-${v}">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${h}.png" alt="${h} icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${v}" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${$}\n            </fieldset>\n          </div>\n        </div>\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-${v}">\n              ${h}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-${v}" type="text" name="event-destination"\n            value="${f||""}" list="destination-list-${v}">\n          <datalist id="destination-list-${v}">\n              ${e.map((t=>`<option value="${t.name}"></option>`)).join("")}\n          </datalist>\n        </div>\n\n         <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-${v}">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-${v}" type="text"\n            name="event-start-time" value="${g(l,u)}">\n              &mdash;\n            <label class="visually-hidden" for="event-end-time-${v}">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-${v}" type="text"\n            name="event-end-time" value="${g(c,u)}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-${v}">\n              <span class="visually-hidden">Price</span>\n                &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-${v}" type="text" name="event-price" value="${o}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">${v?"Delete":"Cancel"}</button>\n            ${v?'<button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>':""}\n          </header>\n          <section class="event__details">\n          ${_}\n          ${y}\n        </section>\n      </form>\n    </li>`})(this.point,this.destinations,this.offers)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class S{constructor({point:t,destinations:e,offers:n}){this.point=t,this.destinations=e,this.offers=n}getTemplate(){return((t,e,n)=>{const{basePrice:i,dateFrom:s,dateTo:r,type:a,isFavorite:o}=t,u=(n.find((e=>e.type===t.type))?.offers||[]).filter((e=>t.offers.includes(e.id))),h=e.find((e=>e.id===t.destination));return`<li class="trip-events__item">\n        <div class="event">\n          <time class="event__date" datetime=${g(s,"YYYY-MM-DD")}>${g(s,"MMM D")}</time>\n          <div class="event__type">\n            <img class="event__type-icon" width="42" height="42" src="img/icons/${a}.png" alt="${a} icon">\n          </div>\n          <h3 class="event__title">${d(a)} ${h.name}</h3>\n          <div class="event__schedule">\n            <p class="event__time">\n              <time class="event__start-time" datetime=${g(s,c)}>${g(s,l)}</time>\n                &mdash;\n              <time class="event__end-time" datetime=${g(r,c)}>${g(r,l)}</time>\n            </p>\n            <p class="event__duration">${((t,e)=>{const n=f()(t);return(t=>{const e=f().duration(t,"minutes"),n=e.days(),i=e.hours(),s=e.minutes();let r;switch(!0){case n>0:r=`${n<10?M(n):n}D ${M(i)}H ${M(s)}M`;break;case i>0:r=`${M(i)}H ${M(s)}M`;break;default:r=`${s}M`}return r})(f()(e).diff(n,"minute"))})(s,r)}</p>\n          </div>\n          <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n          </p>\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n          ${u.map((t=>`<li class="event__offer">\n              <span class="event__offer-title">${t.title}</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">${t.price}</span>\n            </li>`)).join("")}\n\n          </ul>\n          <button class="event__favorite-btn ${(t=>t?"event__favorite-btn--active":"")(o)}" type="button">\n            <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n          </button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n      </div>\n    </li>`})(this.point,this.destinations,this.offers)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class w{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const Y=`${["day","event","time","price","offer"].map((t=>`<div class="trip-sort__item trip-sort__item--${t}">\n    <input id="sort-${t}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort"\n    value="sort-${t}" ${o.includes(t)?"disabled":""}>\n    <label class="trip-sort__btn" for="sort-${t}">${d(t)}</label>\n  </div>`)).join("")}`;class T{getTemplate(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      ${Y}\n    </form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const O=`${["everything","future","present","past"].map((t=>`<div class="trip-filters__filter">\n    <input id="filter-${t}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter"\n    value="${t}">\n    <label class="trip-filters__filter-label" for="filter-${t}">${d(t)}</label>\n  </div>`)).join("")}`,x=document.querySelector(".page-header").querySelector(".trip-controls__filters"),H=document.querySelector(".trip-events");e(new class{getTemplate(){return`<form class="trip-filters" action="#" method="get">\n      ${O}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},x);const L=new class{constructor(){this.points=[],this.destinations=[],this.offers=[]}init(){this.points=r,this.destinations=i,this.offers=s}getPoints(){return this.points}getDestinations(){return this.destinations}getOffers(){return this.offers}};L.init();const C=new class{constructor({eventContainer:t,pointModel:e}){this.eventContainer=t,this.listComponent=new w,this.pointModel=e}init(){const t=this.pointModel.getPoints(),n=this.pointModel.getDestinations(),i=this.pointModel.getOffers();e(new T,this.eventContainer,"afterbegin"),e(this.listComponent,this.eventContainer),e(new D({point:{basePrice:0,dateFrom:(new Date).toISOString(),dateTo:(new Date).toISOString(),destination:0,isFovorite:!1,offers:[],type:a[0]},destinations:n,offers:i}),this.listComponent.getElement()),e(new D({point:t[1],destinations:n,offers:i}),this.listComponent.getElement());for(const s of t)e(new S({point:s,destinations:n,offers:i}),this.listComponent.getElement())}}({eventContainer:H,pointModel:L});C.init()})()})();
//# sourceMappingURL=bundle.761eebdae79e38aa00d5.js.map