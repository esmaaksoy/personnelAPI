"use strict";

module.exports = {
  //! yetki kontrollerini yaparken devam etsin ya da etmesin işlemini next() ile yapıyorum. Eğer kullanıcı login ise devam etsin yani next()

  isLogin: (req, res, next) => {
    
    //!Normalde auth.controller dosyasında kullanıcı login olurken bu kullanıcı isActive mi diye bakıyorum, yani şuan aktif olarak çalışıyor mu? Burada tekrar bakmama gerek var mı ? Evet var, çünkü kullanıcı login olduktan sonra ben onu işten çıkarmış olabilirim yani isActive false olur, bu durumda işlemlere devam edememesi lazım

    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },

  //! Admin her departmanı görebilir ama Lead sadace kendi departmanını görebilir
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },

  isAdminOrLead: (req, res, next) => {
    const departmentId = req.params?.id;

    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.departmentId == departmentId))
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "NoPermission: You must login and to be Admin or Department Lead."
      );
    }
  },

  isAdminOrOwn: (req, res, next) => {
    const personnelId = req.params?.id;

    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin || req.user._id == personnelId)
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "NoPermission: You must login and to be Admin or Record Owner."
      );
    }
  },
};
