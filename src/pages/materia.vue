<template>
	<div class="container">
		<div class="row">
			<p class="col-xs-12" style="padding-top: 20px;">
				<a href="static/评定及分级方案.docx" download="static/评定及分级方案.docx" style="float: right;color: #999;font-size: 13px;text-decoration: none;"><img src="../assets/imgs/x.png">评定及分级方案<span style="font-size: 13px;color: #428bca;margin-left: 10px;">下载</span></a>
			</p>
		</div>
		<form ref="form3" enctype="multipart/form-data">
			<div class="head_btn">
				<span>基本信息</span>
			</div>
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<span>供&nbsp;&nbsp;应&nbsp;&nbsp;商</span>
					<input type='text' class="input_s" name="supplier_name" v-model="supplier" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>合&nbsp;&nbsp;&nbsp;同&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;&nbsp;称</span>
					<input type='text' class="input_s" name="contract_name" v-model="contract" autocomplete="off">
				</div>

				<div class="col-md-6 col-xs-12">
					<span>评审时间</span>
					<input type='text' class="input_s form_datetime form-control time" name="review_time" data-date-format="yyyy-mm-dd hh:ii" id="review_time" autocomplete="off" v-model="review_time">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>设备(材料)名称</span>
					<input type='text' class="input_s" name="engineer_name" v-model="engineer" autocomplete="off">
				</div>
			</div>
			<div class="head_btn">
				<span>评定细则</span>
			</div>
			<div class="row">
				<div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
					<div class="col-md-6 col-xs-12 li_content" v-for="(li,index) in lis">
						<div class="title">
							<p><img :src="li.icon">{{li.title}}</p>
							<select :name="gernerateId(index)" @change="total_(index)" v-model="formModel[index].model">
							<option value="-1">请选择分数</option>
					 	   <option v-for="fr in li.frac" :value="fr">{{fr}}</option>
					    </select>
						</div>
						<ul style="clear: both;">
							<li v-for="content in li.contents" v-bind:class="{active:formModel[index].model<=content.stop&&formModel[index].model>=content.start}"> {{content.content_li}}<span>{{content.fraction}}分</span></li>
						</ul>
						<div><span style="float: left;">实际情况说明：</span><textarea type="text" :name="getinput(index)" class="explain"></textarea></div>
					</div>
					<div class="col-md-6 col-xs-12 li_content">
						<div class="title">
							<p style="margin-bottom: 0px;"><img :src="imgs">减分项</p>
						</div>
						<ul>
							<li>按照巡视要求，在运行中发现一处因设备质量原因缺陷扣1分 <span class="input_c"><input type="number" min="1" v-model="checkedbox.one.state" @change="total_(key)"  name="input[0]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >处</span></li>
							<li>每发生一次紧急缺陷扣1分<span class="input_c"><input type="number" min="0" v-model="checkedbox.two.state" @change="total_(key)" name="input[1]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >次</span> </li>
							<li>发生一次跳闸扣3分<span class="input_c"><input type="number" min="0" v-model="checkedbox.three.state" @change="total_(key)" name="input[2]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >次</span> </li>
							<li>每发生操作维护故障、缺陷扣一分<span class="input_c"><input type="number" min="0" v-model="checkedbox.four.state" @change="total_(key)" name="input[3]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >处</span> </li>
							<li>一般性及交接每发生一项试验不合格扣三分<span class="input_c"><input type="number" min="0" v-model="checkedbox.five.state" @change="total_(key)" name="input[4]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >项</span> </li>
							<li>在诊断性试验中，发现一项不合格扣3分<span class="input_c"><input type="number" min="0" v-model="checkedbox.six.state"  @change="total_(key)" name="input[5]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >项</span></li>
							<li>对于安全违章违纪行为，发现一项，扣除1分（若情况严重，人员列入黑名单，清除出场）。 现场运检作业过程中出现人员伤亡等安全事故的，列入黑名单。<span class="input_c"><input type="number" min="0" v-model="checkedbox.seven.state" @change="total_(key)" autocomplete="off" name="input[6]" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >项</span>
							</li>
							<li>发现破坏环境的不法行为，发现一项，扣除1分（若情况严重，人员列入黑名单，清除出场）<span class="input_c"><input type="number" min="0" v-model="checkedbox.eight.state" @change="total_(key)" name="input[7]" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' >项</span></li>
						</ul>

					</div>
					<div class="col-md-6 col-xs-12">
						<div class="careful">
							<ul>
								<li>注：1、实际情况说明一栏需要对实际情况进行说明；</li>
								<li> 2、分数以整数为计数单位，不可出现小数分值；</li>
								<li> 3、设备设施使用过程中造成人员伤亡等安全事故的，列入黑名单。</li>
							</ul>
						</div>
						<ul style="margin-top: 20px;">
							<li>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;得&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分 <input type="text" class="input_s z" name="total_score" v-model="total" readonly="readonly"></li>
							<li>评价人员签名<input type="text" class="input_s" name="autograph" v-model="autograph" autocomplete="off"></li>
						</ul>
					</div>
				</div>
			</div>
			<div><button class="submit_btn" @click.prevent.stop="subajax3">提交</button></div>

		</form>
	</div>
