const token = require('google-translate-token');
const fetch = require('node-fetch');
const lang = ['auto','af','sq','ar','hy','az','eu','be','bn','bs','bg','ca','ceb','ny','zh-cn','zh-tw','co','hr','cs','da','nl','en','eo','et','tl','fi','fr','fy','gl','ka','de','el','gu','ht','ha','haw','iw','hi','hmn','hu','is','ig','id','ga','it','ja','jw','kn','kk','km','ko','ku','ky','lo','la','lv','lt','lb','mk','mg','ms','ml','mt','mi','mr','mn','my','ne','no','ps','fa','pl','pt','ma','ro','ru','sm','gd','sr','st','sn','sd','si','sk','sl','so','es','su','sw','sv','tg','ta','te','th','tr','uk','ur','uz','vi','cy','xh','yi','yo','zu'];

module.exports = function ({q = '', from: sl = 'auto', to: tl = 'en', version: v = '1.0'}) {
  if (lang.indexOf(sl) === -1 || lang.indexOf(tl) === -1) {
    throw new Error('Fatal: undefined source or target language')
  }
  return token.get(q)
    .then(({name, value: tk}) => {
      const url = `https://translate.google.com/translate_a/t?tl=${tl}&v=${v}&source=is&tk=${tk}&q=${encodeURIComponent(q)}&client=t&sl=${sl}&ie=UTF-8&oe=UTF-8`;
      return fetch(url);
    });
}