const express = require('express')
const app = express();
const resHttpOutput = require('res-http-output')
const bodyParser = require('body-parser')
const pool = require('./configs/mysql')
const moment = require('moment');
const uuid = require('uuid')
const path = require('path')
const multiparty = require('multiparty')
const fs = require('fs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    next();
})

app.get("/api/getList", function (req, res) {
    const { pageSize, pageNumber } = req.query;
    var sqlcount = `SELECT count(*) as count FROM book_list WHERE 1`
    var sql = `SELECT * FROM book_list WHERE 1 ORDER BY updatetime desc LIMIT ${Number(pageNumber) - 1},${Number(pageSize)}`

    async function name() {
        let count = await new Promise(function (resolve, reject) {
            pool.query(sqlcount, function (err, result) {
                if (err) {
                    var obj = {
                        "message": "查询错误",
                        "SQL": sql,
                        "err": err
                    }
                    reject(obj)
                } else {
                    resolve(result[0])
                }
            })
        });
        if (count.message) {
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, count);
        } else {
            let result = await new Promise(function () {
                pool.query(sql, function (err, result) {
                    if (err) {
                        var obj = {
                            "message": "查询错误",
                            "SQL": sql,
                            "err": err
                        }
                        resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                    } else {
                        var num;
                        if ((Number(count.count) / Number(pageSize)).toString().indexOf(".") > 0) {
                            num = (Number(count.count) / Number(pageSize)) + 1;
                        } else {
                            num = (Number(count.count) / Number(pageSize));
                        }
                        var arr = [];
                        for (var i = 1; i <= num; i++) {
                            arr.push(i)
                        }
                        for (let i = 0; i < result.length; i++) {
                            result[i].updatetime = moment(result[i].updatetime).format("YYYY-MM-DD HH:mm:ss")
                        }
                        var obj = {
                            "message": "查询成功",
                            "code": 200,
                            "data": {
                                count: count.count,
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                                pageList: arr,
                                list: result
                            }
                        }
                        resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                    }
                })
            })
        }
    }
    name();
})

app.get("/api/searchList", function (req, res) {
    const { keywords } = req.query;
    var sql = `SELECT * FROM book_list WHERE \`name\` LIKE '%${keywords}%' ORDER BY updatetime desc `
    pool.query(sql, function (err, result) {
        if (err) {
            var obj = {
                "message": "查询错误",
                "SQL": sql,
                "err": err
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        } else {
            for (let i = 0; i < result.length; i++) {
                result[i].updatetime = moment(result[i].updatetime).format("YYYY-MM-DD HH:mm:ss")
            }
            var obj = {
                "message": "查询成功",
                "code": 200,
                "data": {
                    list: result
                }
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        }
    })

})

app.get('/api/getId', function (req, res) {
    const { id } = req.query;
    var sql = `SELECT * FROM book_list WHERE id='${id}'`;
    pool.query(sql, function (err, result) {
        if (err) {
            var obj = {
                message: "请求失败",
                error: err
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        } else {
            var obj = {
                message: "请求成功",
                code: 200,
                data: result
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        }
    })
})

app.post('/api/postDelete', function (req, res) {
    const { id } = req.body;
    var sql = `DELETE FROM book_list WHERE id='${id}'`;
    pool.query(sql, function (err, result) {
        if (err) {
            var obj = {
                message: "删除错误",
                error: err
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        } else {
            var obj = {
                message: "删除成功",
                code: 200
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        }
    })
})

app.post('/api/postForm', function (req, res) {
    var form = new multiparty.Form()
    form.uploadDir = __dirname + "/upload";
    var newName = moment().format("YYYYMMDD-HHmmss") + "--" + uuid().split("-").join("");
    form.parse(req, function (err, fileds, files) {
        console.log(fileds,files)
        var bookName = fileds.bookname.join("");
        if (err) {
            var obj = {
                message: "获取上传失败",
                error: err
            }
            resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
        } else {

        }
        if (fileds.id) {
            var editId = fileds.id.join("")
            // var fileStuts = fileds.file.join("")
            if (!files.file) {
                var sql = `UPDATE book_list SET \`name\`='${bookName}' WHERE id='${editId}'`;
                pool.query(sql, function (err, result) {
                    if (err) {
                        var obj = {
                            message: "更新数据错误",
                            error: err,
                            sql:sql
                        }
                        resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                    } else {
                        var obj = {
                            message: "更新数据成功",
                            code: 200,
                            sql:sql
                        }
                        resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                    }
                })
            } else {
                filessss();
            }
        } else {
            filessss();
        }
        function filessss() {
            if (err) {
                console.log('parse error: ' + err);
            } else {
                var inputFile = files.file[0];
                var uploadedPath = inputFile.path;
                var type = inputFile.originalFilename.split(".")[inputFile.originalFilename.split(".").length - 1];
                var yuanPath = '/bookTagRunner/' + newName + "." + type;
                var dstPath = __dirname + "/public" + yuanPath;
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        var obj = {
                            message: "移动文件出错",
                            error: err
                        }
                        resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                    } else {
                        if(fileds.id){
                            var sql = `UPDATE book_list SET \`name\`='${bookName}',imgurl='${yuanPath}' WHERE id='${fileds.id.join("")}'`;
                        }else{
                            var sql = `INSERT INTO book_list(\`name\`,updatetime,imgurl) VALUES('${bookName}','${moment().format("YYYY-MM-DD HH:mm:ss")}','${yuanPath}')`
                        }
                       
                        pool.query(sql, function (err, result) {
                            if (err) {
                                var obj = {
                                    message: "插入数据错误",
                                    error: err,
                                    sql:sql
                                }
                                resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                            } else {
                                var obj = {
                                    message: "插入数据成功",
                                    code: 200,
                                    sql:sql
                                }
                                resHttpOutput.init(res, resHttpOutput.AllStatus.e200, obj);
                            }
                        })
                    }
                });
            }
        }
    })
})
app.listen(3001, "127.0.0.1", function (err) {
    err ? console.log(err) : console.log("Ing...");
})