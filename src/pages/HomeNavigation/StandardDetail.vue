<template>
  <div class="box">
    <div class="center" style="position: relative">
      <div id="day" class="white">
        <div id="menu" class="clearfix" style="margin-top: -40px">
          <div>
            <div id="fontSize">
              <span>字号：</span>
              <button id="small" data-index=1>小</button>
              <button id="middle" class="font-active" data-index=2>中</button>
              <button id="big" data-index=3>大</button>
            </div>
            <div id="mode">
              <span>模式：</span>
              <button id="sun"></button>
              <button class="moon" id="moon"></button>
            </div>
          </div>
          <div>
            <div id="language">
              <button class="china lan font-active" @click="languageClick('china')">中文</button>
              <button class="english lan" @click="languageClick('english')">EN</button>
              <button class="shu" @click="languageClick('shu')"></button>
              <button class="heng" @click="languageClick('heng')"></button>
            </div>
            <div id="download" style="cursor: pointer" @click="showDownPdf">
              <button></button>
              <span>下载</span>
            </div>
            <div id="print" style="cursor: pointer" @click="print()">
              <button></button>
              <span>打印</span>
            </div>
          </div>
        </div>
      </div>
      <div id="article-header">
        <div class="line1 clearfix">
          <div id="bread-nav">
            <a v-show="route_name.includes('Index')" @click="$router.push({name: 'Index'})">首页</a>
            <a v-show="route_name.includes('StandardSearch')" @click="$router.push({name: 'StandardSearch'})">标准检索</a>
            <a v-show="route_name.includes('LawSearch')" @click="$router.push({name: 'LawSearch'})">法规检索</a>
            <a v-show="route_name.includes('StandardLawState')" @click="$router.push({name: 'StandardLawState'})">标准法规动态</a>
            <a v-show="route_name.includes('LatestTranslation')" @click="$router.push({name: 'LatestTranslation'})">最新翻译</a>
            <span>/</span>
            <!--<a href="">标准搜索</a>
            <span>/</span>-->
            <a @click="goSelf()">动态详情</a>
          </div>

        </div>
        <div class="line2 clearfix" v-show="detail.f_ChineseTitle">
          <div class="art-title">
            <h3>
              {{detail.f_ChineseTitle}}
              <span style="margin-left: 40px"><b class="green"></b>
              <b class="red" v-show="false"></b>
              <b class="orange" v-show="false"></b></span>
              <span>{{detail.f_FileState}}</span>
            </h3>
            <h3>
              {{detail.f_EnglishTitle}}
              <span style="margin-left: 40px"><b class="green"></b>
              <b class="red" v-show="false"></b>
              <b class="orange" v-show="false"></b></span>
              <span>{{detail.f_FileState}}</span>
            </h3>
          </div>
        </div>
        <div class="line3" v-show="detail.f_ChineseTitle">
          <div class="effectiveDate" v-show="showDate">
            <span v-show="detail.f_ReleaseDate">发布日期（Date issued）{{new Date(detail.f_ReleaseDate).getTime() | formatTime('YMD')}}</span>
            <span style="margin-left: 40px" v-show="detail.f_ImplementDate">实施日期（Effective date）{{new Date(detail.f_ImplementDate).getTime() | formatTime('YMD')}}</span>
          </div>
          <div class="label" v-if="detail.f_Label">
            <span v-for="row in detail.f_Label.split('；')" v-show="row">{{row}}</span>
          </div>
          <span class="doSave" style="float: right;cursor: pointer;color: red" v-show="!isSave" @click="Save()">收藏</span>
          <span class="no-heart fav" style="float:right;" v-show="!isSave"></span>
          <span class="doSave" style="float: right;cursor: pointer;color: red" v-show="isSave" @click="unSave()">已收藏</span>
          <span class="heart fav" style="float:right;" v-show="isSave"></span>
        </div>
      </div>
      <div :class="{'see_onePage' : !user_name}">
        <article id="article">

        </article>
      </div>
      <div class="noMemeber" v-show="!user_name">
        <h3>以下内容仅对<span>普通会员</span>开放</h3>
        <p>
          您好：您现在要进入的是中国汽车标准法规网会员专区。
        </p>
        <p>
          如您是我们的会员可直接<a @click="goLogin()">登录</a>，进入会员专区查询您所需要的信息；如您还不是我们的会员；您可通过线下支付进行单篇购买，支付成功后即可通过邮件获取本内容；如果标识为”以下内容仅对高级会员开放”，您可登录后，选择升级为高级会员，升级方法可查看：如何<a @click="goUserCenter()">升级为高级会员？</a>
        </p>
        <div class="noMemeber_button">
          <el-button @click="goRegister()">注册普通会员</el-button>
          <el-button type="primary" style="margin-left: 20px" @click="goUserCenter()">成为高级会员</el-button>
        </div>
        <p class="p_center">
          已经是会员，马上<a @click="goLogin()">登录</a></p>
      </div>
      <!--<div class="article">
        <div v-html="detail.f_ChineseContent"></div>
      </div>-->
      <button id="backTop"></button>
      <div id="directory" @click="directoryClick()" v-show="showMuluButton">

      </div>
      <div class="directory" v-show="isShowDirectory" @click.stop="muluClick()">

      </div>
    </div>
    <!--下载pdf-->
    <el-dialog
      :visible.sync="downDialog"
      width="50%"
      center>
      <span slot="title">
        <span>当前下载</span>
        <span style="color: red">{{downTitle}}</span>
      </span>
      <div>
        <span>选择语言：</span>
        <el-radio-group v-model="select_language">
          <el-radio :label="1">中文</el-radio>
          <el-radio :label="2">英文</el-radio>
          <el-radio :label="3">中英文（上下）</el-radio>
        </el-radio-group>
      </div>
      <div>
        <h2 style="height: 30px;line-height: 30px">选择章节：</h2>
        <el-table
          ref="multipleTable"
          :data="chapterList"
          tooltip-effect="dark"
          style="width: 455px"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="全部选择"
            prop="name"
            width="400">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="downDialog = false">取 消</el-button>
    <el-button type="primary" @click="confirmDown">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        documentId: '',
        languageType: 1,
        memberId: '',
        detail: {},
        downDialog: false,
        downTitle: '汽车侧面碰撞的乘员保护.pdf',
        select_language: 1,
        chapterList: [{
          id: '2',
          name: '汽车侧面碰撞的乘员保护',
        }, {
          id: '3',
          name: '1 范围',
        }, {
          id: '4',
          name: '2 规范性引用文件',
        }, {
          id: '5',
          name: '3 术语和定义',
        }, {
          id: '6',
          name: '4 技术要求',
        }, {
          id: '6',
          name: '5 车辆型式的变更',
        }],
        multipleSelection: [],
        isSave: false,
        residueDownloadNum: 0,
        isShowDirectory: false,
        scroll: '',
        showMuluButton: false,
        hasCatalogue: false,
        downType: '',  //1 下载  2 打印
        idList: [],
        aList: [],
        pre_scrollTop: 0,
        showDate: true
      }
    },
    computed: {
      route_name() {
        //this.route_name_cur = this.$store.state.route_name
        return this.$store.state.route_name
      },
      user_name() {
        return this.$store.state.username
      }
    },
    mounted() {
      $('.effectiveDate span').hover(function () {
        $(this).css({
          background: '#E8E8E8'
        })
      },function () {
        $(this).css({
          background: '#ffffff'
        })
      })
      $('.art-title h3').hover(function () {
        $(this).css({
          background: '#E8E8E8'
        })
      },function () {
        $(this).css({
          background: '#ffffff'
        })
      })
      window.addEventListener('scroll', this.scrollMove)
      $("#fontSize button").click(function () {
        $("#fontSize button").removeClass("font-active");
        $(this).addClass("font-active")
      })
      $("#small").click(function () {
        setFongSize("12px");
        $("#middle").removeClass("font-active");
        $("#small").addClass("font-active");
        $("#big").removeClass("font-active");
      });
      $("#middle").click(function () {
        setFongSize("16px");
        $("#middle").addClass("font-active");
        $("#small").removeClass("font-active");
        $("#big").removeClass("font-active");
      });
      $("#big").click(function () {
        setFongSize("20px");
        $("#middle").removeClass("font-active");
        $("#small").removeClass("font-active");
        $("#big").addClass("font-active");
      });
      function setFongSize(s) {
        $("#article *").css("font-size", s);
      }
      //sun  article.css
      $("#sun").click(function () {
        $('#article p').css({
          background: '#ffffff',
          color: '#666666'
        })
        $('.label span').css({
          background: '#f5f5f5',
          border: '1px solid #d9d9d9',
          color: '#2c3e50'
        })
        $('.art-title h3').css({
          background: '#ffffff',
          color: '#2c3e50'
        })
        $('.effectiveDate span').css({
          background: '#ffffff',
          color: '#2c3e50'
        })
        $(".doSave").css({
          color: 'red'
        })
        $('.effectiveDate span').hover(function () {
          $(this).css({
            background: '#E8E8E8'
          })
        },function () {
          $(this).css({
            background: '#ffffff'
          })
        })
        $('.art-title h3').hover(function () {
          $(this).css({
            background: '#E8E8E8'
          })
        },function () {
          $(this).css({
            background: '#ffffff'
          })
        })
        $(".black").attr("class", "white");
        $('#article').css({
          background: '#ffffff'
        })
        $('#article-header').css({
          background: '#ffffff'
        })
        $('.box').css({
          background: '#f1f1f1'
        })
        $('.directory').css({
          background: '#ffffff'
        })
        $('#article *').css({
          color: '#666666'
        })
        $('#article p').hover(function () {
          $(this).css({
            background: '#E8E8E8'
          })
        },function () {
          $(this).css({
            background: '#ffffff'
          })
        })
      });
      //moon skinnight
      $("#moon").click(function () {
        $('#article p').css({
          background: '#191919'
        })
        $(".white").attr("class", "black");
        $('#article').css({
          background: '#191919'
        })
        $('#article-header').css({
          background: '#191919'
        })
        $('.art-title h3').css({
          background: '#191919'
        })
        $('.effectiveDate span').css({
          background: '#191919'
        })
        $('.box').css({
          background: '#282828'
        })
        $('.directory').css({
          background: '#191919'
        })
        $('#article *').css({
          color: '#808080'
        })
        $('#article p').hover(function () {
          $(this).css({
            background: '#080808'
          })
        },function () {
          $(this).css({
            background: '#191919'
          })
        })
        $('.art-title h3').hover(function () {
          $(this).css({
            background: '#080808'
          })
        },function () {
          $(this).css({
            background: '#191919'
          })
        })
        $('.effectiveDate span').hover(function () {
          $(this).css({
            background: '#080808'
          })
        },function () {
          $(this).css({
            background: '#191919'
          })
        })
        $("#article-header *").css({
          color: '#808080'
        })
        $('.label span').css({
          background: '#191919',
          border: '1px solid #d9d9d9'
        })
      });
      $("#contents_list li").mouseover(function () {
        $(this).children("a").addClass("active_logo");
      })
      //set heng shu active 中china 英english  font-active
      $(".shu").click(function () {
        $(".heng").removeClass("active");
        $(".shu").addClass("active");
        $(".china").removeClass("font-active");
        $(".english").removeClass("font-active");
      });
      $(".heng").click(function () {
        $(".heng").addClass("active");
        $(".shu").removeClass("active");
        $(".china").removeClass("font-active");
        $(".english").removeClass("font-active");
      });
      $(".china").click(function () {
        $(".heng").removeClass("active");
        $(".shu").removeClass("active");
        $(".china").addClass("font-active");
        $(".english").removeClass("font-active");
      });
      $(".english").click(function () {
        $(".heng").removeClass("active");
        $(".shu").removeClass("active");
        $(".china").removeClass("font-active");
        $(".english").addClass("font-active");
      });
      $("#backTop").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 500);
      });
      this.memberId = this.global.memberId
      this.documentId = this.$route.params.id
      //this.AddDocumentVisitInfo()
      this.GetDocumentInfoById()
      //this.getDetail()
      //this.GetWordContent()
    },
    methods: {
      async AddDocumentVisitInfo() {
        let url = '/OtherService.asmx/AddDocumentVisitInfo'
        let params = {
          memberId: this.global.memberId,
          documentId: this.documentId,
          type: this.languageType
        }
        let data = await this.api.get(url, params)
        if(data){
        }
      },
      scrollMove() {
        if(this.route_name.includes('StandardDetail')) {
          let arr = []
          if(this.idList.length > 0) {
            for(let j = 0, len2 = this.idList.length; j < len2; j++) {
              if($('#' + this.idList[j].id).offset()) {
                if($('#' + this.idList[j].id).offset().top >= $(window).scrollTop()) {
                  arr.push(this.idList[j])
                }
              }
            }
            arr.sort(function (a, b) {
              return ($('#' + a.id).offset().top - $(window).scrollTop()) - ($('#' + b.id).offset().top - $(window).scrollTop())
            })
            $('.directory p *').css({
              color: '#777777'
            })
            if(arr.length > 0) {
              $('a[href=' + arr[0].href + ']').children().css({
                //color: 'rgb(5, 99, 193)'
                color: 'blue'
              })
              /*$('a[href=' + arr[0].href + ']').parent().css({
                background: 'gray'
              })*/
              //console.log($(window).scrollTop())
            }
          }
          this.scroll = document.documentElement.scrollTop || document.body.scrollTop
          if(this.scroll >= 100){
            $("#commNav").css({
              position: 'fixed',
              top: 0,
              zIndex: 100
            })
            $('#day').css({
              width: '85%',
              position: 'fixed',
              top: '100px',
              zIndex: 100
            })
          }else{
            $("#commNav").css({
              position: 'relative'
            })
            $('#day').css({
              width: '100%',
              position: ''
            })
          }
          if(this.scroll > this.pre_scrollTop){
            this.showDate = false
          } else {
            this.showDate = true
          }
          this.pre_scrollTop = this.scroll
          if(this.scroll > $(window).height()) {
            /*if(!(this.global.HYType == 1 || this.global.HYType == 2)) {
              document.documentElement.scrollTop = $(window).height()
              document.body.scrollTop = $(window).height()
              this.$message({
                showClose: true,
                message: '游客或者普通会员只能看一页，赶快去升级为高级会员！'
              });
            }*/
            if(this.hasCatalogue && this.user_name) {
              this.showMuluButton = true
            }
          } else {
            this.showMuluButton = false
            this.isShowDirectory = false
          }
        }
      },
      languageClick(str) {
        if(str == 'shu') {
          this.GetDocumentInfoById(4);
        } else if (str == 'heng') {
          this.GetDocumentInfoById(1);
        } else if (str == 'china') {
          this.GetDocumentInfoById(2);
        } else if (str == 'english') {
          this.GetDocumentInfoById(3);
        }
      },
      confirmDown() {

      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showDownPdf() {
        this.downType = 1
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '请您先登录，游客不能打印！'
          });
          return
        }
        if(!(this.global.HYType == 1 || this.global.HYType == 1)) {
          this.$message({
            showClose: true,
            message: '该操作只有高级会员才有请您先升级为高级会员！'
          });
          return
        }
        this.GetMemberInfo()
        //this.downDialog = true
      },
      async GetDocumentInfoById(type) {
        if(!type) {
          type = 2
        }
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        let url = 'DocumentService.asmx/GetDocumentInfoById'
        let params = {
          documentId: this.documentId,
          memberId: this.global.memberId,
          languageType: this.languageType,
          type: type
        }
        let data = await this.api.post(url, params, {loading: true})
        if (data) {
          this.AddDocumentVisitInfo()
          this.isSave = data.isCollect
          this.detail = data.documentEntity
          if(!data.catalogue) {
            this.hasCatalogue = false
          } else {
            this.hasCatalogue = true
          }
          $('#article').html(data.strChinese)
          $('.directory').html(data.catalogue)
          if(type == 4){
            $('#article table tr td').css({
              padding: '0 10px'
            })
          }
          $(".directory *").css('font-size', '10px')
          $('.directory p').css({
            'margin-top': 0,
            'margin-bottom': 0
          })
          for(let i = 0, len = $('.directory p').length; i < len; i++){
            if($('.directory p:eq(' + i + ')').css('margin-left') == '32px'){
              $('.directory p:eq(' + i + ')').css('margin-left', '16px')
            }
            if($('.directory p:eq(' + i + ')').css('margin-left') == '64px'){
              $('.directory p:eq(' + i + ')').css('margin-left', '32px')
            }
            if($('.directory p:eq(' + i + ')').css('margin-left') == '96px'){
              $('.directory p:eq(' + i + ')').css('margin-left', '48px')
            }
          }
          this.aList = $('.directory p a')
          for (let i = 0, len = this.aList.length; i < len; i++) {
            this.idList.push({
              href: '#' + this.aList[i].href.split('#')[1],
              id: this.aList[i].href.split('#')[1]
            })
          }
        }
      },
      async Save() {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '请您先登录，才可以进一步操作！'
          });
          return
        }
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '请登录以后才可以收藏！'
          });
          return
        }
        let url = 'OtherService.asmx/AddMyCollect'
        let params = {
          documentId: this.documentId,
          memberId: this.global.memberId,
        }
        let data = await this.api.post(url, params)
        if (data) {
          if (data[0] == 1) {
            this.$message({
              showClose: true,
              message: '收藏成功！'
            });
            this.isSave = true
          } else if(data[0] == 2) {
            this.$message({
              showClose: true,
              message: '已经收藏！',
              type: 'warning'
            });
            this.isSave = true
          }else {
            this.$message({
              showClose: true,
              message: '收藏失败！',
              type: 'warning'
            });
            this.isSave = false
          }
        }
      },
      async unSave() {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '请您先登录，才可以进一步操作！'
          });
          return
        }
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        let url = 'OtherService.asmx/DelMyCollect'
        let params = {
          documentId: this.documentId,
          memberId: this.global.memberId,
        }
        let data = await this.api.post(url, params)
        if (data) {
          if (data[0] == true) {
            this.$message({
              showClose: true,
              message: '取消收藏成功！'
            });
            this.isSave = false
          } else {
            this.$message({
              showClose: true,
              message: '取消收藏失败！',
              type: 'warning'
            });
            this.isSave = true
          }
        }
      },
      async getDetail() {
        let url = 'DocumentService.asmx/GetDocumentInformationInfoById'
        let params = {
          documentId: this.documentId,
          languageType: this.languageType
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.detail = data
        }
      },
      async GetWordContent(type) {
        if(!type) {
          type = 2
        }
        let url = '/DocumentService.asmx/GetWordContent'
        let params = {
          keyword: this.documentId,
          type: type
        }
        let data = await this.api.post(url, params)
        if(data) {
          $("#article").html(data[0]);
        }
      },
      DownloadFile() {
        window.open(`${this.global.jiekou_url}/DocumentService.asmx/DownloadPDFFile?documentId=${this.documentId}&memberId=${this.global.memberId}&languageType=${this.languageType}`)
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        /*let url = 'DocumentService.asmx/DownloadPDFFile'
        let params = {
          documentId: this.documentId,
          memberId: this.global.memberId,
          languageType: this.languageType
        }
        let data = await this.api.get(url ,params)
        if (data) {
          console.log(data)
        }*/
      },
      async GetDownloadInfoStat() {
        let url = '/OtherService.asmx/GetDownloadInfoStat'
        let params = {
          memberId: this.global.memberId
        }
        let data = await this.api.post(url, params, {loading: true})
        if(data){
        }
      },
      async GetMemberInfo() {
        /*this.memberId = 'b60b54ee-d4fb-4085-a873-e8dc95af1039'*/
        let url = 'OtherService.asmx/GetMemberInfo'
        let params = {
          memberId: this.global.memberId
        }
        let data = await this.api.post(url, params, {loading: true})
        if (data) {
          this.residueDownloadNum = data.residueDownloadNum
          if(this.residueDownloadNum < 1) {
            this.$message({
              showClose: true,
              message: '你的下载剩余下载次数不够了，请充值会员后再下载！'
            });
            return
          } else if(this.downType == 1) {
            this.GetDownloadInfoStat()
            this.DownloadFile()
          } else if(this.downType == 2) {
            this.GetDownloadInfoStat()
            this.startPrint()
          }
        }
      },
      directoryClick() {
        this.isShowDirectory = !this.isShowDirectory
      },
      muluClick() {
      },
      print() {
        this.downType = 2
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '请您先登录，游客不能打印！'
          });
          return
        }
        if(!(this.global.HYType == 1 || this.global.HYType == 1)) {
          this.$message({
            showClose: true,
            message: '该操作只有高级会员才有请您先升级为高级会员！'
          });
          return
        }
        this.GetMemberInfo()
        /*let printHtml = document.getElementById("article").innerHTML;//这个元素的样式需要用内联方式，不然在新开打印对话框中没有样式
        let wind = window.open("", 'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
        wind.document.body.innerHTML = printHtml;
        wind.print();*/
      },
      startPrint(){
        let printHtml = document.getElementById("article").innerHTML;//这个元素的样式需要用内联方式，不然在新开打印对话框中没有样式
        let wind = window.open("", 'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
        wind.document.body.innerHTML = printHtml;
        wind.print();
      },
      goLogin(){
        this.$router.push({
          name: 'SignIn'
        })
      },
      goUserCenter(){
        if(!this.global.memberId){
          this.$message({
            showClose: true,
            message: '请先登录或者注册账号！'
          });
          return
        }
        this.$router.push({
          name: 'UserCenter'
        })
      },
      goRegister(){
        this.$router.push({
          name: 'SignUp'
        })
      },
      goSelf(){
        location.reload()
      }
    }
  }
