<template>
  <div class="">
    <div class="">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>学情报告</el-breadcrumb-item>
        <el-breadcrumb-item>生成报告</el-breadcrumb-item>
        <el-breadcrumb-item>阅卷数据</el-breadcrumb-item>
        <el-breadcrumb-item>导入excel</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="backButton">
      <el-button type="primary" class="" @click="back()">返回</el-button>
    </div>
    <div class="p-md mTop">
      <a class="excel pull-right" v-if="haveOption == 1" href="resources/uploadScoreTpl.xls">excel模板下载</a>
      <a class="excel pull-right" v-if="haveOption == 2" href="resources/uploadScoreTplNoOption.xls">excel模板下载</a>
      <div class="mTop" style=" padding: 20px 0;">
        <div class="testInfo mTop text-center p-md m-v-md" style="border: solid 1px grey;box-shadow: grey 5px 5px 5px">
          <h3 class="testName"><strong>{{exam.examName}}</strong></h3>
          <div style="margin-top: 30px">
            <span>考试日期：{{exam.examTime}}</span>
            <span class="m-md">考试学校：{{exam.schoolName}}</span>
            <span class="m-md">学校ID：{{exam.schoolId}}</span>
            <span class="m-md">考试年级：{{exam.gradeName}}</span>
            <span class="m-md">考试类型：
                    <span v-show="exam.examType==2">周测</span>
                    <span v-show="exam.examType==3">月考</span>
                    <span v-show="exam.examType==4">期中考试</span>
                    <span v-show="exam.examType==5">期末考试</span>
                </span>
            <span class="m-md">考试ID：{{exam.examId}}</span>
          </div>
        </div>
        <div style="height:30px;font-size: 2rem" class="mTop text-left">
          <span>当前上传科目：</span><span class="text-danger">{{subjectName}}</span>
        </div>
      </div>
      <div class="mTop upLoad panel panel-default">
        <div class="upLoadTitle panel-heading text-center">
          <h3>录入答题信息</h3>
        </div>
        <div class="panel-body">
          <div style="min-width: 900px; margin: auto;text-align: center;overflow:auto">
            <div class="modal-body">
              <form name="form" style="margin: auto" class="form-horizontal">
                <div class="upLoadOption">
                  <div class="mTop fileInputP vm pull-left" style="cursor: pointer;display: inline-block">
                    <b>选择要上传的班级Excel</b>
                    <input type="file" multiple id="fileInput"/>
                  </div>
                  <div style="display: inline-block">
                    <span>
                      <label class="ui-checks text-sm">
                        <input type="radio" v-model="haveOption" value="1"><i></i> 选择题有选项
                      </label>
                    </span>
                    <span class="m-h-md">
                      <label class="ui-checks text-sm">
                        <input type="radio" v-model="haveOption" value="2"><i></i> 选择题无选项
                      </label>
                    </span>
                  </div>
                  <!--<div style="clear: both"></div>-->
                </div>
                <table width="100%" border="1" class="fileList_parent">
                  <thead>
                  <tr>
                    <th class="text-center">文件名</th>
                    <th class="text-center">类型</th>
                    <th class="text-center">大小</th>
                    <th class="text-center">进度</th>
                    <th class="text-center">状态</th>
                    <th class="text-center">状态说明</th>
                    <th class="text-center">操作</th>
                  </tr>
                  </thead>
                  <tbody class="fileList">
                  </tbody>
                </table>
                <div class="modal-footer mTop">
                  <button type="button" class="el-button el-button--primary btn btn-primary youpu-r" id="fileBtn">上传</button>
                  <button type="button" class="el-button el-button--primary btn btn-danger youpu-r" id="fileBtn2">重置</button>
                  <button type="button" class="el-button btn btn-default youpu-r" @click="cancel()">取消</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        haveOption: '1',
        exam: [],
        subjectName: '',
        homeworkId: '100836'
      }
    },
    mounted(){
      this.operate()
      this.init()
//      console.log(this.api.b64);
    },
    methods: {
      init(){
        if (this.$route.params.join) {
          var decodeStr = this.api.b64.decode(this.$route.params.join);
          this.joinArray = decodeStr.split('-');
        }
        this.examId = this.joinArray[0];
        this.homeworkId = this.joinArray[1];
        this.subjectId = this.joinArray[2];
        if (this.subjectId == 1 || this.subjectId == 5 || this.subjectId == 8 || this.subjectId == 9) {
          this.subjectName = '数学';
        } else if (this.subjectId == 2 || this.subjectId == 6) {
          this.subjectName = '物理';
        } else if (this.subjectId == 7 || this.subjectId == 10) {
          this.subjectName = '化学';
        } else if (this.subjectId == 11) {
          this.subjectName = '英语';
        }
        this.getMessageByHomeworkId();
        this.getPaperInfo();
      },
//  this.haveOption = 1;
      back() {
        this.$router.go(-1)
      },
      async getPaperInfo(){
        let url = '/das/scanExam/getExamInfo'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          examId: this.examId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.exam = data.infoData;
        }
      },
      async getMessageByHomeworkId(){
        let url = '/das/scanExam/getMessageByHomeworkId'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: this.homeworkId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.byclassInfo = data;
        }
      },
      operate(){
        var oFileBox = $(".fileBox");					//选择文件父级盒子
        var oFileInput = $("#fileInput");				//选择文件按钮
        var oFileSpan = $("#fileSpan");					//选择文件框
        var oFileList_parent = $(".fileList_parent");	//表格
        var oFileList = $(".fileList");					//表格tbody
        var oFileBtn = $("#fileBtn");					//上传按钮
        var oFileBtn2 = $("#fileBtn2");					//上传按钮
        oFileBtn2.hide();
        var flieList = [];								//数据，为一个复合数组
        var sizeObj = [];								//存放每个文件大小的数组，用来比较去重
        $('#fileInput').on("change", function () {
          analysisList(this.files);
        });
        //通过文件名，返回文件的后缀名
        function fileType(name) {
          var nameArr = name.split(".");
          return nameArr[nameArr.length - 1].toLowerCase();
        }

        //解析列表函数
        function analysisList(obj) {
          //如果没有文件
          if (obj.length < 1) {
            return false;
          }
          for (var i = 0; i < obj.length; i++) {
            var fileObj = obj[i];		//单个文件
            var name = fileObj.name;	//文件名
            var size = fileObj.size;	//文件大小
            var type = fileType(name);	//文件类型，获取的是文件的后缀
            var state = 0;	//文件类型，获取的是文件的后缀

            //文件大于30M，就不上传
            if (size > 1024 * 1024 * 1024) {
              alert('“' + name + '”超过了30M，不能上传');
              return;
            }
            //文件类型不为这三种，就不上传
            if (("xlsx/xls").indexOf(type) == -1) {
              alert('“' + name + '”文件类型不对，不能上传');
              return;
            }
            //把文件大小放到一个数组中，然后再去比较，如果有比较上的，就认为重复了，不能上传
            if (sizeObj.indexOf(name) != -1) {
              alert('“' + name + '”已经选择，不能重复上传');
              return;
            }
            //给json对象添加内容，得到选择的文件的数据
            var itemArr = [fileObj, name, size, type, state];	//文件，文件名，文件大小，文件类型
            flieList.push(itemArr);
            //把这个文件的大小放进数组中
            sizeObj.push(name);
          }
          createList();				//生成列表
          oFileList_parent.show();	//表格显示
          oFileBtn.show();			//上传按钮显示
          oFileBtn2.hide();			//上传按钮显示
          // oFileBtn.show();			//上传按钮显示
        }

        this.cancel = function () {
          $('#fileInput').replaceWith($('#fileInput').val('').clone(true));
          flieList = [];
          sizeObj = [];
          oFileList.empty();
        };

        //生成列表
        function createList() {
          oFileList.empty();					//先清空元素内容
          for (var i = 0; i < flieList.length; i++) {
            var fileData = flieList[i];		//flieList数组中的某一个
            var objData = fileData[0];		//文件
            var name = fileData[1];			//文件名
            var size = fileData[2];			//文件大小
            var type = fileData[3];			//文件类型
            var state = fileData[4];			//文件类型
            var stateCn = '';
            var volume = bytesToSize(size);	//文件大小格式化
            var oTr = $("<tr></tr>");
            var str = '<td class="text-center"><cite title="' + name + '">' + name + '</cite></td>';
            str += '<td class="text-center">' + type + '</td>';
            str += '<td class="text-center">' + volume + '</td>';
            str += '<td class="text-center">';
            str += '<div class="progressParent" style="margin: auto">';
            str += '<p class="progress"></p>';
            str += '<span class="progressNum">0%</span>';
            str += '</div>';
            str += '</td>';
            if (state == 0) {
              stateCn = '待上传';
            }
            str += '<td class="text-center">' + stateCn + '</td>';
            str += '<td class="text-center" style="max-width: 200px">' + '' + '</td>';
            str += '<td class="text-center"><a href="javascript:;" class="operation2"></a><a href="javascript:;" class="operation"><i class="el-icon-delete text-center" style="color: orangered;"></i></a></td>';
            oTr.html(str);
            oTr.appendTo(oFileList);
          }
        }

        //删除表格行
        oFileList.on("click", "a.operation", function () {
          var oTr = $(this).parents("tr");
          var index = oTr.index();
          oTr.remove();		//删除这一行
          flieList.splice(index, 1);	//删除数据
          sizeObj.splice(index, 1);	//删除文件大小数组中的项
        });
        oFileBtn2.on("click", function () {
          $('#fileInput').replaceWith($('#fileInput').val('').clone(true));
          flieList = [];
          sizeObj = [];
          oFileList.empty();
          oFileBtn2.hide();
        })
        //上传
        oFileBtn.on("click", () => {
          var tr = oFileList.find("tr");		//获取所有tr列表
          var successNum = 0;					//已上传成功的数目
          oFileList.find("a.operation").text("等待上传");
          var uploadFn = (obj, i) => {
            var formData = new FormData();
            var arrNow = flieList[i][0];						//获取数据数组的当前项
            // 从当前项中获取上传文件，放到 formData对象里面，formData参数以key name的方式
            //formData.append("homeworkId" , this.$route.params.homeworkId);
            formData.append("file", arrNow);
            var progress = obj.find(".progress");			//上传进度背景元素
            var progressNum = obj.find(".progressNum");		//上传进度元素文字
            var oOperation = obj.find("a.operation");		//按钮
            var operation2 = obj.find("a.operation2");		//按钮
            operation2.text("上传中");						//改变操作按钮
            oOperation.text("");						//改变操作按钮
            //oOperation.off();
            if (flieList[i][4] == 1) {
              return;
            }
            $(obj).children('td:nth-child(5)').html('正在上传');
            var request = $.ajax({
              type: "POST",
              url: this.global.jiekou_url + '/das/scanExam/uploadExcelAll?system=' + this.global.system + '&uid=' + this.global.uid + '&sid=' + this.global.sid + '&homeworkId=' + this.homeworkId + '&type=' + this.haveOption,
              data: formData,			//这里上传的数据使用了formData 对象
              processData: false, 	//必须false才会自动加上正确的Content-Type
              contentType: false,
              //这里我们先拿到jQuery产生的XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用
              xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                if (onprogress && xhr.upload) {
                  xhr.upload.addEventListener("progress", onprogress, false);
                  return xhr;
                }
              },
              //上传成功后回调
              success: function (data) {
                var data0 = JSON.parse(data);
                if (data0.recode == 0) {
                  operation2.text("成功");
                  $(obj).children('td:nth-child(5)').html('已上传');
                  $(obj).children('td:nth-child(6)').html('上传成功');
                  successNum++;
                  flieList[i][4] = 2;
                  if (successNum == tr.length) {
                    this.$message({
                      message: '上传成功!',
                      type: 'success',
                      showClose: true
                    })
                  }
                } else {
                  $(obj).children('td:nth-child(5)').html('上传失败');
                  $(obj).children('td:nth-child(6)').html(data0.errmsg);
                  var str = '';
                  str += '<i class="glyphicon glyphicon-trash text-center" style="color: orangered;"></i>';
                  oOperation.html(str);
                  operation2.text("上传失败 ");
                  operation2.css('color', 'red')
                  // operation2.on("click", function () {
                  //     request.abort();		//终止本次
                  //     uploadFn(obj, i);
                  // });
                }
              },
              //上传失败后回调
              error: function (data) {
                $(obj).children('td:nth-child(5)').html('上传失败');
                $(obj).children('td:nth-child(6)').html(data.errmsg);
                var str = '';
                str += '<i class="glyphicon glyphicon-trash text-center" style="color: orangered;"></i>';
                oOperation.html(str);
                operation2.text("重传 ");
                operation2.on("click", function () {
                  request.abort();		//终止本次
                  uploadFn(obj, i);
                });
              }
            });
            //侦查附件上传情况 ,这个方法大概0.05-0.1秒执行一次
            function onprogress(evt) {
              var loaded = evt.loaded;	//已经上传大小情况
              var tot = evt.total;		//附件总大小
              var per = Math.floor(100 * loaded / tot);  //已经上传的百分比
              progressNum.html(per + "%");
              progress.css("width", per + "%");
            }
          }
          for (var i = 0; i < tr.length; i++) {
            uploadFn(tr.eq(i), i);		//参数为当前项，下标
          }
          oFileBtn2.show();
          oFileBtn.hide();

        });
        //字节大小转换，参数为b
        function bytesToSize(bytes) {
          var sizes = ['Bytes', 'KB', 'MB'];
          if (bytes == 0) return 'n/a';
          var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
          return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
        }

        //通过文件名，返回文件的后缀名
        function fileType(name) {
          var nameArr = name.split(".");
          return nameArr[nameArr.length - 1].toLowerCase();
        }
      }
    }
  }
