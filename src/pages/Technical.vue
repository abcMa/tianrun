<template>
	<div class="container">
        <div class="row">
			<p class="col-xs-12" style="padding-top: 20px;">
				<a href="static/评定及分级方案.docx" download="static/评定及分级方案.docx" style="float: right;color: #999;font-size: 13px;text-decoration: none;"><img src="../assets/imgs/x.png">评定及分级方案<span style="font-size: 13px;color: #428bca;margin-left: 10px;">下载</span></a>
			</p>
		</div>
		<form ref="form2" enctype="multipart/form-data">
			<div class="head_btn">
				<span>基本信息</span>
			</div>
			<div class="row">
				<div class="col-md-4 col-xs-12">
					<span>承&nbsp;&nbsp;包&nbsp;&nbsp;商</span>
					<input type='text' class="input_s" name="contractor_name" v-model="contractor" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>项目名称</span>
					<input type='text' class="input_s" name="contract_name" v-model="contract" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>工程名称</span>
					<input type='text' class="input_s" name="engineer_name" v-model="engineer" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>评审时间</span>
					<input type='text' class="input_s form_datetime form-control time" name="review_time" data-date-format="yyyy-mm-dd" id="review_time" autocomplete="off" v-model="review_time">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>进场时间</span>
					<input type='text' class="input_s form_datetime form-control time" name="start_time" data-date-format="yyyy-mm-dd" id="start_time" autocomplete="off" v-model="start_time">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>完工时间</span>
					<input type='text' class="input_s form_datetime form-control time" name="stop_time" id="stop_time" data-date-format="yyyy-mm-dd" autocomplete="off" v-model="stop_time">
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
					<div class="col-md-6 col-xs-12 ">
						<div class="careful">
							<ul>
								<li>注：1、实际情况说明一栏需要对实际情况进行说明；</li>
								<li> 2、分数以整数为计数单位，不可出现小数分值；</li>
								<li> 3、设备设施使用过程中造成人员伤亡等安全事故的，列入黑名单。</li>
							</ul>
						</div>
					</div>
					<div class="col-md-6 col-xs-12">
						<ul>
							<li>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;得&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分 <input type="text" class="input_s z" name="total_score" v-model="total" readonly="readonly"></li>
							<li>评价人员签名<input type="text" class="input_s" name="autograph" v-model="autograph" autocomplete="off"></li>
						</ul>
					</div>
				</div>
			</div>
			<div><button class="submit_btn" @click.prevent.stop="subajax">提交</button></div>
		</form>
	</div>
</template>

