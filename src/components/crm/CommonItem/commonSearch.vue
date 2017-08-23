<template>

	<div id="search" class="crm-search">
		<!--搜索框-->
		<div class="search">
			<input type="text" placeholder="请输入客户相关的信息..." class="searchInput" @focus='sfShow' @blur='sfHide' />
			<div class="searchArrow" @click='saShow'></div>
			<div class="searchSubmit"></div>
		</div>
		<!--高级设置sa=searchArrow-->
		<div class="sa dn">
			<div class="sa-close" @click='saHide'></div>
			<div class="sbk1">
				<table cellpadding="0" cellspacing="0" class="w100 sa-table">
					<tr>
						<td class="sa-td"><span>客户信息</span></td>
						<td>
							<input type="text" class="bks2" placeholder="请输入客户相关信息..." />
						</td>
					</tr>
					<tr>
						<td class="sa-td"><span>联系人</span></td>
						<td><input type="text" class="bks2" placeholder="请输入联系人相关信息..."/>
						</td>
					</tr>
					<tr>
						<td class="sa-td">客户分类</td>
						<td class="sa-td">
              <select name="" id="" v-model="selected">
                <option value="" disabled="disabled">请选择类别</option>
                <option value="" v-for="option in optionLists" :value="option.value">{{option.text}}</option>
              </select>
						</td>
					</tr>
					<tr>
						<td class="sa-td">客户状态</td>
						<td class="sa-td">
              <select name="" id="" v-model="selected2">
                <option value="" disabled="disabled">请选择类别</option>
                <option value="" v-for="option in optionLists2" :value="option.value">{{option.text}}</option>
              </select>
						</td>
					</tr>
					<tr>
						<td class="sa-td"><span>录入时间</span>
						</td>
						<td>
							<div class="q-left">
								<el-date-picker v-model="value" type="daterange" placeholder="选择日期范围">
								</el-date-picker>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div class="sbk2">
				<div class="btnbox">
					<div class="btangz">
						<div class="btan-1" @click='saHide'>
							<a>
								<span>查 询</span>
							</a>
						</div>
						<div class="btan-2" @click='saHide'>
							<a>
								<span>重 置</span>
							</a>
						</div>
						<div class="btan-2" @click='saHide'>
							<a>
								<span>取 消</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--搜索框focus时，下拉选项,sf=searchFocus-->
		<div class="sf dn">
			<ul>
				<li>包含<span style="color: #1965B6;">Search</span>的邮件<span style="color: #bfbfbf;">(全文搜索)</span></li>
				<li>包含<span style="color: #1965B6;">Search</span>的邮件<span style="color: #bfbfbf;">(主题)</span></li>
				<li>包含<span style="color: #1965B6;">Search</span><span>(发件人+收件人)</span></li>
				<li>包含<span style="color: #1965B6;">Search</span><span>(主题+发件人)</span></li>
				<li @click='saShow'>高级搜索</li>
			</ul>
		</div>
	</div>

</template>

<script>
	export default {
    f:false,
		name: 'mailSearch',
		data() {
			return {
				value: '',
        selected:'',
        selected2:'',
        optionLists:[
          {text:'重点跟进客户',value:'0'},
          {text:'默认分类',value:'1'},
          {text:'重点意向客户',value:'2'},
          {text:'一般潜在客户',value:'3'},
          {text:'阿里',value:'4'},
          {text:'美国客户',value:'5'},
          {text:'JP',value:'6'},
          {text:'KP',value:'7'},
        ],
        optionLists2:[
          {text:'收集状态',value:'0'},
          {text:'开发状态',value:'1'},
          {text:'跟进状态',value:'2'},
          {text:'潜在客户',value:'3'},
          {text:'意向客户',value:'4'},
          {text:'成交客户',value:'5'}
        ]
			}
		},
		methods: {
			saShow() {
        if(this.f){
          $('.sa').hide(400)
        }else{
          $('.sa').show(400)
        }
        this.f = !this.f
			},
			saHide() {
				$('.sa').hide(400)
			},
			sfShow() {
				$('.sa').hide(400)
				$('.sf').show(400)
			},
			sfHide() {
				$('.sf').hide(400)
			}
		},
		mounted: function() {
			$('body').click(function(e) {
				var target = $(e.target);
				// 如果#overlay或者#btn下面还有子元素，可使用
				// !target.is('#btn *') && !target.is('#overlay *')
				if(!target.is('#search *') && !target.is('.search *')) {
					if($('.sa').is(':visible')) {
						$('.sa').hide(400)
					}
				}
			});
		}
	}