</script>

<style scoped>
  .see_onePage{
    height: 830px;
    overflow: hidden;
  }
  .noMemeber{
    min-height: 400px;
    background-color: #ffffff;
    border-top: 2px solid #1c92fe;
  }
  .noMemeber h3{
    text-align: center;
    font-size: 26px;
    height: 80px;
    line-height: 80px;
  }
  .noMemeber h3 span{
    color: #1c92fe;
  }
  .noMemeber p{
    padding: 0 40px;
    font-size: 16px;
    min-height: 40px;
    line-height: 40px;
  }
  .noMemeber p a{
    color: #1c92fe;
    cursor: pointer;
    text-decoration: underline;
  }
  .noMemeber .p_center{
    text-align: center;
  }
  .noMemeber_button{
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .box{
    width: 100%;
    min-height: 600px;
  }
  .directory{
    width: 228px;
    height: 70%;
    border: 2px solid #cdcdcd;
    border-radius: 10px;
    padding: 0 10px 0;
    overflow: auto;
    position: fixed;
    right: 20px;
    top: 15%;
    background-color: #ffffff;
    z-index: 100;
  }
  .directory p{
    line-height: 42px;
    height: 42px;
  }
  td{
    word-wrap:break-word
  }
  .center {
    width: 85%;
    margin: 0px auto 50px;
  }
  .white #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #d8d8d8;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    font-size: 14px;
  }
  .white #menu button {
    color: #9b9b9b;
  }
  .white #menu span {
    color: #5c5c5c;
  }
  .white #menu .font-active {
    color: #4a90e2;
  }
  .white #fontSize button:hover,
  .white #language button:hover {
    color: #4a90e2;
  }
  .white #sun {
    background: url("../../assets/images/bg.png") -240px -140px;
  }
  .white #moon {
    background: url("../../assets/images/bg.png") -320px -140px;
  }
  .white #moon:hover {
    background: url("../../assets/images/bg.png") -360px -140px;
  }
  .white .shu {
    background: url("../../assets/images/bg.png") -124px -182px;
  }
  .white .shu:hover {
    background: url("../../assets/images/bg.png") -84px -182px;
  }
  .white .shu.active {
    background: url("../../assets/images/bg.png") -84px -182px;
  }
  .white .heng {
    background: url("../../assets/images/bg.png") -202px -182px;
  }
  .white .heng:hover {
    background: url("../../assets/images/bg.png") -162px -182px;
  }
  .white .heng.active {
    background: url("../../assets/images/bg.png") -162px -182px;
  }
  .white #download button {
    background: url("../../assets/images/bg.png") -400px -140px;
  }
  .white #print button {
    background: url("../../assets/images/bg.png") -480px -138px;
  }
  .black #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #6a6a6a;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    color: #9b9b9b;
    font-size: 14px;
  }
  .black #menu span {
    color: #ffffff;
  }
  .black #menu button {
    color: #9b9b9b;
  }
  .black #menu .font-active {
    color: #ffffff;
  }
  .black #fontSize button:hover,
  .black #language button:hover {
    color: #ffffff;
  }
  .black #moon {
    background: url("../../assets/images/bg.png") -360px -140px;
  }
  .black #sun {
    background: url("../../assets/images/bg.png") -280px -140px;
  }
  .black #sun:hover {
    background: url("../../assets/images/bg.png") -240px -140px;
  }
  .black .shu {
    background: url("../../assets/images/bg.png") -284px -182px;
  }
  .black .shu:hover {
    background: url("../../assets/images/bg.png") -244px -182px;
  }
  .black .shu.active {
    background: url("../../assets/images/bg.png") -244px -182px;
  }
  .black .heng {
    background: url("../../assets/images/bg.png") -362px -182px;
  }
  .black .heng:hover {
    background: url("../../assets/images/bg.png") -322px -182px;
  }
  .black .heng.active {
    background: url("../../assets/images/bg.png") -322px -182px;
  }
  .black #download button {
    background: url("../../assets/images/bg.png") -440px -140px;
  }
  .black #print button {
    background: url("../../assets/images/bg.png") -520px -138px;
  }
  #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #dedede;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    color: #515151;
    font-size: 14px;
  }
  #menu > div {
    display: flex;
    align-items: center;
    width: 500px;
    justify-content: space-between;
  }
  #menu > div:last-child {
    justify-content: flex-end;
  }
  #menu > div:first-child {
    justify-content: flex-start;
  }
  #menu button {
    outline: none;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
  #fontSize {
    flex: 2;
  }
  #small,
  #middle,
  #big {
    border: none;
  }
  #small {
    font-size: 14px;
  }
  #middle {
    font-size: 16px;
    margin: 0 10px;
  }
  #big {
    font-size: 18px;
  }
  #mode {
    display: flex;
    flex: 3;
    align-items: center;
  }
  #sun,
  #moon,
  #no-sun,
  #no-moon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 5px;
  }
  /*#artSearch {*/
  /*margin-left: 0px;*/
  /*font-size: 0;*/
  /*background-color: white;*/
  /*border-radius: 5px;*/
  /*overflow: hidden;*/
  /*}*/
  /*#artSearch input {*/
  /*display: inline-block;*/
  /*!*width: 225px;*!*/
  /*height: 28px;*/
  /*padding-left: 10px;*/
  /*vertical-align: top;*/
  /*outline: none;*/
  /*border: none;*/
  /*}*/
  /*.search {*/
  /*display: inline-block;*/
  /*width: 28px;*/
  /*height: 28px;*/
  /*vertical-align: top;*/
  /*background: url("../../assets/images/search.png") no-repeat center;*/
  /*}*/
  #language button {
    /*margin-right: 20px;*/
  }
  #language {
    display: flex;
    justify-content: space-around;
    flex: 2;
  }
  #download {
    display: flex;
    justify-content: flex-end;
    flex: 2;
  }
  #print {
    display: flex;
    justify-content: center;
    flex: 2;
  }
  .shu,
  .heng,
  #download button,
  #print button {
    width: 20px;
    height: 20px;
    vertical-align: top;
  }
  #article-header {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
  .line1 {
    height: 50px;
    box-sizing: border-box;
    padding: 15px 0;
  }
  #bread-nav {
    float: left;
  }
  #bread-nav a,
  #bread-nav span {
    color: #9d9d9d;
  }
  .collection {
    float: right;
  }
  .collection > a {
    display: flex;
    align-items: center;
  }
  .heart {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url("../../assets/images/bg.png") no-repeat -580px -135px;
  }
  .no-heart {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url("../../assets/images/bg.png") no-repeat -540px -135px;
  }
  .art-title,
  .en-art-title {
    width: 100%;
    display: inline-block;
    margin-bottom: 10px;
    font-size: 22px;
    line-height: 1.5;
  }
  .en-art-title h3 {
    font-weight: 200;
    font-size: 16px;
    font-family: sans-serif;
  }
  .flag {
    /*float: right;*/
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
  }
  .point {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #52c41a;
    border-radius: 50%;
    margin-bottom: 1px;
    margin-right: 5px;
  }
  .issuedDate,
  .effectiveDate,
  .label {
    display: inline-block;
    font-size: 14px;
  }
  .effectiveDate {
    margin: 0 55px 0 10px;
  }
  .label span {
    display: inline-block;
    background-color: #f5f5f5;
    padding: 2px 5px;
    margin-left: 15px;
    border: 1px solid #d9d9d9;
    font-size: 10px;
    border-radius: 2px;
  }
  #article-header,
  article {
    background-color: #ffffff;
  }
  #article-header {
    padding: 10px 40px 30px 40px;
    margin-bottom: 20px;
    line-height: 1.5;
    font-family: "Microsoft YaHei";
  }
  article {
    padding: 30px 50px 55px 40px;
    border: 1px solid #c0c0c0;
    min-height: 500px;
  }
  article h5 {
    line-height: 1.5;
    font-size: 14px;
    color: #000;
  }
  #directory,
  #backTop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 42px;
    border: none;
    background-color: transparent;
    border-radius: 5px;
    vertical-align: top;
    outline: none;
    cursor: pointer;
    top: 90%;
    right: 20px;
  }
  #directory{
    top: 90%;
    right: 80px;
  }
  #directory {
    background: url("../../assets/images/bg.png") -80px -240px;
  }
  #directory:hover {
    background: url("../../assets/images/bg.png") -160px -240px;
  }
  #backTop {
    background: url("../../assets/images/bg.png") -240px -240px;
  }
  #backTop:hover {
    background: url("../../assets/images/bg.png") -320px -240px;
  }
  /*mululist */
  #contents{
    width:12%;
    height:500px;
    background:#fff;
    border:1px solid transparent;
    border-radius:5px;
    position:fixed;
    left:1667px;
    top:260px;
    padding:17px;
    box-sizing: border-box;
  }
  #contents>.contents_bor{
    width:100%;
    height:380px;
    border-left:1px solid #ddd;
  }
  #contents>.contents_bor ul{
    list-style: none;
  }
  #contents>.contents_bor>ul li{
    margin-bottom:10px;
  }
  #contents>.contents_bor>ul li a{
    display: inline-block;
    width:15px;
    height:15px;
    background: url("../../assets/images/bg6.png")-699px -726px;
  }
  #contents>.contents_bor>ul li a.moren{
    display: inline-block;
    width:15px;
    height:15px;
    background: url("../../assets/images/bg6.png")-699px -726px;
  }
  #contents>.contents_bor>ul li a.active_logo{
    background: url("../../assets/images/bg6.png")-698px -595px;
  }
  #contents>.contents_bor>ul li ul{
    margin-left:16px;
  }
  #contents>.contents_bor>ul li ul li{
    margin-bottom:10px;
  }
  #contents_bor{
    position: relative;
  }
  #contents_list>li{
    margin-bottom:20px;
    position: relative;
    left:-6px;
  }
  #contents_list{
    color:#5c5c5c;
  }
  #contents_list>li>b{
    color:#5c5c5c;
    /* font-weight:normal;*/
    font-size:16px;
  }
  ::-webkit-scrollbar
  {
    width: 16px;
    height: 16px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
  ::-webkit-scrollbar{width: 6px;}
  #article > table > tr > td{
    padding: 0 10PX !important;
  }
</style>
