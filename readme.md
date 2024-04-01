# LOG KAYDI

Log kaydı: ziyaretçi istatistikleri. Benim siteme kim,neden,kaç kez girmiş. log kaydı tutmak yasal bir zorunluluk. Belli süre aktif, belli sürede pasif tutmak zorundasınız.

Morgan ile log kaydı tutcaz ve bu bir middlewaredir. Morgan official bir yöntem, farklı log kaydı tutma middlewareleri de var.
npm i morgan yap

Hata olsa da olmasa da log kaydı her zaman tutulur.
user-agent: tarayıcıların vs bir imzası olur. sen siteye girdiğinde nerden girdiysen onun imzası görünür.

index.js aşağıdaki kodları yazdığımda deprecated diye bir uyarı veriyor. Bunun nedeni sana iki seçenek sunuyor, ya önceden tanımlı formatları yaz içine ya da sen kendin bir format tanımla.

const morgan = require("morgan")
app.use(morgan())

Önceden tanımlı formatlar neler?
Bunlar dönen veri de nelerin gösterilip gösterilmediyle alakalı şeyler. Bazıları daha detaylı
-combined
app.use(morgan("combined"))

-common
daha az detay verdi

-dev
-short
-tiny

Kendim de dönen veriler ile ilgili ayarlama yapabilirim.
app.use(morgan('IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer | AGENT=":user-agent"'))

### Log Kaydını Depolama

log kaydını bir yerde depolamam lazım. Morgan benim için bir kayıt tutmaz bunun için farklı bir şey kullanacağım.
fs builtin bir metod

const fs = require('node:fs')
app.use(morgan('combined', {
stream: fs.createWriteStream('./access.log')
}))

Otomatikman dosyayı kendisi oluşturuyor bu şekilde

#### flags

dosya sistemlerinde flagsler vardır. Bunlar dosyaya nasıl davranacağımızı söyler. Mesela "üzerine yaz", "dosya yoksa oluştur"
"a+" : dosyayı aç hem okuma yap hem yazma yap, dosya oluşturulmadıysa da otomatik ekleme yap.
'./access.log' dan sonra yazdığım {} ikinci objeye dosyaya yazma ayarlarımı giriyorum.

app.use(morgan('combined', {
stream: fs.createWriteStream('./access.log', {flags: "a+"})
}))

#### access dosyası şişmesin diye

bu access dosyası zamanla şişer, gb vs olur. Bu şişmesin diye ne yapabiliriz? Kayıtları günlük tutabiliriz. Bunun için logs adında bir klasör açtım.

const fs = require('node:fs')
const now = new Date()
const today = now.toISOString().split('T')[0]
app.use(morgan('combined', {
stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
}))

// Bu now bir obje olarak döner, o nedenle onu stringe çeviriyorum. Aradaki "T" harfinden kesiyorum. Böylece tarih ve zaman ayrılmış oldu.

Log kayıtlarını gitignore engeller.

# DOCUMANTATION

Swagger gittikçe popülerleşiyor, redoc şuan populer zaten.

openAPI bir documantion standartıdır. Dökümanlar bu standarta uyar.

// https://swagger-autogen.github.io/docs/
npm i swagger-autogen //benim routelarımı tarayıp otomatik swaager oluşturacak, JSON dosyası oluşturacak
npm i swagger-ui-express // Oluşan JSON dosyasını alıp otomatik görüntüleme yapacak

npm i redoc-express // redoc için

swaggerAutogen.js dosyasını çalıştırmak için terminale "node swaggerAutogen.js" yaz
başarılı olursa console da aşağıdaki çıktıyı göreceksin
Swagger-autogen: Success

bundan sonra da dosylarında swagger.json isimli bir dosya olmalı

şimdi oluşan json dosyasonı görüntülemek için index.js içine aşağıdaki kodu yazıyorum
const swaggerUi = require('swagger-ui-express')
bu swaggerUi da bir route aslında. Ben şimdi swaggerUi'ın nerede çalışmasını istiyorsam ona bir path yazacağım

iki parametrem var swaggerUi.serve bu sistemi çalıştır,
swaggerUi.setup("",{}) ayarları yapacak, birinci parametre hangi dosya yani json dosyası nerede, ikinci parametre token çalıştırma ayarı

app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))

Bu kodları ileride kullanmak istediğimde üst kısma hiç dokunmayacağım sadece definiton en altındaki kımı değiştireceğim

swagger-autogen yazıp google'la, dökümanı nasıl daha görsel yapacağına bak.

swagger "all" metodunu desteklemez.
Bir değişiklik yaparsan swagger dosyasını tekrar çalıştır.

Görsellik için birşeyler yapacaksam bunları controllerlarda yapabilirim. #swagger yazarsam swagger bunu yakalayabiliyor, yorum içinde olmalı
Token controller görünmemesi lazım, bu sadece backendi ilgilendirir. O yüzden Token kapatacağız şimdi.
şekilde yapabiliriz. deprecated dersem üzerini çiziyor, başına da \_ koyarsam görünmez. Eğer hiç yer almasın dökümanda diyorsam ignore kullanacağım.
/_
\_swagger.deprecated = true
#swagger.ignore = true
_/

Yaptığım görselleştirme işleminin hepsi redocta da görünecek.
Swaggerda bazı pathlerde çıktı göremeyebilirsin, bunun nedeni Token bilgisi istemesidir. Bunun için Token alıp üsttedeki Auth.. kısmına yapıştır.

#### Redoc

Önemli olan ayar aşağıdaki. Redoc datayı nereden alacak? yazdığımız json datasından
specUrl: '/documents/json'

Ana Urlde aşağıdaki kodu yazarsam açılış ekranında dökümanları gösterecek
api: {
documents: {
swagger: 'http://127.0.0.1:8000/documents/swagger',
redoc: 'http://127.0.0.1:8000/documents/redoc',
json: 'http://127.0.0.1:8000/documents/json',
},
contact: 'contact@clarusway.com'
},
