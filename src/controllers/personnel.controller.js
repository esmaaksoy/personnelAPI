"use strict";

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personnel, {}, "departmentId");

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data,
    });
  },

  create: async (req, res) => {
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
    const data = await Personnel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {

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

  login: async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      if (user) {
        req.session = {
          id: user._id,
          password: user.password,
        };

        if (req.body?.rememberMe) {
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
        }

        res.status(200).send({
          error: false,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entry username and password.");
    }
  },

  logout: async (req, res) => {
    req.session = null;
    res.status(200).send({
      error: false,
      message: "Logout: Sessions Deleted.",
    });
  },
};