<script>
	import imgUrl from "../assets/imgs/21_img.png"
	import imgUrl2 from "../assets/imgs/22_img.png"
	import imgUrl3 from "../assets/imgs/23_img.png"
	import imgUrl4 from "../assets/imgs/24_img.png"
	import imgUrl5 from "../assets/imgs/8_img.png"
	import imgUrl6 from "../assets/imgs/9_img.png"
	export default {
		name: 'Inspec',
		data() {
			return {
				lis: [{
					"icon": imgUrl,
					"title": "服务能力（30%）",
					"contents": [{
						"content_li": "不能履行服务合同或出具的服务报告不合格，人为原因造成的一般设备或重伤及以上事故。",
						"fraction": "0-7"
					}, {
						"content_li": "按要求履行合同并提供完整报告，人为原因造成的记录设备或微伤及以上事故。",
						"fraction": "8-15"
					}, {
						"content_li": "服务人员在职责范围内有求必应、有问必答和耐心细致，表现出很高的素质和良好的服务态度，人为原因造成的一类障碍及以下事故。",
						"fraction": "16-23"
					}, {
						"content_li": "不仅精通产品技术，同时还对电力行业的用户需求特点有深入的了解，自发优化服务水平，例如对每次服务都进行书面记录，甚至提供书面的用户需求分析报告。",
						"fraction": "24-30"
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
					"icon": imgUrl2,
					"title": "价格竞争力（10%）",
					"contents": [{
						"content_li": "在工作紧张情况下不能提供服务或价格高出市场5%以上。",
						"fraction": "0-2"
					}, {
						"content_li": "价格不能保持市场竞争力。",
						"fraction": "3-5"
					}, {
						"content_li": "价格保持市场竞争力，在工作紧张时也能及时提供服务。",
						"fraction": "6-8"
					}, {
						"content_li": "价格稳中趋降，能协助降低总采购成本。",
						"fraction": "9-10"
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
						10
					]
				}, {
					"icon": imgUrl3,
					"title": "技术能力（30%）",
					"contents": [{
						"content_li": "技术能力不能满足合同要求或行业标准。",
						"fraction": "0-7"
					}, {
						"content_li": "技术能力低于国内或国外同类产品平均水平。",
						"fraction": "8-15"
					}, {
						"content_li": "技术能力接近国内或国外同类产品先进水平。",
						"fraction": "16-23"
					}, {
						"content_li": "根据服务特点，对工作程序及服务项目进行评估，处于国内或国际先进水平。",
						"fraction": "24-30"
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
					"title": "定制服务能力（25%）",
					"contents": [{
						"content_li": "不具备相关技术能力。",
						"fraction": "0-5"
					}, {
						"content_li": "不具备定制或现有服务改进能力。",
						"fraction": "6-12"
					}, {
						"content_li": "有一定的定制服务能力。",
						"fraction": "13-18"
					}, {
						"content_li": "在需要时可提供定制服务，技术人员表现出很强的设计能力和技术水平。",
						"fraction": "19-25"
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
						"content_li": "现场提供技术服务的人员，存在不符合国家法律法规、电力行业规范要求，或缺少相关工作的证件等资质要求，不满足工作需要的情况；现场提供技术服务的人员在作业过程及安全检查过程中，存在违反使用单位的安全规章制度，现场工作不规范的情况。",
						"fraction": "0"
					}, {
						"content_li": "现场提供技术服务的人员，符合国家法律法规、电力行业规范要求，具备相关工作的证件等资质要求，满足工作需要。但在作业过程及安全检查过程中，存在违反使用单位的安全规章制度，现场工作不规范的情况。",
						"fraction": "1-2"
					}, {
						"content_li": "现场提供技术服务的人员，符合国家法律法规、电力行业规范要求，具备相关工作的证件等资质要求，满足工作需要；在作业过程及安全检查过程中，严格遵守使用单位的安全规章制度，现场工作规范，安全素养高，无违章情况发生。",
						"fraction": "3"
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
						"content_li": "现场提供技术服务的人员在作业过程中，不能严格遵守使用单位环保制度要求；施工过程中，不能主动按照“工完、料净、场地清”的要求，自觉对作业过程中产生的废油、废物、废料进行统一收集，到指定垃圾站进行处理。现场技术服务期间，用人单位接到工作监护人、周边居民对技术服务人员作业行为污染周边环境的投诉。",
						"fraction": "0"
					}, {
						"content_li": "现场提供技术服务的人员，在作业过程中，严格遵守使用单位环保制度要求，施工过程中，主动按照“工完、料净、场地清”的要求，自觉对作业过程中产生的废油、废物、废料进行统一收集，到指定垃圾站进行处理。现场技术服务期间，用人单位接到工作监护人、周边居民对技术服务人员作业行为污染周边环境的投诉。",
						"fraction": "1"
					}, {
						"content_li": "现场提供技术服务的人员，在作业过程中，严格遵守使用单位环保制度要求，施工过程中，主动按照“工完、料净、场地清”的要求，自觉对作业过程中产生的废油、废物、废料进行统一收集，到指定垃圾站进行处理。现场技术服务期间，用人单位未接到工作监护人、周边居民对技术服务人员作业行为污染周边环境的投诉。",
						"fraction": "2"
					}],
					"frac": [
						0,
						1,
						2
					]
				}],
				contractor: '',
				contract: '',
				engineer: '',
				review_time: '',
				stop_time: '',
				start_time: '',
				autograph: '',
				total: '0',
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
			}
		},
		//		created() {
		//			this.$nextTick(() => {
		//				this.getajax()
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
			//			getajax: function() {
			//				this.$axios({
			//					method: 'get',
			//					url: 'static/lis2.json'
			//				}).then((response) => { //这里使用了ES6的语法
			//					console.log(response) //请求成功返回的数据
			//					this.lis = response.data
			//					this.lis.forEach((value, index) => {
			//						this.formModel.push({
			//							model: "0"
			//						})
			//					})
			//				}).catch((response) => {
			//					console.log(response) //请求失败返回的数据
			//				})
			//			},
			subajax: function() {
				let ts = true;
				this.formModel.forEach((value, index) => {
					console.log(this.formModel[index].model);
					if (this.formModel[index].model == "-1") {
						ts = false;
					}
				})
				if (ts == false) {
					alert("请选择所有选项的分数");
				} else if (this.contractor == "" || this.contrantor == "" || this.engineer == "" || this.autograph == "" || this.review_time == "" || this.start_time == "" || this.stop_time == "") {
					alert("请完整输入基本信息和签名");
				} else {
					var formData = new FormData(this.$refs.form2); //获取表单数据
					console.log(formData);
					this.$axios.post('http://47.106.194.3/yigou/index.php?core-api-evaluate-serviceEvaluate', formData)
						.then(function(response) {
							console.log(response.data);
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
				$('#stop_time').datetimepicker({
					//					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#stop_time').datetimepicker()
					.on('hide', function(ev) {
						var value = $("#stop_time").val();
						self.stop_time = value;
					});
				$('#start_time').datetimepicker({
					//					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#start_time').datetimepicker()
					.on('hide', function(ev) {
						var value = $("#start_time").val();
						self.start_time = value;
					});
				$('#review_time').datetimepicker({
					//					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#review_time').datetimepicker()
					.on('hide', function(ev) {
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
	.input_s {
		width: 250px!important;
		height: 34px;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 640px) {
		.input_s {
			width: 320px!important;
			display: block!important;
		}
	}
</style>