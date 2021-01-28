const fs = require('fs')


// 上传文件数据接口
const upload_img = (req, res) => {
    var imgDataArr = req.body.imgData
    // console.log(req.body.imgData)
    //为了防止文件同名,使用时间戳加随机数的方式命名文件
    var imgList = []
    imgDataArr.split('@').forEach(imgData=>{
        if(imgData!=""){
            var fileName = Date.now().toString()+Math.ceil(Math.random()*10000)+".jpg"
            imgList.push("/img/"+fileName)
            //传递的数据进行替换
            var base64Data = imgData.replace(/^data:image\/\w+;base64,/,"")
            var dataBuffer = new Buffer(base64Data,'base64')
            fs.writeFile('./files/img/'+fileName,dataBuffer,err=>{
                if(err){
                    console.log(err)
                }
                else{
                }
            })

        }
    })
    res.status(200).json({
        message: '图片上传成功',
        data:imgList
    })
}

// 导出
module.exports = {
    upload_img,
}
