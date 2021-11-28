module.exports = {
  color: function color(str){
    const obj = { stop: 0, bold: 1, dim: 2, underline: 4, blink: 5, inverted: 7, hide: 8, black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, lightgray: 37, darkgray: 90, lightred: 91, lightgreen: 92, lightyellow: 93, lightblue: 94, lightmagenta: 95, lightcyan: 96, white: 97 }
    return str.replace(/\{(stop|bold|dim|underline|blink|inverted|hide|black|red|green|yellow|blue|magenta|cyan|lightgray|darkgray|lightred|lightgreen|lightyellow|lightblue|lightmagenta|lightcyan|white)\}/g, (_, p) => `\u001b[${obj[p]}m`) + "\u001b[0m"
  },
  getObjPath: function getObjPath(str){
    if (typeof str !== "string") return null;
    return str.match(/(?:\[(?:"|'|`))?(\w|\-|\/)+(?:(?:"|'|`)\])?/gm).map(e => e.match(/\[.+\]/g) ? e.slice(2, e.length-2) : e );
  },
  checkRegex: function checkRegex(regex){
    try { new RegExp(regex); return typeof regex == "string" ? false : true ; } catch(err) { return false; }
  },
  isObject: function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  getDate: function(date, format){
    const dateObj = new Date(date - (24 * 60 * 60 * 1000));
    const times = { "YYYY": dateObj.getFullYear(), "MM": dateObj.getMonth() + 1, "DD": dateObj.getUTCDate() + 1, "hh": dateObj.getHours(), "mm": dateObj.getMinutes(), "ss": dateObj.getSeconds(), "ms": dateObj.getMilliseconds() };
    return format.replace(/\[(YYYY|MM|DD|hh|mm|ss|ms)\]/g, (_, m) => times[m].toString().padStart(2, "0"));
  },
}