# translateer
Light-weight translator

## Installation

Using npm or yarn

```
npm install translateer --save
yarn add translateer --save
```

## How to use

```javascript
const translator  = require('tranlateer');
```

### translate

`translate` is a function with only one object argument which is specified below.

`q` [optional] default is empty, the word/sentence you want to query. <br/>
`from` [optional] default is auto, used to specify the language of `q`. <br/>
`to` [optional] default is en, used to specify the language for translation. <br/>
`version` [optional] default is 1.0, used to specify the version of API. <br/>

**Examples for API v1.0 (Default)**

```javascript
translator.translate({
  q: 'hello world',
  to: 'es'
})
.then(res => res.json())
.then(console.log);

// Hola Mundo
```

**Examples for API v2.0**

```javascript
translator.translate({
  q: 'hello world',
  to: 'es',
  v: '2.0'
})
.then(res => res.json())
.then(console.log);

/*
{
  "sentences": [
    {
      "trans": "Hola Mundo",
      "orig": "hello world",
      "backend": 1
    }
  ],
  "src": "en",
  "alternative_translations": [
    {
      "src_phrase": "hello world",
      "alternative": [
        {
          "word_postproc": "Hola Mundo",
          "score": 1000,
          "has_preceeding_space": true,
          "attach_to_next_token": false
        },
        {
          "word_postproc": "Hola Mundo",
          "score": 1000,
          "has_preceeding_space": true,
          "attach_to_next_token": false
        }
      ],
      "srcunicodeoffsets": [
        {
          "begin": 0,
          "end": 11
        }
      ],
      "raw_src_segment": "hello world",
      "start_pos": 0,
      "end_pos": 0
    }
  ],
  "confidence": 0.71052581,
  "ld_result": {
    "srclangs": [
      "en"
    ],
    "srclangs_confidences": [
      0.71052581
    ],
    "extended_srclangs": [
      "en"
    ]
  }
}
*/
```

### getAudio

`getAudio` is a function returning the url of the audio file

`q` [optional] default is empty, the word/sentence you want to query. <br/>
`to` [optional] default is auto detected, used to specify the language for translation. <br/>
`speed` [optional] default is 1, used to specify the audio speed. <br/>

**Example**

```javascript
translator.getAudio({
  q: 'hello world'
})
.then(console.log);
// https://translate.google.com/translate_tts?ie=UTF-8&q=test&tl=en&total=1&idx=0&textlen=4&tk=290146.141044&client=t&prev=input&ttsspeed=1 
```

### Copyright

Copyright (C) 2017 Tony Ngan, released under the MIT License.
