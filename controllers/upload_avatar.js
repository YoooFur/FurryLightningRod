const formidable = require('formidable')
const fs = require('fs')
const { User } = require('../models')


const uploadPath = '/avatar/'

const upload = (req, res) => {
    let form = new formidable.IncomingForm()   //创建上传表单
    form.encoding = 'utf-8'        //设置编辑
    form.uploadDir = 'files' + uploadPath    //设置上传目录
    form.keepExtensions = true     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024   //文件大小
  
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.locals.error = err
        res.send('error')
        return
      }
      console.log(files);
  
      var extName = '';  //后缀名
      switch (files.avatar.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
      }
  
      if(extName.length == 0){
        res.status(400).send({message:'只支持png和jpg格式图片'})
        return;
      }
      var avatarName = Math.random() + '.' + extName;
      //图片写入地址；
      var newPath = form.uploadDir + avatarName;
      //显示地址；
      var showUrl = 'http://api.furrylightningrod.com:29999' + uploadPath + avatarName;
      console.log("newPath",newPath);
      fs.renameSync(files.avatar.path, newPath)  //重命名
      res.send({
        newPath: showUrl,
        avatarPath: avatarName
      })
    })
}

module.exports = {
    upload
}