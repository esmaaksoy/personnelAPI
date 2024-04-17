"use strict";

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "List Personnels"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    const data = await res.getModelList(Personnel, {}, "departmentId");
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Personnels"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "departmentId":"6607dc9ffd4b6f7b026c3efb",
                "username":"test",
                "password":"1234l@ldKD",
                "firstName":"test",
                "lastName":"test",
                "phone":"0566587621",
                "email": "test@test.com",
                "title":"Frontend Developer",
                "salary": 50000,
                "description":"Test Personnel",
                "isActive": true,
                "isAdmin": false,
                "isLead": true,
                "startedAt": "2023-10-15 13:14:15"
              
            }
        }
    */

    //! Bir departmana 10 kişi ekledim ve bunların hepsinde isLead true görünüyor. Ama bir departmanda sadece bir tane Lead olabilir. Bu nedenle eski kayıtlarda yer alan isLead'leri false yapmak istiyorum ve en son eklediğim kişinin isLead özelliğini true yapmak istiyorum. Önce req.body'den isLead fieldını seçtim. UpdateMany ile hepsini güncelleyeceğim, ilgili department'ı "departmentId" ile buluyorum, çünkü sadece o department'daki isLead değerlerini değiştireceğim. ve diyorum ki isLead: true olanları false yap. Bunları create işleminde yaptım.
    //! Şimdi de update işlemi ile herhangi bir kişinin isLead özelliğinde bir değişiklik yapılarak isLead True olursa, diğer kişilerin isLead özelliğini false yapıyorum.
    const isLead = req.body?.isLead || false;
    if (isLead) {
      await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false }
      );
    }

    const data = await Personnel.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Get SinglePersonnel"
    */

    const data = await Personnel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
       /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Update Personnel"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "departmentId":"6607dc9ffd4b6f7b026c3efb",
                "username":"test",
                "password":"1234l@ldKD",
                "firstName":"test",
                "lastName":"test",
                "phone":"0566587621",
                "email": "test@test.com",
                "title":"Frontend Developer",
                "salary": 50000,
                "description":"Test Personnel",
                "isActive": true,
                "isAdmin": false,
                "isLead": true,
                "startedAt": "2023-10-15 13:14:15"
            }
        }
    */
    //! Admin olmayan kişiler maaş bilgilerini vs göremezsin ki güncelleme işlemi yapamasın
    if (!req.user.isAdmin) {
      req.body.isAdmin = false;
      delete req.body.isLead;
      delete req.body.salary;
    }

    //! runValidators neden kullanıyorum? Diyelim ki ben model de bir email tanımladım ve bu emaile belli validasyonlar ekledim, gerçek bir email mi değil mi onu anlamak için. Bu validasyon işlemi create yaparken çalışır, post isteği atıyorum, email giriyorum, burada otomatik kontrol eder ama ben put işlemi yapıp bu email güncellemek istiyorum. İşte burada bu validasyon çalışmaz. Ama benim emailimin değişiklik yaparken de bu validasyona uyması gerekir. İşte update işlemlerinde de yazdığım validasyonlar kontrol edilsin istiyorsam o zaman runValidators:true diyorum.

    const isLead = req.body?.isLead || false;
    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await Personnel.updateMany(
        { departmentId, isLead: true },
        { isLead: false }
      );
    }

    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Delete Personnel"
    */

    const data = await Personnel.deleteOne({ _id: req.params.id });

    //! const isDeleted = data.deletedCount >=1 ? true : false;
    //! res.status(isDeleted ? 204 : 404 ).send({
    //!       error: !isDeleted,
    //!       data,
    //!     });

    //! Yukarıda yaptığım işlemi aşağıda daha kısa bir şekilde yazdım. Benim datamın içinde deletedCount diye bir metod var, eğer data silindiyse buraya silinen data sayısı geliyor, silinmediyse 0 geliyor. Ben de diyorum ki bu gelen sayı 1den büyük ya da eşitse true döndür değilse false döndür. Ve status kodunu da bu şarta göre gönderiyorum. Eğer silinen birşey varsa 204 gönder yoksa 404 gönder. error kısmına da !isDeleted yazıyorum, yani datam silindiyse bu true gelecek ama işlemde bir hata yok yani silindi dolayısıyla error:false yazması gerekiyor. Dönen değerin tam tersi yani, o nedenle isDeleted tersini alıyorum. Ama bunu bu şekilde uzun uzun yazmaya gerek yok; deletedCount'un 1 ve 1den büyük olması true demektir, 0'a eşit olması false demektir. O nedenle aşağıda işlemleri o şekilde yeniden yazdık.

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