</template>

<script>
	import imgUrl from "../assets/imgs/1_img.png"
	import imgUrl2 from "../assets/imgs/32_img.png"
	import imgUrl3 from "../assets/imgs/33_img.png"
	import imgUrl4 from "../assets/imgs/34_img.png"
	import imgUrl5 from "../assets/imgs/8_img.png"
	import imgUrl6 from "../assets/imgs/9_img.png"
	import imgUrl7 from "../assets/imgs/37_img.png"
	export default {
		name: 'Mate',
		data() {
			return {
				lis: [{
					"icon": imgUrl,
					"title": "价格情况（15%）",
					"contents": [{
						"content_li": "在工作紧张情况下不能提供服务或价格高出市场5%以上。",
						"fraction": "0-3",
						'start':0,
						'stop':3
					}, {
						"content_li": "价格不能保持市场竞争力。",
						"fraction": "4-7",
						'start':4,
						'stop':7
					}, {
						"content_li": "价格保持市场竞争力，在工作紧张时也能及时提供服务。",
						"fraction": "8-11",
						'start':8,
						'stop':11
					}, {
						"content_li": "价格稳中趋降，能协助降低总采购成本。",
						"fraction": "12-15",
						'start':12,
						'stop':15
					}],
					"frac": [
						0,
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15
					]
				}, {
					"icon": imgUrl2,
					"title": "信息支持（25%）",
					"contents": [{
						"content_li": "对现场产品故障分析信息需求不配合",
						"fraction": "0-5",
						'start':0,
						'stop':5
					}, {
						"content_li": "对现场产品故障分析信息需求基本配合，但不能消除故障",
						"fraction": "6-12",
						'start':6,
						'stop':12
					}, {
						"content_li": "对现场产品故障分析信息需求基本配合，能协助故障的消除",
						"fraction": "13-18",
						'start':13,
						'stop':18
					}, {
						"content_li": "对现场产品故障分析信息需求积极配合，消除故障，提出改进措施",
						"fraction": "19-25",
						'start':19,
						'stop':25
					}],
					"frac": [
						0,
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23,
						24,
						25
					]
				}, {
					"icon": imgUrl3,
					"title": "现场支持（30%）",
					"contents": [{
						"content_li": "不能兑现售后服务承诺",
						"fraction": "0-7",
						'start':0,
						'stop':7
					}, {
						"content_li": "基本能够兑现售后服务承诺，响应不够及时",
						"fraction": "8-15",
						'start':8,
						'stop':15
					}, {
						"content_li": "基本能够兑现售后服务承诺，响应及时",
						"fraction": "16-23",
						'start':16,
						'stop':23
					}, {
						"content_li": "能够兑现售后服务承诺且响应速度快",
						"fraction": "24-30",
						'start':24,
						'stop':30
					}],
					"frac": [
						0,
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23,
						24,
						25,
						26,
						27,
						28,
						29,
						30
					]
				}, {
					"icon": imgUrl4,
					"title": "（试）运行情况（25%）",
					"contents": [{
						"content_li": "产品不能满足（试）运行要求，故障频发%以上。",
						"fraction": "0-5",
						'start':0,
						'stop':5
					}, {
						"content_li": "产品基本满足（试）运行各项性能指标和电网要求",
						"fraction": "6-12",
						'start':6,
						'stop':12
					}, {
						"content_li": "产品完全满足（试）运行各项性能指标和电网要求",
						"fraction": "13-18",
						'start':13,
						'stop':18
					}, {
						"content_li": "产品部分指标大幅度超过国标要求和电网要求",
						"fraction": "19-25",
						'start':19,
						'stop':25
					}],
					"frac": [
						0,
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23,
						24,
						25
					]
				}, {
					"icon": imgUrl5,
					"title": "职业健康安全（3%）",
					"contents": [{
						"content_li": "现场运检作业人员，存在不符合国家法律法规、电力行业规范要求，或缺少相关工作的证件等资质要求，不满足工作需要的情况；现场运检作业人员在作业过程及安全检查过程中，存在违反使用单位的安全规章制度，现场工作不规范的情况。%以上。",
						"fraction": "0",
						'start':0,
						'stop':0
					}, {
						"content_li": "现场运检作业人员，符合国家法律法规、电力行业规范要求，具备相关工作的证件等资质要求，满足工作需要。但在作业过程及安全检查过程中，存在违反使用单位的安全规章制度，现场工作不规范的情况。",
						"fraction": "1-2",
						'start':1,
						'stop':2
					}, {
						"content_li": "现场运检作业人员，在作业过程中，严格遵守使用单位的安全规章制度，现场工作规范，安全素养高，无违章情况发生。在安全检查中，未发现运检作业人员存在违章违纪行为。",
						"fraction": "3",
						'start':3,
						'stop':3
					}],
					"frac": [
						0,
						1,
						2,
						3
					]
				}, {
					"icon": imgUrl6,
					"title": "环境保护（2%）",
					"contents": [{
						"content_li": "现场运检作业人员，在巡检、作业、操作过程中，严格遵守使用单位环保制度要求，工作过程中，未造成环境污染情况发生。%以上。",
						"fraction": "0",
						'start':0,
						'stop':0
					}, {
						"content_li": "现场工作期间，用人单位未接到周边居民对运检作业人员作业行为污染周边环境的投诉。",
						"fraction": "1",
						'start':1,
						'stop':1
					}, {
						"content_li": "现场运检的人员，自觉对生产和生活过程中，产生的废油、废物、废料、垃圾进行统一收集，到指定垃圾站进行处理，不发生随意丢弃的行为。在上级部门、体系审核、专家诊断、安全环水保等各项检查工作中，未发现现场技术服务人员存在破坏环境、污染环境的不法行为。",
						"fraction": "2",
						'start':2,
						'stop':2
					}],
					"frac": [
						0,
						1,
						2
					]
				}],
				supplier: '',
				contract: '',
				purchase: '',
				engineer: '',
				autograph: '',
				total: '0',
				review_time: '',
				engineer: '',
				formModel: [{
					model: "-1"
				}, {
					model: "-1"
				}, {
					model: "-1"
				}, {
					model: "-1"
				}, {
					model: "-1"
				}, {
					model: "-1"
				}],
				imgs: imgUrl7,
				checkedbox: {
					one: {
						state: '',
						grade: 1
					},
					two: {
						state: '',
						grade: 1
					},
					three: {
						state: '',
						grade: 3
					},
					four: {
						state: '',
						grade: 1
					},
					five: {
						state: '',
						grade: 3
					},
					six: {
						state: '',
						grade: 3
					},
					seven: {
						state: '',
						grade: 1
					},
					eight: {
						state: '',
						grade: 1
					}
				}
			}
		},
		//		created() {
		//			this.$nextTick(() => {
		//				this.getajax3()
		//			})
		//		},
		methods: {
			gernerateId: function(index) {
				return "data[" + index + "][select_" + index + "]"
			},
			getinput: function(index) {
				return "data[" + index + "][input_" + index + "]"
			},
			total_: function(index) {
				let num = 0;
				this.formModel.forEach((value, index) => {
					console.log(this.formModel[index].model)
					if (this.formModel[index].model !== "-1") {
						num += Number(this.formModel[index].model);
					}
				})
				for (var key in this.checkedbox) {
					var state = this.checkedbox[key].state
					var _value = this.checkedbox[key].grade
					if (state != 0) {
						num = num - Number(_value) * Number(state)
					}
				}
				this.total = num
			},
			//			jian: function(one, grade) {
			//				var xm = this.total
			//				if (one == 0) {
			//					one = 1
			//					xm -= grade
			//					alert(Number(grade)*Number(one))
			//				} else {
			//					one = 0
			//					xm += grade
			//				}
			//				this.total = xm
			//			},
			//			getajax3: function() {
			//				this.$axios({
			//					method: 'get',
			//					url: './static/lis3.json'
			//				}).then((response) => { //这里使用了ES6的语法
			//					console.log(response) //请求成功返回的数据
			//					this.lis = response.data;
			//					this.lis.forEach((value, index) => {
			//						this.formModel.push({
			//							model: "0"
			//						})
			//					})
			//				}).catch((response) => {
			//					console.log(response) //请求失败返回的数据
			//				})
			//			},
			subajax3: function() {
				let ts = true;
				this.formModel.forEach((value, index) => {
					console.log(this.formModel[index].model);
					if (this.formModel[index].model == "-1") {
						ts = false;
					}
				})
				if (ts == false) {
					alert("请选择所有选项的分数");
				} else if (this.supplier == "" || this.contract == "" || this.autograph == "" || this.engineer == "" || this.review_time == "") {
					console.log(this.supplier)
					console.log(this.contract)
					console.log(this.autograph)
					alert("请完整输入基本信息和签名")
				} else {
					var formData = new FormData(this.$refs.form3); //获取表单数据
					console.log(formData);
					this.$axios.post('http://47.106.194.3/yigou/index.php?core-api-evaluate-checkEvaluate', formData)
						.then(function(response) {
							console.log(response);
							if (response.data.statusCode == 200) {
								alert(response.data.message);
								window.location.reload()
								document.body.scrollTop = 0
								document.documentElement.scrollTop = 0
							}
						})
						.catch(function(error) {
							console.log(error);
							alert("提交失败，请重新提交")
						});
				}
			},
			dateDefind() {
				var d, s;
				var self = this;
				d = new Date();
				s = d.getFullYear() + "-"; //取年份
				s = s + (d.getMonth() + 1) + "-"; //取月份
				s += d.getDate() + " "; //取日期
				s += d.getHours() + ":"; //取小时
				s += d.getMinutes() + ":"; //取分
				s += d.getSeconds(); //取秒
				self.time = s;
				//初始化
				$('#review_time').datetimepicker({
					//					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#review_time').datetimepicker().on('hide', function(ev) {
					var value = $("#review_time").val();
					self.review_time = value;
				});
			}
		},
		mounted: function() {
			this.dateDefind();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>