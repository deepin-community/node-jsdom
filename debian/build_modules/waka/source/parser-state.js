function ParserState() {
  this.doc = ''
  this.pos = 0
  this.adv = true

  this.setInput = function(doc) {
    this.doc = doc
    this.pos = 0
    this.adv = true
  }

  this.isEOF = function() {
    return this.pos == this.doc.length
  }

  this.cur = function() {
    return _P.doc[_P.pos]
  }

  this.match = function(str) {
    if(_P.adv = _P.doc.substr(_P.pos, str.length) == str) {
      _P.pos += str.length
      return str
    }
  }

  this.step = function(flag) {
    if(_P.adv = flag) {
      _P.pos++
      return _P.doc[_P.pos - 1]
    }
  }

  this.unexpected = function(rule) {
    throw new Error('Unexpected syntax in ' + rule)
  }

  this.traceLine = function(pos) {
    if(! pos) pos = _P.pos

    var from = _P.doc.lastIndexOf('\n', pos), to = _P.doc.indexOf('\n', pos)
    
    if(from == -1)
      from = 0
    else
      from++
    
    if(to == -1)
      to = pos.length

    var lineNo = _P.doc.substring(0, from).split('\n').length
    var line = _P.doc.substring(from, to)
    var pointer = Array(200).join(' ').substr(0, pos - from) + '^^^'

    return (
      'Line ' + lineNo + ':\n' +
      line + '\n' +
      pointer
    )
  }
}
