<template>
	<div class="container">
		<div class="row">
			<p class="col-xs-12" style="padding-top: 20px;"><a href="static/评定及分级方案.docx" download="static/评定及分级方案.docx" style="float: right;color: #999;font-size: 13px;text-decoration: none;"><img src="../assets/imgs/x.png">评定及分级方案<span style="font-size: 13px;color: #428bca;margin-left: 10px;">下载</span></a></p>
		</div>
		<form ref="form1" enctype="multipart/form-data">
			<div class="head_btn">
				<span>基本信息</span>
			</div>
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<span>供&nbsp;&nbsp;&nbsp;&nbsp; 应&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商&nbsp;</span>
					<input type='text' class="input_s" name="supplier_name" v-model="supplier" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>合同名称</span>
					<input type='text' class="input_s" name="contract_name" v-model="contract" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>供货进场时间</span>
					<input type='text' class="input_s form_datetime form-control time" name="purchase_time" data-date-format="yyyy-mm-dd" id="purchase_time" autocomplete="off" v-model="purchase_time">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>评审时间</span>
					<input type='text' class="input_s form_datetime form-control time" name="review_time" data-date-format="yyyy-mm-dd" id="review_time" autocomplete="off" v-model="review_time">
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
							<li v-for="content in li.contents"> {{content.content_li}}<span>{{content.fraction}}分</span></li>
						</ul>
						<div>实际情况说明：<input type="text" :name="getinput(index)" class="explain"></div>
					</div>
					<div class="col-md-6 col-xs-12 li_content">
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
			<div><button class="submit_btn" @click.prevent.stop="subajax2">提交</button></div>
		</form>
	</div>
</template>