</script>

<style scoped>
.fileBox {
  margin: 50px;
}

.fileInputP {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.fileInputP b {
  display: inline-block;
  width: 200px;
  height: 40px;
  color: #fff;
  background: #0cc3b3;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

#fileInput {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}

#fileSpan {
  width: 400px;
  height: 200px;
  border: 2px dashed #ccc;
  text-align: center;
  line-height: 150px;
  margin: auto;
}

.fileList_parent {
  display: none;
}

.fileList_parent th {
  background: #0cc3b3;
  font-weight: bold;
  color: white
}

.fileList_parent th, .fileList_parent td {
  padding: 5px;
}

.fileList tr:nth-of-type(2n) {
  background: #eee;
}

.progressParent {
  width: 200px;
  height: 20px;
  border-radius: 5px;
  background: #2b2a2a;
  overflow: hidden;
  position: relative;
}

.progress {
  width: 0;
  height: 20px;
  background: #7d8f33;
}

.progressNum {
  display: inline-block;
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
}

#fileBtn {
  display: none
}

.backButton {
  text-align: right;
}

.downLoadExcel {
  text-align: right;
}
.excel{
  text-decoration: none;
}
.testInfo {
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0;
}

.testName {
  font-size: 26px;
  font-weight: bold;
}

.text-danger {
  color: #f00;
}

.upLoad {
  border: 1px solid grey;
  text-align: center;
  padding-bottom: 20px;
}

.upLoadTitle {
  font-size: 26px;
  font-weight: bold;
  background-color: #fff2ea;
  line-height: 60px;
  height: 60px;
}

.upLoadOption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
