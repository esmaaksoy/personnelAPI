# Single Token

```Neden Token
Session ve cookieler o kadar güvenli değildir. Bu nedenle Token sistemini kullanıyorum. 
Backend olarak ben mobil vs de hizmet veriyorum ve cookie'yi  tarayıcılar destekliyor ama mobil bunu desteklemeyebilir.O yüzden session değil token kullanmalıyız.
İş yerinde token yapacağız diyorlarsa JWT kast etmiyorlardır. jwt direk söylerler

Token kaç farklı şekilde karşıma çıkabilir;
-Token
-Simple Token
-Basic Token
-Classic Token
-Token Authentication
-JWT

```



```

authentication : kimlik kontrolu

authorization : yetki kontrolü

authorization başlığı altında permission işlemleri yapıyorum. permisssion işleminde authorization işlemi yapıyorum, yetki kontrolü yani

```

```index: true 

index true dediğimde veriyi ona göre saklıyor, hatta yeri geliyor hızlı olması için RAM e saklıyoR.

token çok sık kullandığımız için TOKEN da index: true yapıyoruz sistem hızlı olsun diye. NoSQL değil de SQL veri tabanlarında çok önemli

```

```Set metodu ve şifreleme
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a421f5d1-154e-493e-8b6f-90404a723008/c73dab23-24dd-4cbb-b79d-0f15ed10ec20/Untitled.png)

set methodu passwordu filtreleme yaparken de çalışır

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a421f5d1-154e-493e-8b6f-90404a723008/ba8f3fef-efb1-4e0e-9f0a-ada4174cfbff/Untitled.png)

o yüzden yukarıda passwordu encyrpt yapmadan da gönderebiliyorum

set metodu kullanıyorsam ve findOne kullanıyorsam otomatik encyprt yapıyor

```

```
token controller yazmaya gerek yok aslında

routerları başka bir dosyaya taşımak için router yazmalı başında

bir kullanıcıya birden fazla token vermek isteyebilirim.Neden? Böylece farklı cihazlardan girdiğinde farklı tokenlar kullanır ve kullanıcaya hangi cihazdan girdiğini söylebilirim.

Delete işlemini yaptığım uzun versiyonda token sildiği için sadece bulunduğu cihazdan çıkış yapar. Birinci yöntemde ise direk userId sildiği için orda tüm cihazlardan çıkış yap demiş oluyoruz

logout yaparken de headerdan Tokenı yollamamız gerekiyor, çünkü hangi kullanıcının çıkış yapacağını bilmem lazım