</script>

<style lang="less">
  .crm-search{
    position: relative;
    z-index: 15;
    background-color: #fff;
    .sf {
      display: none;
      position: absolute;
      top: 28px;
      right: 40px;
      width: 250px;
      font-size: 12px;
      padding: 5px 0;
      background: #FFF;
      z-index: 9999;
      text-align: left;
      border-radius: 2px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    }

    .sf ul li {
      padding-left: 30px;
      padding-right: 20px;
      line-height: 30px;
      white-space: nowrap;
      cursor: pointer;
    }

    .sf ul li:last-child {
      line-height: 40px;
      border-top: 1px solid #ddd;
      padding-left: 30px;
    }
    /*搜索框*/

    .search {
      width: 245px;
      height: 27px;
      position: absolute;
      right: 40px;
      top: -5px;
      padding-left: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 3px;
      cursor: pointer;
      background-color: #fff;
    }

    .searchInput {
      float: left;
      width: 178px;
      height: 24px;
      border: none;
      outline: none;
      color: #666;
    }

    .searchArrow {
      width: 20px;
      height: 20px;
      background: url(/static/img/crm_images/icon/arrow.gif) no-repeat 5px 5px;
      float: left;
      margin-top: 4px;
      z-index: 98;
    }

    .searchSubmit {
      float: right;
      width: 30px;
      height: 36px;
      margin-top: -5px;
      background: url(/static/img/crm_images/icon/search.png) no-repeat -43px -2px;
    }

    .searchSubmit:hover {
      background-position: -90px -2px;
    }
    /*高级设置*/

    .sa {
      display: none;
      position: absolute;
      top: 28px;
      right: 40px;
      width: 400px;
      font-size: 12px;
      padding: 10px;
      border: 1px solid #666;
      background: #FFF;
      z-index: 9999;
      text-align: left;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    .sa-close {
      position: absolute;
      width: 30px;
      height: 30px;
      right: 0px;
      top: 0px;
      cursor: pointer;
      background: url(/static/img/crm_images/icon/tipbg.jpg) no-repeat;
      z-index: 9999;
    }

    .sbk1 {
      margin-left: 15px;
      margin-top: 10px;
    }

    .sa-td {
      height: 40px;
      width: 5%;
      color: #666;
      line-height: 20px;
    }

    .sa-td select {
      height: 30px;
      width: 120px;
      border: 1px solid #bfcbd9;
      border-radius: 4px;
      outline: none;
    }

    .sa-td input {
      vertical-align: middle;
    }

    .bks2 {
      width: 200px;
      height: 30px;
      padding-left: 10px;
      border: 1px solid #BFCBD9;
      border-radius: 4px;
      outline: none;
    }

    .sa-td select:focus,
    .bks2:focus {
      border-color: #20A0FF;
    }

    .q-left {
      float: left;
      margin-right: 10px;
      color: #666;
      line-height: 25px;
    }

    .bks3 {
      width: 80px;
      height: 25px;
      border: 1px solid #cfcfcf;
    }

    .btnbox {
      text-align: right;
      padding-right: 20px;
      height: 40px;
      line-height: 40px;
      clear: both;
    }

    .btangz {
      cursor: pointer;
      margin-left: 55px;
    }

    .btangz .btan-1 {
      float: left;
    }

    .btangz .btan-1 a {
      padding: 4px 10px;
      color: #FFFFFF;
      border: 1px solid #459830;
      background: #4eaa39;
      border-radius: 3px;
    }

    .btangz .btan-2 {
      float: left;
      margin-left: 15px;
    }

    .btangz .btan-2 a {
      padding: 4px 10px;
      color: #222222;
      border: 1px solid #aaaaaa;
      background: #ffffff;
      border-radius: 3px;
    }

    .btangz .btan-1 a:hover,
    .btangz .btan-2 a:hover {
      box-shadow: 0px 0px 5px #ccc;
    }
  }

</style>
