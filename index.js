function makeid(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function encrypt(string, b64, time) {
  if(b64 == null) { this.b64 = makeid(string.length) } else { this.b64 = b64 }
  if(time== null) { this.time= new Date(0, 0, 0, 0, 0, 0, 0) } else { this.time = time }

  this.s = '';

  for (var i = 0; i < string.length; i++) {
    this.s+= String.fromCharCode(
      string.charCodeAt(i)+
      this.b64.charCodeAt(i)-
      this.time.getHours()+
      this.time.getMinutes()+
      this.time.getSeconds()
    );
  }
  return [this.s, this.b64, this.time]
}

function decrypt(string, b64, time) {
  this.s = '';
  if(time== null) { this.time= new Date(0, 0, 0, 0, 0, 0, 0) } else { this.time = time }

  for (var i = 0; i < string.length; i++) {
    this.s+= String.fromCharCode(
      string.charCodeAt(i)-
      b64.charCodeAt(i)+
      this.time.getHours()-
      this.time.getMinutes()-
      this.time.getSeconds()
    );
  }

  return this.s;
}

module.exports = {makeid, encrypt, decrypt}