<script>
	import imgUrl from "../assets/imgs/1_img.png"
	import imgUrl2 from "../assets/imgs/2_img.png"
	import imgUrl3 from "../assets/imgs/3_img.png"
	import imgUrl4 from "../assets/imgs/4_img.png"
	import imgUrl5 from "../assets/imgs/5_img.png"
	import imgUrl6 from "../assets/imgs/6_img.png"
	import imgUrl7 from "../assets/imgs/7_img.png"
	import imgUrl8 from "../assets/imgs/8_img.png"
	import imgUrl9 from "../assets/imgs/9_img.png"
	export default {
		name: 'Inspec',
		data() {
			return {
				lis: [{
					"icon": imgUrl,
					"title": "价格情况（15%）",
					"contents": [{
						"content_li": "在工作紧张情况下不能提供服务或价格高出市场5%以上",
						"fraction": "0-3"
					}, {
						"content_li": "价格不能保持市场竞争力",
						"fraction": "4-7"
					}, {
						"content_li": "价格保持市场竞争力，在工作紧张时也能及时提供服务",
						"fraction": "8-11"
					}, {
						"content_li": "价格稳中趋降，能协助降低总采购成本",
						"fraction": "12-15"
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
					"title": "质量情况（15%）",
					"contents": [{
						"content_li": "产品或服务的交检合格率低于95%、运行故障率超过3%",
						"fraction": "0-5"
					}, {
						"content_li": "产品或服务的交检合格率97%、运行故障率2%以内",
						"fraction": "6-10"
					}, {
						"content_li": "产品或服务的交检合格率99%以上、运行故障率1%以内",
						"fraction": "11-15"
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
					"icon": imgUrl3,
					"title": "供货情况（15%）",
					"contents": [{
						"content_li": "按期供货率小于70%",
						"fraction": "0-3"
					}, {
						"content_li": "按期供货率小于90%",
						"fraction": "4-7"
					}, {
						"content_li": "按期供货率≧90%，且部分能随需求调整",
						"fraction": "8-11"
					}, {
						"content_li": "完全满足要求，能根据项目实际情况进行调整",
						"fraction": "12-15"
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
					"icon": imgUrl4,
					"title": "产品资料（5%）",
					"contents": [{
						"content_li": "产品相关资料不齐 全，缺少关键资料",
						"fraction": "0-1"
					}, {
						"content_li": "产品相关资料基本齐全，不缺少关键资料",
						"fraction": "2-3"
					}, {
						"content_li": "产品相关资料齐全、交接及时",
						"fraction": "4-5"
					}],
					"frac": [
						0,
						1,
						2,
						3,
						4,
						5
					]
				}, {
					"icon": imgUrl5,
					"title": "技术对接（15%）",
					"contents": [{
						"content_li": "配合不好或对接不及时",
						"fraction": "0-3"
					}, {
						"content_li": "配合、对接一般，基本满足要求",
						"fraction": "4-7"
					}, {
						"content_li": "配合良好，对接及时",
						"fraction": "8-11"
					}, {
						"content_li": " 配合、对接过程中能够给使用单位提供技术指导",
						"fraction": "12-15"
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
					"icon": imgUrl6,
					"title": "现场验收（15%）",
					"contents": [{
						"content_li": "规格型号或数量有误，外包装有破损,且缺少关键资料",
						"fraction": "0-3"
					}, {
						"content_li": "规格型号及数量准确，外包装有破损，且资料基本齐全",
						"fraction": "4-7"
					}, {
						"content_li": "规格型号及数量准确，外包装完整，且资料齐全",
						"fraction": "8-11"
					}, {
						"content_li": "产品设计、制造合理，便于操作",
						"fraction": "12-15"
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
					"icon": imgUrl7,
					"title": "信息支持及售后（15%）",
					"contents": [{
						"content_li": "对现场产品故障信息需求不配合/不能兑现售后服务承诺",
						"fraction": "0-3"
					}, {
						"content_li": "对现场产品故障信息需求配合周期很长，协助故障的消除时间超过市场平均水平",
						"fraction": "4-7"
					}, {
						"content_li": "对现场产品故障信息需求基本配合，能协助故障的消除/基本兑现售后服务承诺",
						"fraction": "8-11"
					}, {
						"content_li": "对现场产品故障信息需求积极配合，消除故障，提出改进措施/兑现售后服务承诺且响应速度快",
						"fraction": "12-15"
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
					"icon": imgUrl8,
					"title": "职业健康安全（3%）",
					"contents": [{
						"content_li": "对现场提供的设备设施、物资材料，存在不符合国家法律法规、电力行业规范要求的情况。在设备设施、物资材料使用期间，发生安全事故并导致人员伤亡及财产损失的情况",
						"fraction": "0"
					}, {
						"content_li": "在设备设施、物资材料使用期间，接到现场人员对其存在安全风险方面的投诉，但未造成实际人员伤亡及财产损失的情况",
						"fraction": "1-2"
					}, {
						"content_li": "对现场提供的设备设施、物资材料，符合国家法律法规、电力行业规范要求，对现场作业人员不构成安全风险。在设备设施、物资材料使用期间，未接到现场人员对其存在安全风险方面的投诉",
						"fraction": "3"
					}],
					"frac": [
						0,
						1,
						2,
						3
					]
				}, {
					"icon": imgUrl9,
					"title": "环境保护（2%）",
					"contents": [{
						"content_li": "对现场提供的设备设施、物资材料，存在不符合国家法律法规、电力行业规范要求的情况，对周边环境造成污染的情况",
						"fraction": "0"
					}, {
						"content_li": "在设备设施、物资材料使用期间，接到现场人员、周边居民对其污染周边环境的投诉，造成污染情况较轻未产生损失的情况",
						"fraction": "1-2"
					}, {
						"content_li": "对现场提供的设备设施、物资材料，符合国家法律法规、电力行业规范要求，不构成对周边环境造成污染。在设备设施、物资材料使用期间，未接到现场人员、周边居民对其污染周边环境的投诉。在上级部门、体系审核、专家诊断等的各项检查工作中，未对设备设施、物资材料提出不符合环保要求的问题",
						"fraction": "3"
					}],
					"frac": [
						0,
						1,
						2,
						3
					]
				}],
				supplier: '',
				contract: '',
				autograph: '',
				total: '0',
				selected: '',
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
				}, {
					model: "-1"
				}, {
					model: "-1"
				}, {
					model: "-1"
				}],
				purchase_time: '',
				review_time: ''
			}
		},
		//		created() {
		//			this.$nextTick(() => {
		//				this.getajax2()
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
				this.total = num
			},
			//			getajax2: function() {
			//				this.$axios({
			//					method: 'get',
			//					url: './static/lis.json'
			//				}).then((response) => { //这里使用了ES6的语法
			//					console.log(this.lis) //请求成功返回的数据
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
			subajax2: function() {
				let ts = true;
				this.formModel.forEach((value, index) => {
					console.log(this.formModel[index].model);
					if (this.formModel[index].model == "-1") {
						ts = false;
					}
				})
				if (ts == false) {
					alert("请选择所有选项的分数");
				} else if (this.supplier == "" || this.contract == "" || this.autograph == "" || this.total == "" || this.review_time == "" || this.purchase_time == "") {
					alert("请完整输入基本信息和签名");
				} else {
					var formData = new FormData(this.$refs.form1); //获取表单数据
					console.log(formData);
					this.$axios.post('http://47.106.194.3/yigou/index.php?core-api-evaluate-goodsEvaluate', formData)
						.then(function(response) {
							console.log(response);
							if (response.data.statusCode == 200) {
								alert(response.data.message);
								window.location.reload()
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
				self.time = s;
				//初始化
				$('#purchase_time').datetimepicker({
					//					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#purchase_time').datetimepicker().on('hide', function(ev) {
					var value = $("#purchase_time").val();
					self.purchase_time = value;
				});
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