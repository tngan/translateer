const token = require('google-translate-token');
const fetch = require('node-fetch');
const lang = ['auto','af','sq','ar','hy','az','eu','be','bn','bs','bg','ca','ceb','ny','zh-cn','zh-tw','co','hr','cs','da','nl','en','eo','et','tl','fi','fr','fy','gl','ka','de','el','gu','ht','ha','haw','iw','hi','hmn','hu','is','ig','id','ga','it','ja','jw','kn','kk','km','ko','ku','ky','lo','la','lv','lt','lb','mk','mg','ms','ml','mt','mi','mr','mn','my','ne','no','ps','fa','pl','pt','ma','ro','ru','sm','gd','sr','st','sn','sd','si','sk','sl','so','es','su','sw','sv','tg','ta','te','th','tr','uk','ur','uz','vi','cy','xh','yi','yo','zu'];

function getTranslation({q = '', sl = 'auto', tl = 'en', v = '1.0', tk}) {
  if (lang.indexOf(sl) === -1 || lang.indexOf(tl) === -1) {
    throw new Error('Fatal: undefined source or target language')
  }
  return fetch(`https://translate.google.com/translate_a/t?tl=${tl}&v=${v}&source=is&tk=${tk}&q=${encodeURIComponent(q)}&client=t&sl=${sl}&ie=UTF-8&oe=UTF-8`);
}

// exposed functions are declared under this line

function translate({q, from: sl, to: tl, version: v}) {
  return token.get(q).then(({name, value: tk}) => getTranslation({ q, sl, tl, v, tk }));
}

function getAudio({q, to: tl = 'auto', speed: ttsspeed = 1}) {
  if (lang.indexOf(tl) === -1) {
    throw new Error('Fatal: undefined source or target language')
  }
  if (ttsspeed <= 0) {
    throw new Error('Fatal: undefined audio speed')
  }
  let tk = '';
  return token.get(q)
    .then(({name, value}) => {
      tk = value;
      return getTranslation({q, tl: tl === 'auto' ? 'en' : tl, tk }); // if auto, just translate to en to get detected lang from google server
    })
    .then(res => res.json())
    .then(([translated, detectedLang]) => {
      if (tl === 'auto') {
        [q, tl] = [q, detectedLang];
      } else {
        [q, tl] = [translated, tl];
      }
      return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&total=1&idx=0&textlen=${q.length}&q=${encodeURIComponent(q)}&tk=${tk}&client=t&prev=input&ttsspeed=${ttsspeed}`;
    });
}

module.exports = {
  translate,
  getAudio
}
